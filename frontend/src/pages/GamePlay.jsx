/**
 * GamePlay.jsx — Router điều phối game dựa vào gameId trong URL
 */
import { useParams, useNavigate } from 'react-router-dom';
import Game2048   from '../game/Game2048/index.jsx';
import TicTacToe  from '../game/TicTacToe/index.jsx';
import { MOCK_GAMES } from '../services/mockData';

const GAME_COMPONENTS = {
  'game-2048':    Game2048,
  'tic-tac-toe':  TicTacToe,
};

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const GameComponent = GAME_COMPONENTS[gameId];
  const meta = MOCK_GAMES.find(g => g.gameId === gameId);

  if (!GameComponent) {
    return (
      <div style={{ textAlign: 'center', padding: 48 }}>
        <p style={{ fontSize: 18, color: '#888' }}>Game "{gameId}" chưa được tích hợp.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', cursor: 'pointer' }}>
          ← Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 0' }}>
      {meta && (
        <div style={{ textAlign: 'center', marginBottom: 8, color: '#888', fontSize: 13 }}>
          <span style={{ background: '#f1f3f4', padding: '2px 10px', borderRadius: 99 }}>{meta.subject}</span>
          {' '}{meta.title}
        </div>
      )}
      <GameComponent onBack={() => navigate('/')} />
    </div>
  );
}
