/**
 * useOfflineSync.js
 * React hook quản lý trạng thái online/offline và tự động sync
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { syncPendingSessions, onNetworkChange, isOnline } from '../services/offlineSync';
import { useAuth } from './useAuth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function useOfflineSync() {
  const { user } = useAuth();
  const [online, setOnline] = useState(isOnline());
  const [syncState, setSyncState] = useState({ syncing: false, lastSync: null, pendingCount: 0 });
  const syncAttemptRef = useRef(false);

  const triggerSync = useCallback(async () => {
    if (syncAttemptRef.current || !user) return;
    syncAttemptRef.current = true;
    setSyncState((s) => ({ ...s, syncing: true }));

    try {
      const token = await user.getIdToken();
      const result = await syncPendingSessions(API_BASE_URL, token);
      setSyncState({
        syncing: false,
        lastSync: new Date(),
        pendingCount: result.failed,
      });
    } catch (err) {
      console.error('Sync error:', err);
      setSyncState((s) => ({ ...s, syncing: false }));
    } finally {
      syncAttemptRef.current = false;
    }
  }, [user]);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      // Tự động sync khi có mạng lại - không làm gián đoạn UX
      triggerSync();
    };
    const handleOffline = () => setOnline(false);

    const cleanup = onNetworkChange(handleOnline, handleOffline);

    // Sync lần đầu nếu đang online
    if (isOnline() && user) {
      triggerSync();
    }

    return cleanup;
  }, [triggerSync, user]);

  return { online, syncState, triggerSync };
}
