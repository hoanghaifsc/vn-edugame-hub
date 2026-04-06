import { useMemo, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { buildSession } from './data';

const TOTAL_QUESTIONS = 10;

function createRound() {
  return {
    status: 'playing',
    questions: buildSession(),
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswerCorrect: null,
    score: 0,
    correctCount: 0,
  };
}

export default function DienDauTiengViet({ onBack }) {
  const { t } = useLang();
  const [state, setState] = useState(createRound);

  const { status, questions, currentQuestionIndex, selectedAnswer, isAnswerCorrect, score, correctCount } = state;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = status === 'result' ? 100 : Math.round((currentQuestionIndex / TOTAL_QUESTIONS) * 100);

  const feedbackText = useMemo(() => {
    if (!currentQuestion || selectedAnswer == null) return '';
    return isAnswerCorrect
      ? `✅ Đúng rồi! "${currentQuestion.correctAnswer}" là đáp án đúng.`
      : `❌ Chưa đúng. Đáp án đúng là "${currentQuestion.correctAnswer}".`;
  }, [currentQuestion, isAnswerCorrect, selectedAnswer]);

  function chooseAnswer(answer) {
    if (status !== 'playing' || !currentQuestion) return;
    const correct = answer === currentQuestion.correctAnswer;
    const points = correct ? (currentQuestion.level === 1 ? 10 : currentQuestion.level === 2 ? 12 : 15) : 0;
    setState((prev) => ({
      ...prev,
      status: 'feedback',
      selectedAnswer: answer,
      isAnswerCorrect: correct,
      score: prev.score + points,
      correctCount: prev.correctCount + (correct ? 1 : 0),
    }));
  }

  function nextQuestion() {
    setState((prev) => {
      if (prev.currentQuestionIndex + 1 >= prev.questions.length) {
        return { ...prev, status: 'result' };
      }
      return {
        ...prev,
        status: 'playing',
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswerCorrect: null,
      };
    });
  }

  function restart() {
    setState(createRound());
  }

  if (!currentQuestion && status !== 'result') {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <p style={S.helperText}>{t('game.notFound')}</p>
          <button type="button" style={S.secondaryButton} onClick={onBack}>{t('game.backHome')}</button>
        </div>
      </div>
    );
  }

  if (status === 'result') {
    const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
    const message = percentage >= 80 ? 'Rất giỏi! Bé phân biệt dấu rất tốt.' : percentage >= 50 ? 'Khá tốt rồi! Chơi lại thêm một lượt nhé.' : 'Mình luyện thêm để nhớ dấu tốt hơn nhé!';
    return (
      <div style={S.page}>
        <div style={S.resultCard}>
          <div style={S.scoreCircle}>{correctCount}/{TOTAL_QUESTIONS}</div>
          <h2 style={S.resultTitle}>Kết quả</h2>
          <p style={S.resultText}>{message}</p>
          <div style={S.resultStats}>
            <div style={S.statBox}><div style={S.statValue}>{score}</div><div style={S.statLabel}>Điểm</div></div>
            <div style={S.statBox}><div style={S.statValue}>{percentage}%</div><div style={S.statLabel}>Chính xác</div></div>
          </div>
          <div style={S.controls}>
            <button type="button" style={S.secondaryButton} onClick={onBack}>← Quay lại</button>
            <button type="button" style={S.primaryButton} onClick={restart}>Chơi lại</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.gameShell}>
        <div style={S.header}>
          <div style={S.headerTop}>
            <h2 style={S.title}>Điền Dấu Tiếng Việt</h2>
            <span style={S.progressText}>Câu {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}</span>
          </div>
          <div style={S.progressTrack}><div style={{ ...S.progressFill, width: `${progress}%` }} /></div>
        </div>

        <div style={S.card}>
          <div style={S.metaRow}>
            <span style={S.badge}>Lớp 1-2</span>
            <span style={{ ...S.badge, background: '#fff7e0', color: '#b06000' }}>Mức {currentQuestion.level}</span>
            <span style={{ ...S.badge, background: '#e6f4ea', color: '#137333' }}>Điểm {score}</span>
          </div>

          <div style={S.promptBox}>
            <div style={S.promptLabel}>Chọn từ có dấu đúng</div>
            <p style={S.promptWord}>{currentQuestion.plainWord}</p>
          </div>

          <p style={S.helperText}>Nhấn vào đáp án đúng. Mỗi câu chỉ chọn một lần.</p>

          <div style={S.answerList}>
            {currentQuestion.options.map((option) => {
              const isCorrect = status === 'feedback' && option === currentQuestion.correctAnswer;
              const isWrong = status === 'feedback' && option === selectedAnswer && option !== currentQuestion.correctAnswer;
              const isLocked = status === 'feedback' && !isCorrect && !isWrong;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(option)}
                  disabled={status !== 'playing'}
                  style={{
                    ...S.answerButton,
                    ...(isCorrect ? S.answerButtonCorrect : {}),
                    ...(isWrong ? S.answerButtonWrong : {}),
                    ...(isLocked ? S.answerButtonNeutralLocked : {}),
                    ...(status !== 'playing' ? S.answerButtonDisabled : {}),
                  }}
                  aria-label={`Đáp án ${option}`}
                >
                  <span>{option}</span>
                  {isCorrect && <span style={S.answerBadge}>Đúng</span>}
                  {isWrong && <span style={S.answerBadge}>Sai</span>}
                </button>
              );
            })}
          </div>

          {status === 'feedback' && (
            <div style={{ ...S.feedback, ...(isAnswerCorrect ? S.feedbackCorrect : S.feedbackWrong) }}>
              <div style={S.feedbackTitle}>{isAnswerCorrect ? 'Chính xác!' : 'Thử lại ở câu sau nhé!'}</div>
              <div>{feedbackText}</div>
            </div>
          )}
        </div>

        <div style={S.controls}>
          <button type="button" style={S.secondaryButton} onClick={onBack}>← Quay lại</button>
          {status === 'feedback' && (
            <button type="button" style={S.primaryButton} onClick={nextQuestion}>
              {currentQuestionIndex + 1 < TOTAL_QUESTIONS ? 'Câu tiếp theo' : 'Xem kết quả'}
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
  gameShell: { width: '100%', maxWidth: 480 },
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 10px rgba(0,0,0,.07)',
    padding: 16,
    border: '1px solid #dadce0',
  },
  header: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 },
  headerTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { fontSize: 22, fontWeight: 700, lineHeight: 1.3, margin: 0 },
  progressText: { fontSize: 14, fontWeight: 700, color: '#1a73e8', whiteSpace: 'nowrap' },
  progressTrack: { width: '100%', height: 10, background: '#e9ecef', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#1a73e8', borderRadius: 999, transition: 'width 0.25s ease' },
  metaRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
  badge: { background: '#e8f0fe', color: '#1a73e8', borderRadius: 999, padding: '6px 10px', fontSize: 12, fontWeight: 700 },
  promptBox: { background: '#e8f0fe', borderRadius: 14, padding: '18px 14px', textAlign: 'center', border: '1px solid #d2e3fc' },
  promptLabel: { fontSize: 13, color: '#5f6368', marginBottom: 8, fontWeight: 700 },
  promptWord: { fontSize: 34, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0.5, margin: 0, color: '#202124' },
  helperText: { fontSize: 14, color: '#5f6368', textAlign: 'center', margin: '14px 0' },
  answerList: { display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginTop: 4 },
  answerButton: { width: '100%', minHeight: 56, padding: '14px 16px', borderRadius: 10, border: '1.5px solid #dadce0', background: '#fff', color: '#202124', fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.18s ease', outline: 'none' },
  answerButtonDisabled: { cursor: 'not-allowed', opacity: 0.95 },
  answerButtonCorrect: { background: '#e6f4ea', border: '2px solid #34a853', color: '#137333' },
  answerButtonWrong: { background: '#fce8e6', border: '2px solid #ea4335', color: '#c5221f' },
  answerButtonNeutralLocked: { background: '#f1f3f4', border: '1.5px solid #dadce0', color: '#5f6368' },
  answerBadge: { fontSize: 13, fontWeight: 700, minWidth: 42 },
  feedback: { marginTop: 12, borderRadius: 12, padding: '12px 14px', border: '1px solid #dadce0', fontSize: 15, lineHeight: 1.45, transition: 'all 0.2s ease' },
  feedbackCorrect: { background: '#e6f4ea', border: '1px solid #34a853', color: '#137333' },
  feedbackWrong: { background: '#fce8e6', border: '1px solid #ea4335', color: '#a50e0e' },
  feedbackTitle: { fontWeight: 700, marginBottom: 4 },
  controls: { marginTop: 16, display: 'flex', gap: 10 },
  primaryButton: { flex: 1, minHeight: 52, border: 'none', borderRadius: 10, background: '#1a73e8', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s ease', boxShadow: '0 2px 8px rgba(26,115,232,.2)' },
  secondaryButton: { flex: 1, minHeight: 52, borderRadius: 10, border: '1.5px solid #dadce0', background: '#fff', color: '#202124', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s ease' },
  resultCard: { background: '#fff', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,.07)', padding: 20, border: '1px solid #dadce0', textAlign: 'center', width: '100%', maxWidth: 480 },
  scoreCircle: { width: 96, height: 96, margin: '0 auto 14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8f0fe', border: '4px solid #1a73e8', color: '#1a73e8', fontSize: 28, fontWeight: 700 },
  resultTitle: { fontSize: 24, fontWeight: 700, margin: '0 0 8px' },
  resultText: { fontSize: 15, color: '#5f6368', margin: '0 0 16px', lineHeight: 1.5 },
  resultStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 },
  statBox: { background: '#f8f9fa', borderRadius: 12, padding: '12px 10px', border: '1px solid #dadce0' },
  statValue: { fontSize: 20, fontWeight: 700, color: '#202124', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#5f6368' },
};
