import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { useLang } from '../hooks/useLang';
import { mockDB } from '../services/mockData';

const SUBJECT_KEYS = ['all', 'math', 'logic', 'vietnamese', 'science'];

const SUBJECT_ICONS = {
  all: '🎮',
  math: '🔢',
  logic: '🧩',
  vietnamese: '📖',
  science: '🔬',
};

export default function StudentHome() {
  const { userProfile } = useAuth();
  const { online, syncState } = useOfflineSync();
  const { t } = useLang();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredGames = mockDB.getGames(selectedSubject);

  return (
    <div className="student-home" data-testid="student-home">
      {!online && (
        <div className="offline-banner" data-testid="offline-banner">{t('banner.offline')}</div>
      )}
      {syncState.syncing && (
        <div className="sync-banner" data-testid="sync-banner">{t('banner.syncing')}</div>
      )}

      <header className="home-header">
        <div className="home-header__text">
          <h1>{t('home.greeting', { name: userProfile?.displayName })}</h1>
          <p>{t('home.subtitle')}</p>
        </div>
        <div className="home-header__avatar">
          {userProfile?.displayName?.[0] ?? '?'}
        </div>
      </header>

      <nav className="subject-filter" data-testid="subject-filter">
        {SUBJECT_KEYS.map(id => (
          <button
            key={id}
            className={selectedSubject === id ? 'active' : ''}
            onClick={() => setSelectedSubject(id)}
            data-testid={`filter-${id}`}
          >
            {SUBJECT_ICONS[id]} {t(`subject.${id}`)}
          </button>
        ))}
      </nav>

      <div className="game-grid" data-testid="game-grid">
        {filteredGames.map(game => (
          <div
            key={game.gameId}
            className={`game-card${game.playable ? ' game-card--playable' : ' game-card--soon'}`}
            data-testid={`game-card-${game.gameId}`}
            onClick={() => game.playable && navigate(`/game/${game.gameId}`)}
            style={{ cursor: game.playable ? 'pointer' : 'default' }}
          >
            {game.playable && (
              <span className="badge-new">{t('game.playable')}</span>
            )}
            <img src={game.thumbnailUrl} alt={t(`game.${game.gameId}.title`)} loading="lazy" />
            <div className="game-card__body">
              <div className="game-card__meta">
                <span className="subject-tag">{t(`subject.${game.subject}`)}</span>
                {game.gradeLevel && (
                  <span className="grade-tag">
                    {t('game.grade')} {game.gradeLevel.join('–')}
                  </span>
                )}
              </div>
              <h3>{t(`game.${game.gameId}.title`)}</h3>
              <p>{t(`game.${game.gameId}.desc`)}</p>
              <button
                className="play-btn"
                disabled={!game.playable}
                onClick={(e) => { e.stopPropagation(); game.playable && navigate(`/game/${game.gameId}`); }}
              >
                {game.playable ? t('game.playNow') : t('game.comingSoon')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="empty-state" data-testid="no-games">
          <span className="empty-state__icon">🎲</span>
          <p>{t('home.noGames')}</p>
        </div>
      )}
    </div>
  );
}
