import { useState, useEffect, useCallback, useRef } from 'react';
import { useLang } from '../../hooks/useLang';

const SIZE = 4;

const TILE_COLORS = {
  0:    { bg: '#cdc1b4', color: '#776e65' },
  2:    { bg: '#eee4da', color: '#776e65' },
  4:    { bg: '#ede0c8', color: '#776e65' },
  8:    { bg: '#f2b179', color: '#f9f6f2' },
  16:   { bg: '#f59563', color: '#f9f6f2' },
  32:   { bg: '#f67c5f', color: '#f9f6f2' },
  64:   { bg: '#f65e3b', color: '#f9f6f2' },
  128:  { bg: '#edcf72', color: '#f9f6f2' },
  256:  { bg: '#edcc61', color: '#f9f6f2' },
  512:  { bg: '#edc850', color: '#f9f6f2' },
  1024: { bg: '#edc53f', color: '#f9f6f2' },
  2048: { bg: '#edc22e', color: '#f9f6f2' },
};

function emptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function spawnTile(board) {
  const empty = [];
  board.forEach((row, r) => row.forEach((v, c) => { if (v === 0) empty.push([r, c]); }));
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = board.map(row => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRowLeft(row) {
  const tiles = row.filter(v => v !== 0);
  let gained = 0;
  const merged = [];
  let i = 0;
  while (i < tiles.length) {
    if (i + 1 < tiles.length && tiles[i] === tiles[i + 1]) {
      const val = tiles[i] * 2;
      merged.push(val);
      gained += val;
      i += 2;
    } else {
      merged.push(tiles[i]);
      i++;
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged, gained };
}

function transpose(board) { return board[0].map((_, c) => board.map(row => row[c])); }
function reverseRows(board) { return board.map(row => [...row].reverse()); }

function applyMove(board, dir) {
  let b = board.map(row => [...row]);
  let totalGained = 0;
  if (dir === 'right') b = reverseRows(b);
  if (dir === 'up')    b = transpose(b);
  if (dir === 'down')  b = transpose(reverseRows(b));
  b = b.map(row => { const { row: r, gained } = slideRowLeft(row); totalGained += gained; return r; });
  if (dir === 'right') b = reverseRows(b);
  if (dir === 'up')    b = transpose(b);
  if (dir === 'down')  b = reverseRows(transpose(b));
  return { board: b, gained: totalGained };
}

function boardsEqual(a, b) { return a.every((row, r) => row.every((v, c) => v === b[r][c])); }
function hasValidMove(board) { return ['left','right','up','down'].some(d => !boardsEqual(board, applyMove(board,d).board)); }
function hasTile(board, val) { return board.some(row => row.some(v => v === val)); }

function initState() {
  return { board: spawnTile(spawnTile(emptyBoard())), score: 0, best: 0, status: 'playing' };
}

export default function Game2048({ onBack }) {
  const { t } = useLang();
  const [{ board, score, best, status }, setState] = useState(initState);
  const touchRef = useRef(null);

  const move = useCallback((dir) => {
    setState(prev => {
      if (prev.status !== 'playing') return prev;
      const { board: next, gained } = applyMove(prev.board, dir);
      if (boardsEqual(prev.board, next)) return prev;
      const spawned = spawnTile(next);
      const newScore = prev.score + gained;
      const newBest  = Math.max(prev.best, newScore);
      const won  = hasTile(spawned, 2048);
      const lost = !won && !hasValidMove(spawned);
      return { board: spawned, score: newScore, best: newBest, status: won ? 'won' : lost ? 'lost' : 'playing' };
    });
  }, []);

  useEffect(() => {
    const MAP = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down' };
    const handler = e => { if (MAP[e.key]) { e.preventDefault(); move(MAP[e.key]); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move]);

  const onTouchStart = e => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = e => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
    touchRef.current = null;
  };

  return (
    <div style={S.wrapper} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div style={S.header}>
        <div>
          <h2 style={S.title}>2048</h2>
          <p style={S.hint}>{t('2048.hint')}</p>
        </div>
        <div style={S.scoreRow}>
          <ScoreBox label={t('2048.score')} value={score} />
          <ScoreBox label={t('2048.best')}  value={best}  />
        </div>
      </div>

      <div style={S.controls}>
        <button style={S.btnSec} onClick={onBack}>{t('2048.back')}</button>
        <button style={S.btnPri} onClick={() => setState(initState)}>{t('2048.restart')}</button>
      </div>

      {status !== 'playing' && (
        <div style={S.overlay}>
          <p style={S.overlayTitle}>{status === 'won' ? t('2048.won') : t('2048.lost')}</p>
          <p style={{ color:'#fff', marginBottom:16 }}>{t('2048.score_label')} {score}</p>
          <button style={S.btnPri} onClick={() => setState(initState)}>{t('2048.restart')}</button>
        </div>
      )}

      <div style={S.board}>
        {board.map((row, r) => row.map((val, c) => {
          const tc = TILE_COLORS[val] || { bg:'#3c3a32', color:'#f9f6f2' };
          return (
            <div key={`${r}-${c}`} style={{ ...S.tile, background:tc.bg, color:tc.color, fontSize: val >= 1024 ? 22 : val >= 128 ? 26 : 32 }}>
              {val !== 0 ? val : ''}
            </div>
          );
        }))}
      </div>
    </div>
  );
}

function ScoreBox({ label, value }) {
  return (
    <div style={{ background:'#bbada0', borderRadius:6, padding:'6px 14px', display:'flex', flexDirection:'column', alignItems:'center', minWidth:70 }}>
      <span style={{ fontSize:11, color:'#eee4da', letterSpacing:1 }}>{label}</span>
      <span style={{ fontSize:20, fontWeight:700, color:'#fff' }}>{value}</span>
    </div>
  );
}

const S = {
  wrapper:     { maxWidth:420, margin:'0 auto', padding:16, userSelect:'none', fontFamily:'Arial,sans-serif', position:'relative' },
  header:      { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 },
  title:       { margin:0, fontSize:48, fontWeight:900, color:'#776e65' },
  hint:        { margin:'4px 0 0', fontSize:13, color:'#999' },
  scoreRow:    { display:'flex', gap:8 },
  controls:    { display:'flex', gap:8, marginBottom:12 },
  btnPri:      { flex:1, padding:'10px 0', background:'#8f7a66', color:'#fff', border:'none', borderRadius:6, fontWeight:700, fontSize:15, cursor:'pointer' },
  btnSec:      { flex:1, padding:'10px 0', background:'#eee4da', color:'#776e65', border:'none', borderRadius:6, fontWeight:700, fontSize:15, cursor:'pointer' },
  board:       { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, background:'#bbada0', borderRadius:10, padding:10 },
  tile:        { aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6, fontWeight:900, fontSize:32, transition:'background .1s' },
  overlay:     { position:'absolute', inset:0, background:'rgba(0,0,0,.55)', borderRadius:12, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:10 },
  overlayTitle:{ fontSize:36, fontWeight:900, color:'#fff', margin:'0 0 8px' },
};
