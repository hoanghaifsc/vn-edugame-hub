import { useState, useCallback } from 'react';
import { useLang } from '../../hooks/useLang';
import { getRandomQuestions } from './questions';

const QUESTIONS_PER_ROUND = 5;

function initState() {
  return {
    questions: getRandomQuestions(QUESTIONS_PER_ROUND),
    current: 0,
    score: 0,
    chosen: null,   // index of chosen answer
    phase: 'playing', // 'playing' | 'feedback' | 'done'
  };
}

export default function WordQuizVi({ onBack }) {
  const { t } = useLang();
  const [state, setState] = useState(initState);

  const { questions, current, score, chosen, phase } = state;
  const q = questions[current];
  const total = questions.length;
  const progress = phase === 'done' ? 100 : Math.round((current / total) * 100);

  const choose = useCallback((idx) => {
    if (phase !== 'playing') return;
    const isCorrect = idx === q.correct;
    setState(s => ({
      ...s,
      chosen: idx,
      phase: 'feedback',
      score: isCorrect ? s.score + 1 : s.score,
    }));
  }, [phase, q]);

  const next = useCallback(() => {
    setState(s => {
      if (s.current + 1 >= total) return { ...s, phase: 'done' };
      return { ...s, current: s.current + 1, chosen: null, phase: 'playing' };
    });
  }, [total]);

  const restart = useCallback(() => setState(initState()), []);

  // ── result screen ────────────────────────────────────────────────────────
  if (phase === 'done') {
    const pct = Math.round((score / total) * 100);
    const msg =
      pct === 100 ? '🎉 Xuất sắc! Bé trả lời đúng tất cả!' :
      pct >= 60   ? '👏 Làm tốt lắm! Cố gắng thêm nhé.' :
                   '💪 Tiếp tục luyện tập để giỏi hơn!';
    return (
      <div style={S.wrap}>
        <div style={S.resultCard}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>
            {pct === 100 ? '🏆' : pct >= 60 ? '⭐' : '📚'}
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>Kết quả</h2>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#1a73e8', margin: '12px 0' }}>
            {score}/{total}
          </div>
          <p style={{ color: '#555', margin: '0 0 20px', fontSize: 15 }}>{msg}</p>
          <div style={S.controls}>
            <button style={S.btnSec} onClick={onBack}>← {t('ttt.back')}</button>
            <button style={S.btnPri} onClick={restart}>Chơi lại</button>
          </div>
        </div>
      </div>
    );
  }

  // ── quiz screen ──────────────────────────────────────────────────────────
  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.topRow}>
        <span style={{ fontWeight: 700, color: '#1a73e8' }}>
          Câu {current + 1}/{total}
        </span>
        <span style={{ fontWeight: 700 }}>
          Điểm: <span style={{ color: '#34a853' }}>{score}</span>
        </span>
      </div>

      {/* Progress */}
      <div style={S.progressTrack}>
        <div style={{ ...S.progressBar, width: `${progress}%` }} />
      </div>

      {/* Type badge */}
      <div style={{ marginBottom: 8 }}>
        <span style={S.typeBadge}>{TYPE_LABELS[q.type] || q.type}</span>
      </div>

      {/* Question */}
      <h2 style={S.question}>{q.question}</h2>
      <p style={S.hint}>{q.hint}</p>

      {/* Answers */}
      <div style={S.answerGrid}>
        {q.answers.map((ans, idx) => {
          let bg = '#fff', border = '#e0e0e0', color = '#333';
          if (phase === 'feedback') {
            if (idx === q.correct) { bg = '#e6f4ea'; border = '#34a853'; color = '#137333'; }
            else if (idx === chosen) { bg = '#fce8e6'; border = '#ea4335'; color = '#c5221f'; }
            else { bg = '#fafafa'; color = '#aaa'; }
          }
          return (
            <button
              key={idx}
              style={{ ...S.ansBtn, background: bg, borderColor: border, color }}
              onClick={() => choose(idx)}
              disabled={phase !== 'playing'}
            >
              <span style={S.ansBadge}>{String.fromCharCode(65 + idx)}</span>
              {ans}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {phase === 'feedback' && (
        <div style={{
          ...S.feedback,
          background: chosen === q.correct ? '#e6f4ea' : '#fce8e6',
          borderColor: chosen === q.correct ? '#34a853' : '#ea4335',
        }}>
          <strong>{chosen === q.correct ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong>
          {' '}{q.explain}
        </div>
      )}

      {/* Actions */}
      <div style={{ ...S.controls, marginTop: 16 }}>
        <button style={S.btnSec} onClick={onBack}>← Quay lại</button>
        {phase === 'feedback' && (
          <button style={S.btnPri} onClick={next}>
            {current + 1 < total ? 'Câu tiếp →' : 'Xem kết quả →'}
          </button>
        )}
      </div>
    </div>
  );
}

const TYPE_LABELS = {
  spelling:    '📝 Chính tả',
  meaning:     '📖 Nghĩa từ',
  fill:        '✏️ Điền từ',
  classify:    '🗂️ Phân loại',
  punctuation: '❓ Dấu câu',
};

const S = {
  wrap:         { maxWidth: 480, margin: '0 auto', padding: '16px 12px', fontFamily: 'Arial,sans-serif' },
  topRow:       { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 },
  progressTrack:{ height: 10, background: '#e8eaed', borderRadius: 999, overflow: 'hidden', marginBottom: 16 },
  progressBar:  { height: '100%', background: '#1a73e8', transition: 'width .3s' },
  typeBadge:    { background: '#e8f0fe', color: '#1a73e8', borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 700 },
  question:     { fontSize: 22, fontWeight: 800, margin: '10px 0 6px', lineHeight: 1.4 },
  hint:         { color: '#5f6368', fontSize: 14, margin: '0 0 16px', lineHeight: 1.5 },
  answerGrid:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 },
  ansBtn:       { display: 'flex', alignItems: 'center', gap: 8, border: '2px solid', borderRadius: 10, padding: '12px 10px', fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: '.15s', background: '#fff' },
  ansBadge:     { width: 24, height: 24, borderRadius: 6, background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, color: '#444' },
  feedback:     { border: '2px solid', borderRadius: 12, padding: '12px 14px', fontSize: 14, lineHeight: 1.5, marginTop: 4 },
  controls:     { display: 'flex', gap: 8 },
  btnPri:       { flex: 1, padding: '11px 0', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' },
  btnSec:       { flex: 1, padding: '11px 0', background: '#f1f3f4', color: '#333', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' },
  resultCard:   { textAlign: 'center', background: '#fff', borderRadius: 18, padding: '32px 24px', boxShadow: '0 2px 16px rgba(0,0,0,.08)' },
};
