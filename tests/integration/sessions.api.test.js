/**
 * Integration tests cho Session API (US02)
 * Test: POST /api/sessions, PUT /api/sessions/:id, POST /api/sessions/sync
 */
const request = require('supertest');

// Mock firebase-admin trước khi require app
jest.mock('../../backend/src/config/firebase-admin', () => {
  const mockFirestore = {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        id: 'mock-session-id',
        set: jest.fn().mockResolvedValue({}),
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            studentUid: 'student-uid-123',
            gameId: 'o-an-quan',
            assignmentId: null,
          }),
        }),
        update: jest.fn().mockResolvedValue({}),
      })),
      where: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue({ docs: [] }),
    })),
    batch: jest.fn(() => ({
      set: jest.fn(),
      commit: jest.fn().mockResolvedValue({}),
    })),
  };

  return {
    apps: ['mock'],
    auth: jest.fn(() => ({
      verifyIdToken: jest.fn().mockResolvedValue({ uid: 'student-uid-123', email: 'student@test.com' }),
    })),
    firestore: jest.fn(() => mockFirestore),
  };
});

// Mock auth middleware
jest.mock('../../backend/src/middleware/auth', () => ({
  authenticateToken: (req, _res, next) => {
    req.user = { uid: req.headers['x-test-uid'] || 'student-uid-123', role: req.headers['x-test-role'] || 'student' };
    next();
  },
  requireRole: (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  },
}));

const app = require('../../backend/src/server');

describe('POST /api/sessions', () => {
  test('tạo session thành công với gameId hợp lệ', async () => {
    const res = await request(app)
      .post('/api/sessions')
      .set('x-test-role', 'student')
      .send({ gameId: 'o-an-quan' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('sessionId');
  });

  test('trả về 400 khi thiếu gameId', async () => {
    const res = await request(app)
      .post('/api/sessions')
      .set('x-test-role', 'student')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('trả về 403 khi teacher cố tạo session', async () => {
    const res = await request(app)
      .post('/api/sessions')
      .set('x-test-role', 'teacher')
      .send({ gameId: 'o-an-quan' });

    expect(res.status).toBe(403);
  });
});

describe('POST /api/sessions/sync (US02 Core)', () => {
  test('sync một session offline thành công', async () => {
    const offlineSession = {
      sessionId: 'offline-sess-001',
      gameId: 'o-an-quan',
      score: 80,
      correctAnswers: 8,
      wrongAnswers: 2,
      durationSeconds: 120,
      offlineCreated: true,
    };

    const res = await request(app)
      .post('/api/sessions/sync')
      .set('x-test-role', 'student')
      .send(offlineSession);

    expect(res.status).toBe(200);
    expect(res.body.synced).toContain('offline-sess-001');
    expect(res.body.failed).toHaveLength(0);
  });

  test('sync nhiều sessions cùng lúc', async () => {
    const sessions = [
      { sessionId: 'sess-001', gameId: 'o-an-quan', score: 70 },
      { sessionId: 'sess-002', gameId: 'o-an-quan', score: 90 },
    ];

    const res = await request(app)
      .post('/api/sessions/sync')
      .set('x-test-role', 'student')
      .send({ sessions });

    expect(res.status).toBe(200);
    expect(res.body.synced).toHaveLength(2);
    expect(res.body.failed).toHaveLength(0);
  });

  test('từ chối sync session của user khác (UID mismatch)', async () => {
    const spoofedSession = {
      sessionId: 'sess-other',
      gameId: 'o-an-quan',
      studentUid: 'another-user-uid', // UID khác với user đang request
    };

    const res = await request(app)
      .post('/api/sessions/sync')
      .set('x-test-role', 'student')
      .set('x-test-uid', 'student-uid-123')
      .send(spoofedSession);

    expect(res.status).toBe(200);
    expect(res.body.failed[0]).toMatchObject({
      sessionId: 'sess-other',
      reason: 'UID mismatch',
    });
  });

  test('session thiếu gameId → failed', async () => {
    const invalidSession = { sessionId: 'sess-invalid' }; // missing gameId

    const res = await request(app)
      .post('/api/sessions/sync')
      .set('x-test-role', 'student')
      .send(invalidSession);

    expect(res.status).toBe(200);
    expect(res.body.failed).toHaveLength(1);
    expect(res.body.failed[0].reason).toBe('Missing required fields');
  });
});

describe('Health check', () => {
  test('GET /health trả về 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
