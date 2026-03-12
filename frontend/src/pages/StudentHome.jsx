import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { useLang } from '../hooks/useLang';
import { mockDB } from '../services/mockData';

const SUBJECT_KEYS = ['all', 'math', 'logic', 'vietnamese', 'science'];

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

      <header>
        <h1>{t('home.greeting', { name: userProfile?.displayName })}</h1>
        <p>{t('home.subtitle')}</p>
      </header>

      <nav className="subject-filter" data-testid="subject-filter">
        {SUBJECT_KEYS.map(id => (
          <button
            key={id}
            className={selectedSubject === id ? 'active' : ''}
            onClick={() => setSelectedSubject(id)}
            data-testid={`filter-${id}`}
          >
            {t(`subject.${id}`)}
          </button>
        ))}
      </nav>

      <div className="game-grid" data-testid="game-grid">
        {filteredGames.map(game => (
          <div
            key={game.gameId}
            className={`game-card${game.playable ? '' : ' game-card--soon'}`}
            data-testid={`game-card-${game.gameId}`}
            onClick={() => game.playable && navigate(`/game/${game.gameId}`)}
            style={{ cursor: game.playable ? 'pointer' : 'default' }}
          >
            {game.playable && <span className="badge-new">{t('game.playable')}</span>}
            <img src={game.thumbnailUrl} alt={game.title} loading="lazy" />
            <h3>{game.title}</h3>
            <span className="subject-tag">{t(`subject.${game.subject}`)}</span>
            <p>{game.description}</p>
            <button className="play-btn" disabled={!game.playable}>
              {game.playable ? t('game.playNow') : t('game.comingSoon')}
            </button>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <p data-testid="no-games">{t('home.noGames')}</p>
      )}
    </div>
  );
}
