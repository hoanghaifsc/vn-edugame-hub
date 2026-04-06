/**
 * mockData.js — Prototype mode: toàn bộ data in-memory, không cần DB/Firebase
 */

// ─── Users ────────────────────────────────────────────────────────────────────
export const MOCK_USERS = {
  student: {
    uid: 'student-001',
    email: 'hocsinh@demo.vn',
    displayName: 'Nguyễn Văn An',
    role: 'student',
    classId: '3A',
  },
  teacher: {
    uid: 'teacher-001',
    email: 'giaovien@demo.vn',
    displayName: 'Cô Trần Thị Mai',
    role: 'teacher',
    classId: '3A',
  },
  parent: {
    uid: 'parent-001',
    email: 'phuhuynh@demo.vn',
    displayName: 'Anh Nguyễn Văn Hùng',
    role: 'parent',
    linkedStudentUid: 'student-001',
  },
};

// ─── Games ────────────────────────────────────────────────────────────────────
export const MOCK_GAMES = [
  {
    gameId: 'game-2048',
    title: '2048',
    subject: 'math',
    thumbnailUrl: 'https://placehold.co/280x160/edc22e/white?text=2048',
    description: 'Gộp các ô số để đạt 2048. Luyện tư duy logic và tính nhẩm.',
    gradeLevel: [3, 4, 5],
    isActive: true,
    playable: true,
  },
  {
    gameId: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    subject: 'logic',
    thumbnailUrl: 'https://placehold.co/280x160/1a73e8/white?text=Tic+Tac+Toe',
    description: 'Đánh cờ ca-rô 3x3 với AI. Rèn tư duy chiến thuật.',
    gradeLevel: [1, 2, 3],
    isActive: true,
    playable: true,
  },
  {
    gameId: 'o-an-quan-math',
    title: 'Ô Ăn Quan — Toán Cơ Bản',
    subject: 'math',
    thumbnailUrl: 'https://placehold.co/280x160/8f7a66/white?text=Ô+Ăn+Quan',
    description: 'Học cộng, trừ, nhân, chia qua game Ô Ăn Quan truyền thống.',
    gradeLevel: [1, 2, 3],
    isActive: true,
    playable: false,
  },
  {
    gameId: 'word-quiz-vi',
    title: 'Đố Chữ Tiếng Việt',
    subject: 'vietnamese',
    thumbnailUrl: 'https://placehold.co/280x160/34a853/white?text=Đố+Chữ',
    description: 'Ôn tập từ vựng và chính tả Tiếng Việt qua câu đố vui.',
    gradeLevel: [1, 2, 3],
    isActive: true,
    playable: true,
  },
  {
    gameId: 'nature-quiz',
    title: 'Khám Phá Tự Nhiên',
    subject: 'science',
    thumbnailUrl: 'https://placehold.co/280x160/fbbc04/333?text=Khoa+Học',
    description: 'Tìm hiểu thực vật, động vật và hiện tượng tự nhiên.',
    gradeLevel: [2, 3],
    isActive: true,
    playable: false,
  },
];

// ─── Assignments ──────────────────────────────────────────────────────────────
export const MOCK_ASSIGNMENTS = [
  {
    assignmentId: 'assign-001',
    teacherUid: 'teacher-001',
    gameId: 'o-an-quan-math',
    gameTitle: 'Ô Ăn Quan — Toán Cơ Bản',
    classId: '3A',
    title: 'Bài tập Toán tuần 10',
    dueDate: '2026-03-20T23:59',
    createdAt: '2026-03-08T08:00',
    studentUids: ['student-001', 'student-002', 'student-003'],
  },
  {
    assignmentId: 'assign-002',
    teacherUid: 'teacher-001',
    gameId: 'word-quiz-vi',
    gameTitle: 'Đố Chữ Tiếng Việt',
    classId: '3A',
    title: 'Ôn chính tả bài 7',
    dueDate: '2026-03-22T23:59',
    createdAt: '2026-03-07T09:00',
    studentUids: ['student-001', 'student-002', 'student-003'],
  },
];

// ─── Report rows (US04) ───────────────────────────────────────────────────────
export const MOCK_REPORT_ROWS = {
  'assign-001': [
    { studentUid: 'student-001', studentName: 'Nguyễn Văn An', status: 'completed', score: 80, correctAnswers: 8, wrongAnswers: 2, durationSeconds: 115 },
    { studentUid: 'student-002', studentName: 'Lê Thị Bình',   status: 'completed', score: 60, correctAnswers: 6, wrongAnswers: 4, durationSeconds: 143 },
    { studentUid: 'student-003', studentName: 'Phạm Minh Châu',status: 'pending',   score: null, correctAnswers: null, wrongAnswers: null, durationSeconds: null },
  ],
  'assign-002': [
    { studentUid: 'student-001', studentName: 'Nguyễn Văn An', status: 'pending',   score: null, correctAnswers: null, wrongAnswers: null, durationSeconds: null },
    { studentUid: 'student-002', studentName: 'Lê Thị Bình',   status: 'completed', score: 90, correctAnswers: 9, wrongAnswers: 1, durationSeconds: 88 },
    { studentUid: 'student-003', studentName: 'Phạm Minh Châu',status: 'completed', score: 70, correctAnswers: 7, wrongAnswers: 3, durationSeconds: 130 },
  ],
};

// ─── Parent overview (US05) ───────────────────────────────────────────────────
export const MOCK_OVERVIEW = {
  weeklyOnlineMinutes: 145,
  gamesPlayedThisWeek: 12,
  averageScore: 78.5,
  totalAssignments: 5,
  completedAssignments: 3,
};

export const MOCK_WEEKLY_PROGRESS = [
  { subject: 'math',       subjectLabel: 'Toán',        sessionsCount: 8, totalMinutes: 90,  averageScore: 82.0, trend: 'up'     },
  { subject: 'vietnamese', subjectLabel: 'Tiếng Việt',  sessionsCount: 4, totalMinutes: 55,  averageScore: 71.0, trend: 'stable' },
  { subject: 'science',    subjectLabel: 'Khoa học',    sessionsCount: 0, totalMinutes: 0,   averageScore: null, trend: 'stable' },
];

// ─── In-memory state (mutable at runtime) ────────────────────────────────────
let _assignments = [...MOCK_ASSIGNMENTS];
let _reports = JSON.parse(JSON.stringify(MOCK_REPORT_ROWS));

export const mockDB = {
  getGames: (subject) => subject && subject !== 'all'
    ? MOCK_GAMES.filter(g => g.subject === subject)
    : MOCK_GAMES,

  getAssignments: (classId) =>
    _assignments.filter(a => a.classId === classId),

  createAssignment: (data) => {
    const newAssign = {
      assignmentId: `assign-${Date.now()}`,
      createdAt: new Date().toISOString(),
      gameTitle: MOCK_GAMES.find(g => g.gameId === data.gameId)?.title || data.gameId,
      studentUids: [],
      ...data,
    };
    _assignments.push(newAssign);
    _reports[newAssign.assignmentId] = [];
    return newAssign;
  },

  getReport: (assignmentId) => _reports[assignmentId] || [],

  getOverview: () => MOCK_OVERVIEW,

  getWeeklyProgress: () => MOCK_WEEKLY_PROGRESS,
};
