/**
 * Unit tests cho MathQuestion game object
 */

// Mock Phaser scene
const mockScene = {
  scale: { width: 800, height: 600 },
  add: {
    container: jest.fn(() => ({
      add: jest.fn(),
      destroy: jest.fn(),
    })),
    rectangle: jest.fn(() => ({
      setStrokeStyle: jest.fn().mockReturnThis(),
    })),
    text: jest.fn(() => ({
      setOrigin: jest.fn().mockReturnThis(),
      setInteractive: jest.fn().mockReturnThis(),
      setStyle: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis(),
    })),
  },
};

// Import với path relative (test chạy từ root)
const MathQuestion = require('../../frontend/src/game/OAnQuan/objects/MathQuestion').default
  || require('../../frontend/src/game/OAnQuan/objects/MathQuestion');

describe('MathQuestion - getRandomQuestion', () => {
  let mathQ;
  const mockOnCorrect = jest.fn();
  const mockOnWrong = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mathQ = new MathQuestion(mockScene, {
      difficulty: 'easy',
      onCorrect: mockOnCorrect,
      onWrong: mockOnWrong,
    });
  });

  test('trả về câu hỏi từ bank easy khi difficulty=easy', () => {
    const q = mathQ.getRandomQuestion();
    expect(q).toHaveProperty('question');
    expect(q).toHaveProperty('answer');
    expect(q).toHaveProperty('choices');
    expect(q.choices).toHaveLength(4);
    expect(q.choices).toContain(q.answer);
  });

  test('trả về câu hỏi từ bank medium khi difficulty=medium', () => {
    mathQ.difficulty = 'medium';
    const q = mathQ.getRandomQuestion();
    expect(q).toHaveProperty('answer');
    // Medium answers > easy answers typically
    expect(typeof q.answer).toBe('number');
  });

  test('fallback về easy khi difficulty không hợp lệ', () => {
    mathQ.difficulty = 'impossible';
    const q = mathQ.getRandomQuestion();
    expect(q).toHaveProperty('answer');
  });

  test('choices luôn chứa đáp án đúng', () => {
    for (let i = 0; i < 10; i++) {
      const q = mathQ.getRandomQuestion();
      expect(q.choices).toContain(q.answer);
    }
  });
});

describe('MathQuestion - checkAnswer', () => {
  let mathQ;
  const mockOnCorrect = jest.fn();
  const mockOnWrong = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mathQ = new MathQuestion(mockScene, {
      difficulty: 'easy',
      onCorrect: mockOnCorrect,
      onWrong: mockOnWrong,
    });
    // Set current question manually
    mathQ.currentQuestion = { question: '3 + 5 = ?', answer: 8, choices: [6, 7, 8, 9] };
    mathQ.currentCellIndex = 3;
  });

  test('gọi onCorrect khi chọn đúng đáp án', () => {
    mathQ.checkAnswer(8);
    expect(mockOnCorrect).toHaveBeenCalledWith(3);
    expect(mockOnWrong).not.toHaveBeenCalled();
  });

  test('gọi onWrong khi chọn sai đáp án', () => {
    mathQ.checkAnswer(7);
    expect(mockOnWrong).toHaveBeenCalledWith(3);
    expect(mockOnCorrect).not.toHaveBeenCalled();
  });

  test('không làm gì khi chưa có currentQuestion', () => {
    mathQ.currentQuestion = null;
    mathQ.checkAnswer(8);
    expect(mockOnCorrect).not.toHaveBeenCalled();
    expect(mockOnWrong).not.toHaveBeenCalled();
  });
});
