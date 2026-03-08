# KẾ HOẠCH TRIỂN KHAI MVP - VIETNAM EDUGAME HUB
**Phiên bản:** 1.0
**Ngày tạo:** 2026-03-08
**Nhánh phát triển:** `claude/edugame-mvp-planning-MsKrt`

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1 Mục tiêu MVP
Triển khai game **Ô Ăn Quan tích hợp giải Toán cơ bản** với đầy đủ 3 nhóm người dùng:
- **Học sinh**: Chơi game, học Toán, chơi offline
- **Giáo viên**: Giao bài, xem báo cáo học sinh
- **Phụ huynh**: Theo dõi tiến độ học tập

### 1.2 Tech Stack
| Layer | Công nghệ | Lý do chọn |
|---|---|---|
| UI Framework | React 18 | Component-based, ecosystem lớn |
| Game Engine | Phaser.js 3 | Tối ưu game 2D HTML5, cộng đồng lớn |
| Backend | Node.js + Express | Async I/O tốt, JS unified stack |
| Database | Firebase Firestore | Real-time sync, offline support built-in |
| Auth | Firebase Auth | Google/Email sign-in, bảo mật cao |
| Offline | PWA (Service Worker + IndexedDB) | Yêu cầu bắt buộc của dự án |
| Testing | Jest + React Testing Library + Cypress | Unit, Integration, E2E |

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```
vn-edugame-hub/
├── frontend/
│   ├── public/
│   │   ├── manifest.json           # PWA manifest
│   │   ├── sw.js                   # Service Worker
│   │   └── assets/game/            # Game assets (sprites, audio)
│   ├── src/
│   │   ├── components/             # UI components tái sử dụng
│   │   │   ├── GameCard/
│   │   │   ├── Dashboard/
│   │   │   ├── ProgressBar/
│   │   │   └── ReportTable/
│   │   ├── pages/
│   │   │   ├── StudentHome.jsx     # US01: Danh sách game
│   │   │   ├── GamePlay.jsx        # US01+US02: Màn hình chơi
│   │   │   ├── TeacherDashboard.jsx # US03+US04
│   │   │   └── ParentDashboard.jsx # US05
│   │   ├── game/
│   │   │   ├── OAnQuan/
│   │   │   │   ├── scenes/
│   │   │   │   │   ├── BootScene.js
│   │   │   │   │   ├── GameScene.js
│   │   │   │   │   └── UIScene.js
│   │   │   │   ├── objects/
│   │   │   │   │   ├── Board.js    # Bàn Ô Ăn Quan
│   │   │   │   │   ├── Stone.js    # Quân cờ
│   │   │   │   │   └── MathQuestion.js # Câu hỏi Toán
│   │   │   │   └── config.js
│   │   ├── services/
│   │   │   ├── firebase.js         # Firebase init & helpers
│   │   │   ├── offlineSync.js      # IndexedDB + sync logic
│   │   │   ├── gameService.js      # Game CRUD APIs
│   │   │   └── reportService.js    # Báo cáo & thống kê
│   │   ├── hooks/
│   │   │   ├── useOfflineSync.js   # Hook quản lý offline
│   │   │   ├── useGameProgress.js  # Hook tiến trình game
│   │   │   └── useAuth.js          # Hook xác thực
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── games.js
│   │   │   ├── assignments.js      # US03
│   │   │   ├── reports.js          # US04
│   │   │   └── progress.js         # US05
│   │   ├── controllers/
│   │   │   ├── gameController.js
│   │   │   ├── assignmentController.js
│   │   │   ├── reportController.js
│   │   │   └── progressController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Game.js
│   │   │   ├── Assignment.js
│   │   │   ├── GameSession.js
│   │   │   └── Progress.js
│   │   ├── middleware/
│   │   │   ├── auth.js             # Firebase token verify
│   │   │   └── errorHandler.js
│   │   └── server.js
│   └── package.json
├── tests/
│   ├── unit/                       # Jest unit tests
│   ├── integration/                # API integration tests
│   └── e2e/                        # Cypress E2E tests
├── docs/
│   ├── SEQUENCE_DIAGRAMS.md        # Luồng Offline/Online sync
│   ├── TEST_CASES.md               # Test cases US01-US05
│   └── OFFLINE_SYNC_CHECKLIST.md
└── IMPLEMENTATION_PLAN.md
```

---

## 3. DATA MODELS

### 3.1 User
```json
{
  "uid": "string (Firebase Auth UID)",
  "email": "string",
  "displayName": "string",
  "role": "student | teacher | parent",
  "classId": "string (học sinh/giáo viên)",
  "linkedStudentUid": "string (phụ huynh)",
  "createdAt": "timestamp"
}
```

### 3.2 Game
```json
{
  "gameId": "string",
  "title": "Ô Ăn Quan - Toán Cơ Bản",
  "subject": "math",
  "gradeLevel": [1, 2, 3],
  "thumbnailUrl": "string",
  "description": "string",
  "isActive": true
}
```

### 3.3 GameSession (lưu tiến trình chơi)
```json
{
  "sessionId": "string",
  "studentUid": "string",
  "gameId": "string",
  "assignmentId": "string | null",
  "startedAt": "timestamp",
  "completedAt": "timestamp | null",
  "score": "number",
  "totalQuestions": "number",
  "correctAnswers": "number",
  "wrongAnswers": "number",
  "durationSeconds": "number",
  "syncStatus": "local | synced",
  "offlineCreated": "boolean"
}
```

### 3.4 Assignment
```json
{
  "assignmentId": "string",
  "teacherUid": "string",
  "gameId": "string",
  "classId": "string",
  "studentUids": ["string"],
  "title": "string",
  "dueDate": "timestamp",
  "createdAt": "timestamp"
}
```

### 3.5 AssignmentStatus
```json
{
  "assignmentId": "string",
  "studentUid": "string",
  "status": "pending | completed",
  "sessionId": "string | null",
  "completedAt": "timestamp | null"
}
```

---

## 4. API ENDPOINTS

### 4.1 Games
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/api/games` | Lấy danh sách game (filter: subject) | Student/Teacher |
| GET | `/api/games/:gameId` | Chi tiết game | Student/Teacher |

### 4.2 Game Sessions
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/api/sessions` | Tạo session mới | Student |
| PUT | `/api/sessions/:sessionId` | Cập nhật tiến trình | Student |
| POST | `/api/sessions/sync` | Đồng bộ sessions offline | Student |

### 4.3 Assignments (US03)
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/api/assignments` | Tạo bài tập mới | Teacher |
| GET | `/api/assignments/class/:classId` | DS bài tập của lớp | Teacher |
| GET | `/api/assignments/student` | DS bài tập của học sinh | Student |
| GET | `/api/assignments/:id/status` | Trạng thái bài tập | Teacher |

### 4.4 Reports (US04)
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/api/reports/class/:classId` | Báo cáo cả lớp | Teacher |
| GET | `/api/reports/assignment/:assignmentId` | Báo cáo bài tập | Teacher |
| GET | `/api/reports/student/:studentUid` | Chi tiết từng học sinh | Teacher |

### 4.5 Progress (US05)
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/api/progress/overview` | Dashboard tổng quan phụ huynh | Parent |
| GET | `/api/progress/weekly` | Tiến độ tuần | Parent |

---

## 5. LUỒNG OFFLINE/ONLINE SYNC (US02 - Core Feature)

### 5.1 Mô tả luồng
```
Học sinh chơi game
       │
       ▼
  Kiểm tra mạng?
  ┌────┴────┐
 Online   Offline
  │          │
  ▼          ▼
Lưu thẳng  Lưu vào
Firebase   IndexedDB
           (syncStatus: "local")
              │
              ▼ (khi có mạng lại)
         Service Worker
         detect online event
              │
              ▼
        Đọc tất cả records
        có syncStatus="local"
              │
              ▼
        POST /api/sessions/sync
              │
              ▼
        Cập nhật syncStatus="synced"
        trong IndexedDB
```

### 5.2 Chiến lược Service Worker Cache
- **Cache First**: Tài nguyên tĩnh (JS, CSS, assets game)
- **Network First**: API calls (fallback về cache)
- **Background Sync**: Queue offline mutations

### 5.3 IndexedDB Schema
```
Database: edugame-offline
Stores:
  - pendingSessions: {sessionId, data, createdAt}
  - cachedGames: {gameId, data, cachedAt}
  - userProgress: {key, data, updatedAt}
```

---

## 6. PHÂN CHIA SPRINT

### Sprint 1 (Tuần 1-2) - Foundation
| Task | Assignee | Story Points | Priority |
|---|---|---|---|
| Setup project structure, CI/CD | Dev Lead | 3 | P0 |
| Firebase setup + Auth | Backend Dev | 5 | P0 |
| PWA manifest + Service Worker skeleton | Frontend Dev | 5 | P0 |
| Game list UI (US01) | Frontend Dev | 3 | P0 |
| Phaser.js Ô Ăn Quan - Core logic | Game Dev | 13 | P0 |
| IndexedDB offline storage | Frontend Dev | 8 | P0 |
| API: Games endpoint | Backend Dev | 3 | P1 |

### Sprint 2 (Tuần 3-4) - Core Features
| Task | Assignee | Story Points | Priority |
|---|---|---|---|
| Offline/Online sync hoàn chỉnh (US02) | Full Stack | 13 | P0 |
| Math question integration vào game | Game Dev | 8 | P1 |
| Teacher: Giao bài (US03) | Full Stack | 8 | P1 |
| Teacher: Báo cáo (US04) | Full Stack | 8 | P1 |
| Parent dashboard (US05) | Frontend Dev | 5 | P2 |

### Sprint 3 (Tuần 5-6) - Polish & Testing
| Task | Assignee | Story Points | Priority |
|---|---|---|---|
| Performance optimization (<3s load) | Frontend Dev | 5 | P0 |
| Responsive design (Mobile + Desktop) | Frontend Dev | 5 | P0 |
| E2E test US01-US05 | QA | 13 | P0 |
| Load testing (3G/4G) | QA | 5 | P0 |
| Bug fixes & UAT | Dev + QA | 8 | P0 |

---

## 7. KẾ HOẠCH TEST

### 7.1 Testing Pyramid
```
        /\
       /E2E\        <- Cypress (5 luồng US)
      /──────\
     /Integra-\     <- Jest + Supertest (API)
    /tion tests\
   /────────────\
  /  Unit tests  \  <- Jest + RTL (components, hooks, services)
 /________________\
```

### 7.2 Test Coverage Target
- Unit tests: ≥ 80% code coverage
- Integration tests: 100% API endpoints
- E2E tests: 100% User Stories (US01-US05)

### 7.3 NFR Testing
| NFR | Test Method | Tool | Ngưỡng Pass |
|---|---|---|---|
| Load time < 3s (3G) | Throttled load test | Lighthouse CI | < 3000ms |
| Offline playable | Disconnect & play | Cypress + Chrome DevTools | Không crash |
| Responsive | Multi-viewport | Cypress | Pass tất cả breakpoints |
| Offline sync | Offline → play → reconnect | Cypress | Data sync 100% |

---

## 8. DEFINITION OF DONE (DoD)

Một User Story được coi là DONE khi:
- [ ] Code review approved (ít nhất 1 reviewer)
- [ ] Unit tests passed (coverage ≥ 80%)
- [ ] Integration tests passed
- [ ] E2E test cho AC tương ứng passed
- [ ] NFR performance check passed
- [ ] Responsive test passed (mobile + desktop)
- [ ] Offline test passed (nếu liên quan)
- [ ] Deployed lên môi trường Staging
- [ ] Demo cho Product Owner và nhận approval

---

## 9. RỦI RO KỸ THUẬT & GIẢI PHÁP

| Rủi ro | Xác suất | Ảnh hưởng | Giải pháp |
|---|---|---|---|
| Conflict dữ liệu khi sync offline | Cao | Cao | Last-write-wins + timestamp, alert user |
| Game load > 3s trên 3G | Trung bình | Cao | Asset lazy loading, Phaser treeshaking |
| Firebase quota vượt free tier | Thấp | Trung bình | Caching aggressive, monitor usage |
| IndexedDB không support trên một số browser | Thấp | Cao | Feature detection + fallback localStorage |
| Phaser.js xung đột với React lifecycle | Trung bình | Trung bình | useEffect cleanup, Phaser destroy() |
