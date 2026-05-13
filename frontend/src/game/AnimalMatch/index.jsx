import { useMemo, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { getQuestion } from './data';

const TOTAL_QUESTIONS = 8;

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

export default function AnimalMatch({ onBack }) {
  const { t } = useLang();
  const [state, setState] = useState(createRound);

  const { current, score, streak, level, phase, selected, history, question, lastResult } = state;
  const progress = phase === 'done' ? 100 : Math.round((current / TOTAL_QUESTIONS) * 100);
  const correctCount = history.filter((item) => item.isCorrect).length;

  const levelLabel = useMemo(() => {
    if (level === 1) return t('animalMatch.level1');
    if (level === 2) return t('animalMatch.level2');
    return t('animalMatch.level3');
  }, [level, t]);

  function choose(option) {
    if (phase !== 'playing' || !question) return;
    const isCorrect = option === question.answer;
    const nextStreak = isCorrect ? streak + 1 : 0;
    const points = isCorrect ? (level === 1 ? 10 : level === 2 ? 15 : 20) : 0;

    setState((prev) => ({
      ...prev,
      selected: option,
      phase: 'feedback',
      score: prev.score + points,
      streak: nextStreak,
      lastResult: {
        isCorrect,
        points,
        explanation: question.explanation,
      },
      history: [...prev.history, { questionId: question.id, isCorrect, chosen: option, correct: question.answer }],
    }));
  }

  function next() {
    setState((prev) => {
      if (prev.current + 1 >= TOTAL_QUESTIONS) {
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
      <div style={S.page}>
        <div style={S.card}>
          <p style={S.helper}>{t('game.notFound')}</p>
          <button type="button" style={S.secondaryBtn} onClick={onBack}>{t('animalMatch.back')}</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const pct = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
    const tone = pct >= 80 ? '#34a853' : pct >= 50 ? '#fbbc04' : '#ea4335';
    const message = pct >= 80 ? t('animalMatch.resultGreat') : pct >= 50 ? t('animalMatch.resultGood') : t('animalMatch.resultTry');

    return (
      <div style={S.page}>
        <div style={{ ...S.card, ...S.resultCard }}>
          <div style={{ ...S.resultIcon, background: tone }}>{pct >= 80 ? '🦁' : pct >= 50 ? '🐼' : '🐣'}</div>
          <h2 style={S.title}>{t('animalMatch.resultTitle')}</h2>
          <div style={{ ...S.bigScore, color: tone }}>{score}</div>
          <div style={S.resultMeta}>{correctCount}/{TOTAL_QUESTIONS} {t('animalMatch.correctAnswers')}</div>
          <p style={S.resultText}>{message}</p>
          <div style={S.controls}>
            <button type="button" style={S.secondaryBtn} onClick={onBack}>{t('animalMatch.back')}</button>
            <button type="button" style={S.primaryBtn} onClick={restart}>{t('animalMatch.playAgain')}</button>
          </div>
        </div>
      </div>
    );
  }

  const feedbackCorrect = lastResult?.isCorrect;

  return (
    <div style={S.page}>
      <div style={S.shell}>
        <div style={S.topRow}>
          <div>
            <h2 style={S.title}>{t('game.animal-match.title')}</h2>
            <div style={S.subtitle}>{t('animalMatch.subtitle')}</div>
          </div>
          <div style={S.scoreBox}>
            <div style={S.scoreLabel}>{t('animalMatch.score')}</div>
            <div style={S.scoreValue}>{score}</div>
          </div>
        </div>

        <div style={S.progressTrack}>
          <div style={{ ...S.progressBar, width: `${progress}%` }} />
        </div>

        <div style={S.metaRow}>
          <span style={S.metaBadge}>{t('animalMatch.question')} {current + 1}/{TOTAL_QUESTIONS}</span>
          <span style={{ ...S.metaBadge, background: '#fff7e0', color: '#b06000' }}>{levelLabel}</span>
          <span style={{ ...S.metaBadge, background: '#e6f4ea', color: '#137333' }}>{t('animalMatch.streak')} {streak}</span>
        </div>

        <div style={S.card}>
          <div style={S.heroBox}>
            <div style={S.emoji}>{question.emoji}</div>
            <div>
              <div style={S.animalName}>{question.animal}</div>
              <div style={S.prompt}>{question.prompt}</div>
            </div>
          </div>

          <p style={S.helper}>{t('animalMatch.instruction')}</p>

          <div style={S.optionsList}>
            {question.options.map((option) => {
              const isCorrect = phase === 'feedback' && option === question.answer;
              const isWrongPick = phase === 'feedback' && option === selected && selected !== question.answer;
              const isLocked = phase === 'feedback' && !isCorrect && !isWrongPick;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  disabled={phase !== 'playing'}
                  style={{
                    ...S.optionBtn,
                    ...(isCorrect ? S.optionBtnCorrect : {}),
                    ...(isWrongPick ? S.optionBtnWrong : {}),
                    ...(isLocked ? S.optionBtnLocked : {}),
                    ...(phase !== 'playing' ? S.optionBtnDisabled : {}),
                  }}
                >
                  <span>{option}</span>
                  {isCorrect && <span style={S.answerBadge}>{t('animalMatch.correctBadge')}</span>}
                  {isWrongPick && <span style={S.answerBadge}>{t('animalMatch.wrongBadge')}</span>}
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
              <strong>{feedbackCorrect ? t('animalMatch.correct') : t('animalMatch.wrong')}</strong>
              <div style={{ marginTop: 6 }}>{lastResult?.explanation}</div>
              {!feedbackCorrect && <div style={{ marginTop: 6 }}>{t('animalMatch.correctAnswer')} {question.answer}</div>}
              {feedbackCorrect && <div style={{ marginTop: 6 }}>+{lastResult?.points} {t('animalMatch.points')}</div>}
            </div>
          )}
        </div>

        <div style={S.controls}>
          <button type="button" style={S.secondaryBtn} onClick={onBack}>{t('animalMatch.back')}</button>
          {phase === 'feedback' && (
            <button type="button" style={S.primaryBtn} onClick={next}>
              {current + 1 < TOTAL_QUESTIONS ? t('animalMatch.next') : t('animalMatch.viewResult')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const S = {
  page: {
    minHeight: '100vh',
    background: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
    padding: '16px 12px 24px',
    display: 'flex',
    justifyContent: 'center',
    color: '#202124',
  },
  shell: { width: '100%', maxWidth: 480 },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  title: { margin: 0, fontSize: 28, fontWeight: 800, color: '#1f1f1f' },
  subtitle: { marginTop: 6, color: '#5f6368', fontSize: 14, lineHeight: 1.4 },
  scoreBox: {
    minWidth: 96,
    background: '#fff',
    borderRadius: 12,
    padding: '10px 12px',
    textAlign: 'center',
    boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  },
  scoreLabel: { fontSize: 12, color: '#5f6368', fontWeight: 700 },
  scoreValue: { fontSize: 28, color: '#1a73e8', fontWeight: 900 },
  progressTrack: { height: 10, background: '#dfe1e5', borderRadius: 999, overflow: 'hidden', marginBottom: 12 },
  progressBar: { height: '100%', background: '#1a73e8', transition: 'width .25s ease' },
  metaRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
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
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 2px 10px rgba(0,0,0,.07)',
    border: '1px solid #dadce0',
  },
  heroBox: {
    display: 'grid',
    gridTemplateColumns: '96px 1fr',
    gap: 14,
    alignItems: 'center',
    background: '#e8f0fe',
    border: '1px solid #d2e3fc',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  emoji: {
    width: 96,
    height: 96,
    borderRadius: 16,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 54,
  },
  animalName: { fontSize: 28, fontWeight: 800, color: '#202124', lineHeight: 1.1 },
  prompt: { marginTop: 8, fontSize: 16, color: '#5f6368', lineHeight: 1.4 },
  helper: { margin: '0 0 12px', textAlign: 'center', color: '#5f6368', fontSize: 14 },
  optionsList: { display: 'grid', gap: 10 },
  optionBtn: {
    width: '100%',
    minHeight: 56,
    padding: '14px 16px',
    borderRadius: 10,
    border: '1.5px solid #dadce0',
    background: '#fff',
    color: '#202124',
    fontSize: 18,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    textAlign: 'left',
  },
  optionBtnDisabled: { cursor: 'not-allowed', opacity: 0.96 },
  optionBtnCorrect: { background: '#e6f4ea', border: '2px solid #34a853', color: '#137333' },
  optionBtnWrong: { background: '#fce8e6', border: '2px solid #ea4335', color: '#c5221f' },
  optionBtnLocked: { background: '#f1f3f4', border: '1.5px solid #dadce0', color: '#5f6368' },
  answerBadge: { fontSize: 13, fontWeight: 700, minWidth: 42, textAlign: 'right' },
  feedback: {
    marginTop: 14,
    border: '2px solid',
    borderRadius: 12,
    padding: '12px 14px',
    fontSize: 14,
    lineHeight: 1.5,
  },
  controls: { display: 'flex', gap: 8, marginTop: 16 },
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
    background: '#fff',
    color: '#202124',
    border: '1.5px solid #dadce0',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  },
  resultCard: { textAlign: 'center', padding: '28px 20px' },
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
  bigScore: { fontSize: 56, fontWeight: 900, lineHeight: 1, margin: '8px 0' },
  resultMeta: { color: '#5f6368', fontSize: 15, fontWeight: 700 },
  resultText: { color: '#5f6368', fontSize: 15, lineHeight: 1.5, margin: '12px 0 0' },
};
