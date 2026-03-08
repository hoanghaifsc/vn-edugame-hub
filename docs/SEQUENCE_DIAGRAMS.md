# SEQUENCE DIAGRAMS - VIETNAM EDUGAME HUB MVP

## SD-01: Luồng Offline/Online Sync (US02)

```
Học sinh    React App    Service Worker    IndexedDB    API Server    Firebase
    │            │               │               │            │           │
    │ Chơi game  │               │               │            │           │
    │───────────>│               │               │            │           │
    │            │ Check online  │               │            │           │
    │            │──────────────>│               │            │           │
    │            │               │               │            │           │
    │            │ ╔══════════════════════════╗  │            │           │
    │            │ ║ CASE: ONLINE             ║  │            │           │
    │            │ ╚══════════════════════════╝  │            │           │
    │            │ POST /sessions │               │            │           │
    │            │───────────────────────────────────────────>│           │
    │            │               │               │            │ Save      │
    │            │               │               │            │──────────>│
    │            │ 201 OK        │               │            │           │
    │            │<──────────────────────────────────────────-│           │
    │            │               │               │            │           │
    │ Game ends  │               │               │            │           │
    │            │ ╔══════════════════════════╗  │            │           │
    │            │ ║ CASE: OFFLINE            ║  │            │           │
    │            │ ╚══════════════════════════╝  │            │           │
    │ Mất mạng   │               │               │            │           │
    │            │ save locally  │               │            │           │
    │            │───────────────────────────────>            │           │
    │            │               │  savePending  │            │           │
    │            │               │  Session()    │            │           │
    │            │               │──────────────>│            │           │
    │            │               │ {syncStatus:  │            │           │
    │            │               │  "local"}     │            │           │
    │            │ Banner        │               │            │           │
    │            │ "Offline"     │               │            │           │
    │ UX tiếp tục│               │               │            │           │
    │            │               │               │            │           │
    │ Có mạng lại│               │               │            │           │
    │            │ online event  │               │            │           │
    │            │<──────────────│               │            │           │
    │            │               │               │            │           │
    │            │ triggerSync() │               │            │           │
    │            │ (background)  │               │            │           │
    │            │ getPending    │               │            │           │
    │            │ Sessions()    │               │            │           │
    │            │──────────────────────────────>│            │           │
    │            │               │               │ pending[]  │           │
    │            │<─────────────────────────────-│            │           │
    │            │               │               │            │           │
    │            │ POST /sessions/sync            │            │           │
    │            │───────────────────────────────────────────>│           │
    │            │               │               │            │ batch save│
    │            │               │               │            │──────────>│
    │            │               │               │            │ 200 OK    │
    │            │               │               │            │<──────────│
    │            │ markSynced()  │               │            │           │
    │            │──────────────────────────────>│            │           │
    │            │               │ {syncStatus:  │            │           │
    │            │               │  "synced"}    │            │           │
    │ Banner      │               │               │            │           │
    │ "Sync done"│               │               │            │           │
    │ (auto hide)│               │               │            │           │
```

## SD-02: Luồng Giáo viên Giao bài (US03)

```
Giáo viên    React App    API Server    Firebase
    │            │               │           │
    │ Điền form  │               │           │
    │───────────>│               │           │
    │            │ POST /assign  │           │
    │            │──────────────>│           │
    │            │               │ Create    │
    │            │               │ assignment│
    │            │               │──────────>│
    │            │               │ Create    │
    │            │               │ status x  │
    │            │               │ N students│
    │            │               │──────────>│
    │            │ 201 Created   │           │
    │            │<──────────────│           │
    │ "Giao bài  │               │           │
    │  thành     │               │           │
    │  công!"    │               │           │
```

## SD-03: Luồng Học sinh hoàn thành bài tập → Cập nhật trạng thái (US03+US04)

```
Học sinh    GameScene    React App    API Server    Firebase
    │            │            │             │           │
    │ Hoàn thành │            │             │           │
    │ game       │            │             │           │
    │───────────>│            │             │           │
    │            │ emit       │             │           │
    │            │ 'gameEnd'  │             │           │
    │            │ {session}  │             │           │
    │            │───────────>│             │           │
    │            │            │ isOnline?   │           │
    │            │            │ YES:        │           │
    │            │            │ PUT /sess.. │           │
    │            │            │────────────>│           │
    │            │            │             │ update    │
    │            │            │             │ session   │
    │            │            │             │──────────>│
    │            │            │             │ update    │
    │            │            │             │ status:   │
    │            │            │             │ completed │
    │            │            │             │──────────>│
    │            │            │ 200 OK      │           │
    │            │            │<────────────│           │
    │ Xem kết quả│            │             │           │
    │<───────────────────────-│             │           │
```
