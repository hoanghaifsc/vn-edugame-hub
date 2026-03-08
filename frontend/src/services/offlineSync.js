/**
 * offlineSync.js
 * Quản lý lưu trữ offline với IndexedDB và đồng bộ lên server khi có mạng.
 * Xử lý US02: Chơi game khi mạng yếu/mất mạng
 */
import { openDB } from 'idb';

const DB_NAME = 'edugame-offline';
const DB_VERSION = 1;

// Khởi tạo IndexedDB
async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Lưu sessions chưa sync
      if (!db.objectStoreNames.contains('pendingSessions')) {
        const sessionStore = db.createObjectStore('pendingSessions', { keyPath: 'sessionId' });
        sessionStore.createIndex('syncStatus', 'syncStatus');
        sessionStore.createIndex('createdAt', 'createdAt');
      }
      // Cache danh sách games
      if (!db.objectStoreNames.contains('cachedGames')) {
        db.createObjectStore('cachedGames', { keyPath: 'gameId' });
      }
      // Tiến trình học sinh
      if (!db.objectStoreNames.contains('userProgress')) {
        db.createObjectStore('userProgress', { keyPath: 'key' });
      }
    },
  });
}

let dbPromise = null;
function getDB() {
  if (!dbPromise) {
    dbPromise = initDB();
  }
  return dbPromise;
}

// ──────────────────────────────────────────────
// Pending Sessions (offline game results)
// ──────────────────────────────────────────────

/**
 * Lưu game session vào IndexedDB khi offline
 */
export async function savePendingSession(sessionData) {
  const db = await getDB();
  const session = {
    ...sessionData,
    syncStatus: 'local',
    offlineCreated: true,
    createdAt: new Date().toISOString(),
  };
  await db.put('pendingSessions', session);
  return session;
}

/**
 * Lấy tất cả sessions chưa được sync
 */
export async function getPendingSessions() {
  const db = await getDB();
  const all = await db.getAllFromIndex('pendingSessions', 'syncStatus', 'local');
  return all;
}

/**
 * Đánh dấu session đã sync thành công
 */
export async function markSessionSynced(sessionId) {
  const db = await getDB();
  const session = await db.get('pendingSessions', sessionId);
  if (session) {
    await db.put('pendingSessions', { ...session, syncStatus: 'synced' });
  }
}

/**
 * Xóa sessions đã sync (cleanup)
 */
export async function clearSyncedSessions() {
  const db = await getDB();
  const tx = db.transaction('pendingSessions', 'readwrite');
  const index = tx.store.index('syncStatus');
  let cursor = await index.openCursor('synced');
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }
  await tx.done;
}

// ──────────────────────────────────────────────
// Game Cache
// ──────────────────────────────────────────────

export async function cacheGames(games) {
  const db = await getDB();
  const tx = db.transaction('cachedGames', 'readwrite');
  await Promise.all(
    games.map((g) => tx.store.put({ ...g, cachedAt: new Date().toISOString() }))
  );
  await tx.done;
}

export async function getCachedGames() {
  const db = await getDB();
  return db.getAll('cachedGames');
}

// ──────────────────────────────────────────────
// Sync Orchestrator
// ──────────────────────────────────────────────

/**
 * Sync tất cả pending sessions lên server.
 * Được gọi khi: online event fired hoặc App mount và isOnline=true
 */
export async function syncPendingSessions(apiBaseUrl, authToken) {
  const pending = await getPendingSessions();
  if (pending.length === 0) return { synced: 0, failed: 0 };

  let synced = 0;
  let failed = 0;

  for (const session of pending) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/sessions/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(session),
      });

      if (response.ok) {
        await markSessionSynced(session.sessionId);
        synced++;
      } else {
        failed++;
        console.error(`Sync failed for session ${session.sessionId}:`, response.status);
      }
    } catch (err) {
      failed++;
      console.error(`Network error syncing session ${session.sessionId}:`, err);
    }
  }

  // Cleanup synced records sau 24h (không block)
  clearSyncedSessions().catch(() => {});

  return { synced, failed };
}

// ──────────────────────────────────────────────
// Network Status Utility
// ──────────────────────────────────────────────

export function isOnline() {
  return navigator.onLine;
}

export function onNetworkChange(onOnline, onOffline) {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}
