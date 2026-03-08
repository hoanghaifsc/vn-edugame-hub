/**
 * GameScene.js - Scene chính của game Ô Ăn Quan
 * Tích hợp câu hỏi Toán cơ bản vào mechanics của Ô Ăn Quan
 */
import Phaser from 'phaser';
import Board from '../objects/Board';
import MathQuestion from '../objects/MathQuestion';

const BOARD_CELLS = 12; // 10 ô dân + 2 ô quan
const STONES_PER_CELL = 5;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.board = null;
    this.mathQuestion = null;
    this.score = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.sessionStartTime = null;
  }

  init(data) {
    this.assignmentId = data.assignmentId || null;
    this.gameId = data.gameId || 'o-an-quan-math';
    this.difficulty = data.difficulty || 'easy';
  }

  preload() {
    // Assets được cache bởi Service Worker (CacheFirst strategy)
    this.load.image('board-bg', '/assets/game/o-an-quan/board-bg.png');
    this.load.image('stone', '/assets/game/o-an-quan/stone.png');
    this.load.image('stone-quan', '/assets/game/o-an-quan/stone-quan.png');
    this.load.audio('correct', '/assets/game/sounds/correct.mp3');
    this.load.audio('wrong', '/assets/game/sounds/wrong.mp3');
    this.load.audio('pickup', '/assets/game/sounds/pickup.mp3');
  }

  create() {
    this.sessionStartTime = Date.now();

    // Khởi tạo bàn chơi
    this.board = new Board(this, {
      x: this.scale.width / 2,
      y: this.scale.height / 2,
      cellCount: BOARD_CELLS,
      stonesPerCell: STONES_PER_CELL,
    });

    // Khởi tạo hệ thống câu hỏi Toán
    this.mathQuestion = new MathQuestion(this, {
      difficulty: this.difficulty,
      onCorrect: this.handleCorrectAnswer.bind(this),
      onWrong: this.handleWrongAnswer.bind(this),
    });

    // UI score
    this.scoreText = this.add.text(16, 16, 'Điểm: 0', {
      fontSize: '24px',
      fill: '#fff',
      fontFamily: 'Arial',
    });

    // Lắng nghe sự kiện từ Board
    this.events.on('cellSelected', this.onCellSelected, this);

    // Hiển thị câu hỏi đầu tiên
    this.mathQuestion.showNext();
  }

  onCellSelected(cellIndex) {
    // Học sinh chọn ô → phải trả lời câu hỏi Toán để được phép đi quân
    this.mathQuestion.showQuestion(cellIndex);
  }

  handleCorrectAnswer(cellIndex) {
    this.correctAnswers++;
    this.score += 10;
    this.scoreText.setText(`Điểm: ${this.score}`);
    this.sound.play('correct');

    // Thực hiện nước đi hợp lệ
    this.board.moveStones(cellIndex);

    // Kiểm tra game over
    if (this.board.isGameOver()) {
      this.endGame();
    }
  }

  handleWrongAnswer(cellIndex) {
    this.wrongAnswers++;
    this.sound.play('wrong');
    // Không được phép đi quân, vẫn tiếp tục game
    this.mathQuestion.showNext();
  }

  endGame() {
    const durationSeconds = Math.floor((Date.now() - this.sessionStartTime) / 1000);
    const sessionData = {
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      gameId: this.gameId,
      assignmentId: this.assignmentId,
      score: this.score,
      totalQuestions: this.correctAnswers + this.wrongAnswers,
      correctAnswers: this.correctAnswers,
      wrongAnswers: this.wrongAnswers,
      durationSeconds,
    };

    // Emit event để React component xử lý lưu data (online/offline)
    this.game.events.emit('gameEnd', sessionData);
    this.scene.start('GameOverScene', { sessionData });
  }

  update() {
    // Game loop updates (animation, physics nếu cần)
  }
}
