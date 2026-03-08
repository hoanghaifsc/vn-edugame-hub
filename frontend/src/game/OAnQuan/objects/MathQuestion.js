/**
 * MathQuestion.js - Hệ thống câu hỏi Toán tích hợp vào Ô Ăn Quan
 */

const QUESTION_BANKS = {
  easy: [
    { question: '3 + 5 = ?', answer: 8, choices: [6, 7, 8, 9] },
    { question: '10 - 4 = ?', answer: 6, choices: [5, 6, 7, 8] },
    { question: '2 × 3 = ?', answer: 6, choices: [5, 6, 7, 8] },
    { question: '8 ÷ 2 = ?', answer: 4, choices: [3, 4, 5, 6] },
    { question: '6 + 7 = ?', answer: 13, choices: [11, 12, 13, 14] },
    { question: '15 - 8 = ?', answer: 7, choices: [6, 7, 8, 9] },
    { question: '4 × 4 = ?', answer: 16, choices: [14, 15, 16, 17] },
    { question: '12 ÷ 3 = ?', answer: 4, choices: [3, 4, 5, 6] },
  ],
  medium: [
    { question: '25 + 37 = ?', answer: 62, choices: [60, 61, 62, 63] },
    { question: '100 - 43 = ?', answer: 57, choices: [55, 56, 57, 58] },
    { question: '7 × 8 = ?', answer: 56, choices: [54, 55, 56, 57] },
    { question: '48 ÷ 6 = ?', answer: 8, choices: [7, 8, 9, 10] },
  ],
  hard: [
    { question: '123 + 456 = ?', answer: 579, choices: [577, 578, 579, 580] },
    { question: '500 - 237 = ?', answer: 263, choices: [261, 262, 263, 264] },
    { question: '13 × 12 = ?', answer: 156, choices: [154, 155, 156, 157] },
    { question: '144 ÷ 12 = ?', answer: 12, choices: [11, 12, 13, 14] },
  ],
};

export default class MathQuestion {
  constructor(scene, options) {
    this.scene = scene;
    this.difficulty = options.difficulty || 'easy';
    this.onCorrect = options.onCorrect;
    this.onWrong = options.onWrong;
    this.currentQuestion = null;
    this.currentCellIndex = null;
    this.questionUI = null;
  }

  getRandomQuestion() {
    const bank = QUESTION_BANKS[this.difficulty] || QUESTION_BANKS.easy;
    return bank[Math.floor(Math.random() * bank.length)];
  }

  showQuestion(cellIndex) {
    this.currentCellIndex = cellIndex;
    this.currentQuestion = this.getRandomQuestion();
    this.renderUI();
  }

  showNext() {
    this.currentQuestion = this.getRandomQuestion();
    this.renderUI();
  }

  renderUI() {
    if (this.questionUI) {
      this.questionUI.destroy();
    }

    const { width, height } = this.scene.scale;
    const q = this.currentQuestion;

    // Container câu hỏi
    this.questionUI = this.scene.add.container(width / 2, height - 150);

    // Background
    const bg = this.scene.add.rectangle(0, 0, 400, 120, 0x1a73e8, 0.9);
    bg.setStrokeStyle(2, 0xffffff);

    // Text câu hỏi
    const questionText = this.scene.add.text(0, -30, q.question, {
      fontSize: '28px',
      fill: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Đáp án
    const choiceTexts = q.choices.map((choice, i) => {
      const xOffset = (i - 1.5) * 90;
      const choiceBtn = this.scene.add.text(xOffset, 20, String(choice), {
        fontSize: '22px',
        fill: '#fff',
        backgroundColor: '#0d47a1',
        padding: { x: 10, y: 5 },
        fontFamily: 'Arial',
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      choiceBtn.on('pointerover', () => choiceBtn.setStyle({ fill: '#ffeb3b' }));
      choiceBtn.on('pointerout', () => choiceBtn.setStyle({ fill: '#fff' }));
      choiceBtn.on('pointerdown', () => this.checkAnswer(choice));

      return choiceBtn;
    });

    this.questionUI.add([bg, questionText, ...choiceTexts]);
  }

  checkAnswer(selectedChoice) {
    if (!this.currentQuestion) return;

    const isCorrect = selectedChoice === this.currentQuestion.answer;
    if (isCorrect) {
      this.onCorrect(this.currentCellIndex);
    } else {
      this.onWrong(this.currentCellIndex);
    }
  }

  destroy() {
    if (this.questionUI) {
      this.questionUI.destroy();
    }
  }
}
