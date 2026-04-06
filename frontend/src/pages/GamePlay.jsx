import { useParams, useNavigate } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import Game2048      from '../game/Game2048/index.jsx';
import TicTacToe     from '../game/TicTacToe/index.jsx';
import WordQuizVi    from '../game/WordQuizVi/index.jsx';
import MathCompare   from '../game/MathCompare/index.jsx';
import DienDauTiengViet from '../game/DienDauTiengViet/index.jsx';
import { MOCK_GAMES } from '../services/mockData';

const GAME_COMPONENTS = {
  'game-2048':    Game2048,
  'tic-tac-toe':  TicTacToe,
  'word-quiz-vi': WordQuizVi,
  'math-compare': MathCompare,
  'dien-dau-tieng-viet': DienDauTiengViet,
};

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const GameComponent = GAME_COMPONENTS[gameId];
  const meta = MOCK_GAMES.find(g => g.gameId === gameId);

  if (!GameComponent) {
    return (
      <div style={{ textAlign: 'center', padding: 48 }}>
        <p style={{ fontSize: 18, color: '#888' }}>{t('game.notFound')}</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', cursor: 'pointer', borderRadius: 8, border: 'none', background: '#1a73e8', color: '#fff', fontWeight: 700 }}>
          {t('game.backHome')}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 0' }}>
      {meta && (
        <div style={{ textAlign: 'center', marginBottom: 8, color: '#888', fontSize: 13 }}>
          <span style={{ background: '#f1f3f4', padding: '2px 10px', borderRadius: 99 }}>
            {t(`subject.${meta.subject}`)}
          </span>
          {' '}{meta.title}
        </div>
      )}
      <GameComponent onBack={() => navigate('/')} />
    </div>
  );
}
