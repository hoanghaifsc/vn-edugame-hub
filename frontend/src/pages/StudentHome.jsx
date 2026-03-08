/**
 * StudentHome.jsx — PROTOTYPE MODE
 * US01: Hiển thị & lọc danh sách game (mock data, không cần API)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { mockDB } from '../services/mockData';

const SUBJECTS = [
  { id: 'all',        label: 'Tất cả' },
  { id: 'math',       label: 'Toán' },
  { id: 'logic',      label: 'Tư duy' },
  { id: 'vietnamese', label: 'Tiếng Việt' },
  { id: 'science',    label: 'Khoa học' },
];

export default function StudentHome() {
  const { userProfile } = useAuth();
  const { online, syncState } = useOfflineSync();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredGames = mockDB.getGames(selectedSubject);

  return (
    <div className="student-home" data-testid="student-home">
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

      <div className="game-grid" data-testid="game-grid">
        {filteredGames.map((game) => (
          <div
            key={game.gameId}
            className={`game-card${game.playable ? '' : ' game-card--soon'}`}
            data-testid={`game-card-${game.gameId}`}
            onClick={() => game.playable && navigate(`/game/${game.gameId}`)}
            style={{ cursor: game.playable ? 'pointer' : 'default' }}
          >
            {game.playable && <span className="badge-new">✦ Chơi được</span>}
            <img src={game.thumbnailUrl} alt={game.title} loading="lazy" />
            <h3>{game.title}</h3>
            <span className="subject-tag">{game.subject}</span>
            <p>{game.description}</p>
            <button className="play-btn" disabled={!game.playable}>
              {game.playable ? 'Chơi ngay →' : 'Sắp ra mắt'}
            </button>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <p data-testid="no-games">Không có game nào cho môn này.</p>
      )}
    </div>
  );
}
