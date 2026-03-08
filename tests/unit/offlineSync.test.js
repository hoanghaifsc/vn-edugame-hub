/**
 * Unit tests cho offlineSync.js service
 * Test: lưu session offline, lấy pending sessions, sync logic
 */

// Mock idb
jest.mock('idb', () => ({
  openDB: jest.fn(),
}));

const { openDB } = require('idb');

// Setup mock IndexedDB
const mockStore = {
  pendingSessions: {},
};

const mockDB = {
  put: jest.fn(async (storeName, record) => {
    mockStore[storeName] = mockStore[storeName] || {};
    mockStore[storeName][record.sessionId || record.key] = record;
  }),
  get: jest.fn(async (storeName, key) => mockStore[storeName]?.[key]),
  getAll: jest.fn(async () => Object.values(mockStore.pendingSessions || {})),
  getAllFromIndex: jest.fn(async (storeName, index, value) =>
    Object.values(mockStore[storeName] || {}).filter((r) => r[index] === value)
  ),
  transaction: jest.fn(() => ({
    store: {
      index: jest.fn(() => ({
        openCursor: jest.fn(async () => null),
      })),
    },
    done: Promise.resolve(),
  })),
};

beforeEach(() => {
  openDB.mockResolvedValue(mockDB);
  mockStore.pendingSessions = {};
  jest.clearAllMocks();
});

// Re-import fresh module each test
let offlineSync;
beforeEach(() => {
  jest.resetModules();
  openDB.mockResolvedValue(mockDB);
  offlineSync = require('../../frontend/src/services/offlineSync');
});

describe('savePendingSession', () => {
  test('lưu session với syncStatus=local và offlineCreated=true', async () => {
    const sessionData = {
      sessionId: 'sess-001',
      gameId: 'o-an-quan',
      score: 80,
      correctAnswers: 8,
      wrongAnswers: 2,
      durationSeconds: 120,
    };

    const saved = await offlineSync.savePendingSession(sessionData);

    expect(mockDB.put).toHaveBeenCalledWith('pendingSessions', expect.objectContaining({
      sessionId: 'sess-001',
      syncStatus: 'local',
      offlineCreated: true,
    }));
    expect(saved.syncStatus).toBe('local');
    expect(saved.offlineCreated).toBe(true);
    expect(saved.createdAt).toBeDefined();
  });

  test('giữ nguyên dữ liệu game khi lưu', async () => {
    const sessionData = {
      sessionId: 'sess-002',
      gameId: 'o-an-quan',
      score: 50,
      correctAnswers: 5,
      wrongAnswers: 5,
      durationSeconds: 90,
    };

    const saved = await offlineSync.savePendingSession(sessionData);
    expect(saved.score).toBe(50);
    expect(saved.correctAnswers).toBe(5);
    expect(saved.wrongAnswers).toBe(5);
    expect(saved.gameId).toBe('o-an-quan');
  });
});

describe('getPendingSessions', () => {
  test('trả về sessions có syncStatus=local', async () => {
    const localSession = { sessionId: 'sess-local', syncStatus: 'local' };
    const syncedSession = { sessionId: 'sess-synced', syncStatus: 'synced' };
    mockStore.pendingSessions['sess-local'] = localSession;
    mockStore.pendingSessions['sess-synced'] = syncedSession;

    const pending = await offlineSync.getPendingSessions();
    // getAllFromIndex được mock để filter theo syncStatus
    expect(mockDB.getAllFromIndex).toHaveBeenCalledWith('pendingSessions', 'syncStatus', 'local');
  });
});

describe('markSessionSynced', () => {
  test('cập nhật syncStatus thành synced', async () => {
    const session = { sessionId: 'sess-001', syncStatus: 'local', score: 80 };
    mockStore.pendingSessions['sess-001'] = session;
    mockDB.get.mockResolvedValueOnce(session);

    await offlineSync.markSessionSynced('sess-001');

    expect(mockDB.put).toHaveBeenCalledWith('pendingSessions', expect.objectContaining({
      sessionId: 'sess-001',
      syncStatus: 'synced',
    }));
  });

  test('không làm gì nếu session không tồn tại', async () => {
    mockDB.get.mockResolvedValueOnce(undefined);
    await offlineSync.markSessionSynced('non-existent');
    expect(mockDB.put).not.toHaveBeenCalled();
  });
});

describe('syncPendingSessions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('trả về {synced:0, failed:0} khi không có pending sessions', async () => {
    mockDB.getAllFromIndex.mockResolvedValueOnce([]);
    const result = await offlineSync.syncPendingSessions('http://api', 'token-123');
    expect(result).toEqual({ synced: 0, failed: 0 });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('sync thành công và trả về đúng count', async () => {
    const sessions = [
      { sessionId: 'sess-001', syncStatus: 'local' },
      { sessionId: 'sess-002', syncStatus: 'local' },
    ];
    mockDB.getAllFromIndex.mockResolvedValueOnce(sessions);
    mockDB.get
      .mockResolvedValueOnce(sessions[0])
      .mockResolvedValueOnce(sessions[1]);
    global.fetch.mockResolvedValue({ ok: true });

    const result = await offlineSync.syncPendingSessions('http://api', 'token-123');
    expect(result.synced).toBe(2);
    expect(result.failed).toBe(0);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api/api/sessions/sync',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer token-123' }),
      })
    );
  });

  test('xử lý server error và đếm failed', async () => {
    const sessions = [{ sessionId: 'sess-001', syncStatus: 'local' }];
    mockDB.getAllFromIndex.mockResolvedValueOnce(sessions);
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    const result = await offlineSync.syncPendingSessions('http://api', 'token');
    expect(result.synced).toBe(0);
    expect(result.failed).toBe(1);
  });

  test('xử lý network error (fetch throw)', async () => {
    const sessions = [{ sessionId: 'sess-001', syncStatus: 'local' }];
    mockDB.getAllFromIndex.mockResolvedValueOnce(sessions);
    global.fetch.mockRejectedValue(new Error('Network error'));

    const result = await offlineSync.syncPendingSessions('http://api', 'token');
    expect(result.synced).toBe(0);
    expect(result.failed).toBe(1);
  });
});

describe('isOnline', () => {
  test('trả về navigator.onLine', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    expect(offlineSync.isOnline()).toBe(true);

    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    expect(offlineSync.isOnline()).toBe(false);
  });
});
