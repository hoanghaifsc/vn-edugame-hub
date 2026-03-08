/**
 * StudentHome.jsx - US01: Học sinh chọn và chơi game
 * AC: Hiển thị danh sách game lọc theo môn học
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { getCachedGames, cacheGames } from '../services/offlineSync';

const SUBJECTS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'math', label: 'Toán' },
  { id: 'vietnamese', label: 'Tiếng Việt' },
  { id: 'science', label: 'Khoa học' },
];

export default function StudentHome() {
  const { userProfile } = useAuth();
  const { online, syncState } = useOfflineSync();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      setLoading(true);
      if (online) {
        const res = await fetch('/api/games');
        if (!res.ok) throw new Error('Lỗi tải danh sách game');
        const data = await res.json();
        setGames(data);
        await cacheGames(data); // Lưu cache offline
      } else {
        // Offline: dùng cache
        const cached = await getCachedGames();
        setGames(cached);
      }
    } catch (err) {
      setError(err.message);
      // Fallback về cache khi lỗi
      const cached = await getCachedGames();
      if (cached.length > 0) setGames(cached);
    } finally {
      setLoading(false);
    }
  }

  const filteredGames = selectedSubject === 'all'
    ? games
    : games.filter((g) => g.subject === selectedSubject);

  return (
    <div className="student-home" data-testid="student-home">
      {/* Status bar offline/sync */}
      {!online && (
        <div className="offline-banner" data-testid="offline-banner">
          Bạn đang offline. Tiến trình sẽ được đồng bộ khi có mạng.
        </div>
      )}
      {syncState.syncing && (
        <div className="sync-banner" data-testid="sync-banner">
          Đang đồng bộ dữ liệu...
        </div>
      )}

      <header>
        <h1>Xin chào, {userProfile?.displayName}!</h1>
        <p>Chọn game để bắt đầu học</p>
      </header>

      {/* Filter theo môn học - AC US01 */}
      <nav className="subject-filter" data-testid="subject-filter">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            className={selectedSubject === s.id ? 'active' : ''}
            onClick={() => setSelectedSubject(s.id)}
            data-testid={`filter-${s.id}`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Danh sách game */}
      {loading && <p data-testid="loading">Đang tải...</p>}
      {error && !loading && games.length === 0 && (
        <p className="error" data-testid="error">{error}</p>
      )}

      <div className="game-grid" data-testid="game-grid">
        {filteredGames.map((game) => (
          <div
            key={game.gameId}
            className="game-card"
            data-testid={`game-card-${game.gameId}`}
            onClick={() => navigate(`/game/${game.gameId}`)}
          >
            <img src={game.thumbnailUrl} alt={game.title} loading="lazy" />
            <h3>{game.title}</h3>
            <span className="subject-tag">{game.subject}</span>
            <p>{game.description}</p>
            <button className="play-btn">Chơi ngay</button>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && !loading && (
        <p data-testid="no-games">Không có game nào cho môn này.</p>
      )}
    </div>
  );
}
