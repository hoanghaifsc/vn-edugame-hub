import { useMemo, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { getQuestion } from './data';

const TOTAL_QUESTIONS = 8;
const OPTIONS = ['<', '=', '>'];

function createRound() {
  const first = getQuestion(1, []);
  return {
    current: 0,
    score: 0,
    streak: 0,
    level: 1,
    phase: 'playing',
    selected: null,
    history: [],
    usedIds: first ? [first.id] : [],
    question: first,
    lastResult: null,
  };
}

function getNextLevel(currentLevel, isCorrect, streak) {
  if (isCorrect && streak >= 2) return Math.min(3, currentLevel + 1);
  if (!isCorrect) return Math.max(1, currentLevel - 1);
  return currentLevel;
}

export default function MathCompare({ onBack }) {
  const { t } = useLang();
  const [state, setState] = useState(createRound);

  const { current, score, streak, level, phase, selected, history, question, lastResult } = state;
  const total = TOTAL_QUESTIONS;
  const progress = phase === 'done' ? 100 : Math.round((current / total) * 100);
  const correctCount = history.filter((item) => item.isCorrect).length;

  const levelLabel = useMemo(() => {
    if (level === 1) return t('mathCompare.level1');
    if (level === 2) return t('mathCompare.level2');
    return t('mathCompare.level3');
  }, [level, t]);

  function choose(symbol) {
    if (phase !== 'playing' || !question) return;
    const isCorrect = symbol === question.answer;
    const nextStreak = isCorrect ? streak + 1 : 0;
    const points = isCorrect ? (level === 1 ? 10 : level === 2 ? 15 : 20) : 0;

    setState((prev) => ({
      ...prev,
      selected: symbol,
      phase: 'feedback',
      score: prev.score + points,
      streak: nextStreak,
      lastResult: {
        isCorrect,
        points,
        explanation: question.explain,
      },
      history: [...prev.history, { questionId: question.id, isCorrect, chosen: symbol, correct: question.answer }],
    }));
  }

  function next() {
    setState((prev) => {
      if (prev.current + 1 >= total) {
        return { ...prev, phase: 'done' };
      }
      const isCorrect = prev.lastResult?.isCorrect;
      const nextLevel = getNextLevel(prev.level, isCorrect, prev.streak);
      const nextQuestion = getQuestion(nextLevel, prev.usedIds);
      return {
        ...prev,
        current: prev.current + 1,
        level: nextLevel,
        question: nextQuestion,
        usedIds: nextQuestion ? [...prev.usedIds, nextQuestion.id] : prev.usedIds,
        selected: null,
        phase: 'playing',
        lastResult: null,
      };
    });
  }

  function restart() {
    setState(createRound());
  }

  if (!question) {
    return (
      <div style={S.wrap}>
        <div style={S.card}>
          <p>{t('game.notFound')}</p>
          <button style={S.secondaryBtn} onClick={onBack}>{t('mathCompare.back')}</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const pct = Math.round((correctCount / total) * 100);
    const tone = pct >= 80 ? '#34a853' : pct >= 50 ? '#fbbc04' : '#ea4335';
    const message = pct >= 80 ? t('mathCompare.resultGreat') : pct >= 50 ? t('mathCompare.resultGood') : t('mathCompare.resultTry');

    return (
      <div style={S.wrap}>
        <div style={{ ...S.card, ...S.resultCard }}>
          <div style={{ ...S.resultIcon, background: tone }}>{pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📘'}</div>
          <h2 style={S.title}>{t('mathCompare.resultTitle')}</h2>
          <div style={{ ...S.bigScore, color: tone }}>{score}</div>
          <div style={S.resultMeta}>{correctCount}/{total} {t('mathCompare.correctAnswers')}</div>
          <p style={S.resultText}>{message}</p>
          <div style={S.controls}>
            <button style={S.secondaryBtn} onClick={onBack}>{t('mathCompare.back')}</button>
            <button style={S.primaryBtn} onClick={restart}>{t('mathCompare.playAgain')}</button>
          </div>
        </div>
      </div>
    );
  }

  const feedbackCorrect = lastResult?.isCorrect;

  return (
    <div style={S.wrap}>
      <div style={S.topRow}>
        <div>
          <h2 style={S.title}>{t('game.math-compare.title')}</h2>
          <div style={S.subtitle}>{t('mathCompare.subtitle')}</div>
        </div>
        <div style={S.scoreBox}>
          <div style={S.scoreLabel}>{t('mathCompare.score')}</div>
          <div style={S.scoreValue}>{score}</div>
        </div>
      </div>

      <div style={S.progressTrack}>
        <div style={{ ...S.progressBar, width: `${progress}%` }} />
      </div>

      <div style={S.metaRow}>
        <span style={S.metaBadge}>{t('mathCompare.question')} {current + 1}/{total}</span>
        <span style={{ ...S.metaBadge, background: '#fff7e0', color: '#b06000' }}>{levelLabel}</span>
        <span style={{ ...S.metaBadge, background: '#e6f4ea', color: '#137333' }}>{t('mathCompare.streak')} {streak}</span>
      </div>

      <div style={S.card}>
        <div style={S.numberRow}>
          <div style={S.numberBox}>{question.left}</div>
          <div style={S.compareSlot}>{selected || '?'}</div>
          <div style={S.numberBox}>{question.right}</div>
        </div>

        <p style={S.instruction}>{t('mathCompare.instruction')}</p>

        <div style={S.optionsRow}>
          {OPTIONS.map((symbol) => {
            const isCorrect = phase === 'feedback' && symbol === question.answer;
            const isWrongPick = phase === 'feedback' && symbol === selected && selected !== question.answer;
            return (
              <button
                key={symbol}
                onClick={() => choose(symbol)}
                disabled={phase !== 'playing'}
                style={{
                  ...S.optionBtn,
                  background: isCorrect ? '#e6f4ea' : isWrongPick ? '#fce8e6' : '#fff',
                  borderColor: isCorrect ? '#34a853' : isWrongPick ? '#ea4335' : '#d2e3fc',
                  color: isCorrect ? '#137333' : isWrongPick ? '#c5221f' : '#1a73e8',
                  cursor: phase === 'playing' ? 'pointer' : 'default',
                }}
              >
                {symbol}
              </button>
            );
          })}
        </div>

        {phase === 'feedback' && (
          <div style={{
            ...S.feedback,
            background: feedbackCorrect ? '#e6f4ea' : '#fce8e6',
            borderColor: feedbackCorrect ? '#34a853' : '#ea4335',
            color: feedbackCorrect ? '#137333' : '#c5221f',
          }}>
            <strong>{feedbackCorrect ? t('mathCompare.correct') : t('mathCompare.wrong')}</strong>
            <div style={{ marginTop: 6 }}>{lastResult?.explanation}</div>
            {feedbackCorrect && <div style={{ marginTop: 6 }}>+{lastResult?.points} {t('mathCompare.points')}</div>}
          </div>
        )}
      </div>

      <div style={S.controls}>
        <button style={S.secondaryBtn} onClick={onBack}>{t('mathCompare.back')}</button>
        {phase === 'feedback' && (
          <button style={S.primaryBtn} onClick={next}>
            {current + 1 < total ? t('mathCompare.next') : t('mathCompare.viewResult')}
          </button>
        )}
      </div>
    </div>
  );
}

const S = {
  wrap: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '16px 12px 24px',
    fontFamily: 'Arial,sans-serif',
    background: '#f8f9fa',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: '#1f1f1f',
  },
  subtitle: {
    marginTop: 6,
    color: '#5f6368',
    fontSize: 14,
    lineHeight: 1.4,
  },
  scoreBox: {
    minWidth: 96,
    background: '#ffffff',
    borderRadius: 12,
    padding: '10px 12px',
    textAlign: 'center',
    boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  },
  scoreLabel: { fontSize: 12, color: '#5f6368', fontWeight: 700 },
  scoreValue: { fontSize: 28, color: '#1a73e8', fontWeight: 900 },
  progressTrack: {
    height: 10,
    background: '#dfe1e5',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: { height: '100%', background: '#1a73e8', transition: 'width .25s ease' },
  metaRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metaBadge: {
    background: '#e8f0fe',
    color: '#1a73e8',
    borderRadius: 999,
    padding: '6px 10px',
    fontSize: 12,
    fontWeight: 700,
  },
  card: {
    background: '#fff',
    borderRadius: 14,
    padding: 16,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  numberRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  numberBox: {
    minHeight: 112,
    borderRadius: 14,
    background: '#f1f3f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 42,
    fontWeight: 900,
    color: '#202124',
  },
  compareSlot: {
    width: 70,
    height: 70,
    borderRadius: 14,
    background: '#1a73e8',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 900,
  },
  instruction: {
    margin: '0 0 12px',
    textAlign: 'center',
    color: '#5f6368',
    fontSize: 14,
  },
  optionsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
  },
  optionBtn: {
    border: '2px solid #d2e3fc',
    borderRadius: 14,
    minHeight: 72,
    fontSize: 34,
    fontWeight: 900,
    background: '#fff',
  },
  feedback: {
    marginTop: 14,
    border: '2px solid',
    borderRadius: 12,
    padding: '12px 14px',
    fontSize: 14,
    lineHeight: 1.5,
  },
  controls: {
    display: 'flex',
    gap: 8,
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    padding: '12px 0',
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  },
  secondaryBtn: {
    flex: 1,
    padding: '12px 0',
    background: '#f1f3f4',
    color: '#202124',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  },
  resultCard: {
    textAlign: 'center',
    padding: '28px 20px',
  },
  resultIcon: {
    width: 72,
    height: 72,
    margin: '0 auto 12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 34,
    color: '#fff',
  },
  bigScore: {
    fontSize: 56,
    fontWeight: 900,
    lineHeight: 1,
    margin: '8px 0',
  },
  resultMeta: {
    color: '#5f6368',
    fontSize: 15,
    fontWeight: 700,
  },
  resultText: {
    color: '#5f6368',
    fontSize: 15,
    lineHeight: 1.5,
    margin: '12px 0 0',
  },
};
