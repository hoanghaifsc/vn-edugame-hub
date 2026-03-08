/**
 * TicTacToe.jsx — Caro 3x3 vs AI (Minimax)
 * Người chơi = X, AI = O
 */
import { useState, useEffect } from 'react';

// ─── Logic ────────────────────────────────────────────────────────────────────

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],   // hàng ngang
  [0,3,6],[1,4,7],[2,5,8],   // hàng dọc
  [0,4,8],[2,4,6],            // chéo
];

function checkWinner(squares) {
  for (const [a,b,c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return null;
}

function minimax(squares, isMax, alpha = -Infinity, beta = Infinity) {
  const result = checkWinner(squares);
  if (result) return result.winner === 'O' ? 10 : -10;
  if (squares.every(Boolean)) return 0;

  let best = isMax ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (squares[i]) continue;
    squares[i] = isMax ? 'O' : 'X';
    const score = minimax(squares, !isMax, alpha, beta);
    squares[i] = null;
    if (isMax) { best = Math.max(best, score); alpha = Math.max(alpha, best); }
    else        { best = Math.min(best, score); beta  = Math.min(beta, best);  }
    if (beta <= alpha) break;
  }
  return best;
}

function bestMove(squares) {
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (squares[i]) continue;
    squares[i] = 'O';
    const score = minimax([...squares], false);
    squares[i] = null;
    if (score > best) { best = score; move = i; }
  }
  return move;
}

// ─── Component ────────────────────────────────────────────────────────────────

const INIT = { squares: Array(9).fill(null), xIsNext: true, status: 'playing' };

export default function TicTacToe({ onBack }) {
  const [{ squares, xIsNext, status }, setState] = useState(INIT);
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

  const result = checkWinner(squares);
  const winLine = result?.line || [];

  // AI đi sau khi người chơi đi xong
  useEffect(() => {
    if (!xIsNext && status === 'playing' && !result) {
      const timer = setTimeout(() => {
        const idx = bestMove([...squares]);
        if (idx === -1) return;
        const next = [...squares];
        next[idx] = 'O';
        const r2 = checkWinner(next);
        const full = next.every(Boolean);
        let newStatus = 'playing';
        if (r2) newStatus = 'won-O';
        else if (full) newStatus = 'draw';
        setState({ squares: next, xIsNext: true, status: newStatus });
        if (r2)   setScore(s => ({ ...s, O: s.O + 1 }));
        else if (full) setScore(s => ({ ...s, draw: s.draw + 1 }));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [squares, xIsNext, status, result]);

  function handleClick(i) {
    if (squares[i] || status !== 'playing' || !xIsNext) return;
    const next = [...squares];
    next[i] = 'X';
    const r = checkWinner(next);
    const full = next.every(Boolean);
    let newStatus = 'playing';
    if (r) newStatus = 'won-X';
    else if (full) newStatus = 'draw';
    setState({ squares: next, xIsNext: false, status: newStatus });
    if (r)   setScore(s => ({ ...s, X: s.X + 1 }));
    else if (full) setScore(s => ({ ...s, draw: s.draw + 1 }));
  }

  function restart() {
    setState(INIT);
  }

  const statusMsg =
    status === 'won-X'   ? '🎉 Bạn thắng!' :
    status === 'won-O'   ? '🤖 AI thắng!'  :
    status === 'draw'    ? '🤝 Hòa!'        :
    xIsNext              ? '👆 Lượt của bạn (X)' : '⏳ AI đang nghĩ...';

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tic Tac Toe</h2>
        <div style={styles.scoreRow}>
          <ScoreChip label="Bạn (X)" value={score.X} color="#1a73e8" />
          <ScoreChip label="Hòa"     value={score.draw} color="#888" />
          <ScoreChip label="AI (O)"  value={score.O} color="#ea4335" />
        </div>
      </div>

      <div style={{ ...styles.statusBar, background: status === 'won-X' ? '#34a853' : status === 'won-O' ? '#ea4335' : status === 'draw' ? '#fbbc04' : '#1a1a2e' }}>
        {statusMsg}
      </div>

      {/* Board */}
      <div style={styles.board}>
        {squares.map((val, i) => {
          const isWin = winLine.includes(i);
          return (
            <button
              key={i}
              style={{
                ...styles.cell,
                color: val === 'X' ? '#1a73e8' : '#ea4335',
                background: isWin ? '#fffde7' : '#fff',
                transform: val ? 'scale(1)' : 'scale(1)',
                cursor: val || status !== 'playing' || !xIsNext ? 'default' : 'pointer',
                boxShadow: isWin ? 'inset 0 0 0 3px #fbbc04' : 'inset 0 0 0 1px #ddd',
              }}
              onClick={() => handleClick(i)}
            >
              {val}
            </button>
          );
        })}
      </div>

      <div style={styles.controls}>
        <button style={styles.btnSecondary} onClick={onBack}>← Quay lại</button>
        <button style={styles.btnPrimary} onClick={restart}>Ván mới</button>
      </div>
    </div>
  );
}

function ScoreChip({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}

const styles = {
  wrapper:     { maxWidth: 360, margin: '0 auto', padding: 16, fontFamily: 'Arial, sans-serif' },
  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title:       { margin: 0, fontSize: 28, fontWeight: 900, color: '#333' },
  scoreRow:    { display: 'flex', gap: 20 },
  statusBar:   { textAlign: 'center', padding: '10px 0', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 14 },
  board:       { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 },
  cell:        { aspectRatio: '1', border: 'none', borderRadius: 10, fontSize: 48, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, transform 0.1s', padding: 0 },
  controls:    { display: 'flex', gap: 8 },
  btnPrimary:  { flex: 1, padding: '11px 0', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' },
  btnSecondary:{ flex: 1, padding: '11px 0', background: '#f1f3f4', color: '#333', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' },
};
