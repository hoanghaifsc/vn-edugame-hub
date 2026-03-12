import { useState, useEffect } from 'react';
import { useLang } from '../../hooks/useLang';

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(sq) {
  for (const [a,b,c] of LINES) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return { winner: sq[a], line:[a,b,c] };
  }
  return null;
}

function minimax(sq, isMax, alpha = -Infinity, beta = Infinity) {
  const r = checkWinner(sq);
  if (r) return r.winner === 'O' ? 10 : -10;
  if (sq.every(Boolean)) return 0;
  let best = isMax ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (sq[i]) continue;
    sq[i] = isMax ? 'O' : 'X';
    const score = minimax(sq, !isMax, alpha, beta);
    sq[i] = null;
    if (isMax) { best = Math.max(best, score); alpha = Math.max(alpha, best); }
    else        { best = Math.min(best, score); beta  = Math.min(beta,  best); }
    if (beta <= alpha) break;
  }
  return best;
}

function bestMove(sq) {
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (sq[i]) continue;
    sq[i] = 'O';
    const score = minimax([...sq], false);
    sq[i] = null;
    if (score > best) { best = score; move = i; }
  }
  return move;
}

const INIT = { squares: Array(9).fill(null), xIsNext: true, status: 'playing' };

export default function TicTacToe({ onBack }) {
  const { t } = useLang();
  const [{ squares, xIsNext, status }, setState] = useState(INIT);
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

  const result = checkWinner(squares);
  const winLine = result?.line || [];

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
        if (r2)        setScore(s => ({ ...s, O: s.O + 1 }));
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
    if (r)         setScore(s => ({ ...s, X: s.X + 1 }));
    else if (full) setScore(s => ({ ...s, draw: s.draw + 1 }));
  }

  const statusMsg =
    status === 'won-X' ? t('ttt.youWin')    :
    status === 'won-O' ? t('ttt.aiWin')     :
    status === 'draw'  ? t('ttt.drawMsg')   :
    xIsNext            ? t('ttt.yourTurn')  : t('ttt.aiThinking');

  const statusBg =
    status === 'won-X' ? '#34a853' :
    status === 'won-O' ? '#ea4335' :
    status === 'draw'  ? '#fbbc04' : '#1a1a2e';

  return (
    <div style={S.wrapper}>
      <div style={S.header}>
        <h2 style={S.title}>Tic Tac Toe</h2>
        <div style={S.scoreRow}>
          <Chip label={t('ttt.you')}  value={score.X} color="#1a73e8" />
          <Chip label={t('ttt.draw')} value={score.draw} color="#888" />
          <Chip label={t('ttt.ai')}   value={score.O} color="#ea4335" />
        </div>
      </div>

      <div style={{ ...S.statusBar, background: statusBg }}>{statusMsg}</div>

      <div style={S.board}>
        {squares.map((val, i) => {
          const isWin = winLine.includes(i);
          return (
            <button key={i} style={{
              ...S.cell,
              color: val === 'X' ? '#1a73e8' : '#ea4335',
              background: isWin ? '#fffde7' : '#fff',
              cursor: val || status !== 'playing' || !xIsNext ? 'default' : 'pointer',
              boxShadow: isWin ? 'inset 0 0 0 3px #fbbc04' : 'inset 0 0 0 1px #ddd',
            }} onClick={() => handleClick(i)}>
              {val}
            </button>
          );
        })}
      </div>

      <div style={S.controls}>
        <button style={S.btnSec} onClick={onBack}>{t('ttt.back')}</button>
        <button style={S.btnPri} onClick={() => setState(INIT)}>{t('ttt.newGame')}</button>
      </div>
    </div>
  );
}

function Chip({ label, value, color }) {
  return (
    <div style={{ textAlign:'center' }}>
      <div style={{ fontSize:11, color:'#999', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:24, fontWeight:900, color }}>{value}</div>
    </div>
  );
}

const S = {
  wrapper:   { maxWidth:360, margin:'0 auto', padding:16, fontFamily:'Arial,sans-serif' },
  header:    { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  title:     { margin:0, fontSize:28, fontWeight:900, color:'#333' },
  scoreRow:  { display:'flex', gap:20 },
  statusBar: { textAlign:'center', padding:'10px 0', borderRadius:8, color:'#fff', fontWeight:700, fontSize:16, marginBottom:14 },
  board:     { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:14 },
  cell:      { aspectRatio:'1', border:'none', borderRadius:10, fontSize:48, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', padding:0 },
  controls:  { display:'flex', gap:8 },
  btnPri:    { flex:1, padding:'11px 0', background:'#1a73e8', color:'#fff', border:'none', borderRadius:8, fontWeight:700, fontSize:15, cursor:'pointer' },
  btnSec:    { flex:1, padding:'11px 0', background:'#f1f3f4', color:'#333', border:'none', borderRadius:8, fontWeight:700, fontSize:15, cursor:'pointer' },
};
