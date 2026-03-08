/**
 * useOfflineSync.js — PROTOTYPE MODE (no IndexedDB / no API)
 * Chỉ track trạng thái online/offline của browser.
 */
import { useState, useEffect } from 'react';

export function useOfflineSync() {
  const [online, setOnline] = useState(navigator.onLine);
  const [syncState] = useState({ syncing: false, lastSync: null, pendingCount: 0 });

  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

  return { online, syncState, triggerSync: () => {} };
}
