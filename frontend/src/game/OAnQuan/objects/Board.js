/**
 * Board.js - Bàn cờ Ô Ăn Quan
 * 12 ô: 2 ô quan (index 0, 6) + 10 ô dân (index 1-5, 7-11)
 */
export default class Board {
  constructor(scene, options) {
    this.scene = scene;
    this.cells = [];
    this.stoneCounts = new Array(12).fill(options.stonesPerCell);
    // Ô quan có nhiều quân hơn
    this.stoneCounts[0] = 10;
    this.stoneCounts[6] = 10;

    this.playerScore = 0;
    this.aiScore = 0;
    this.currentPlayer = 0; // 0: học sinh, 1: AI

    this._buildVisual(options);
  }

  _buildVisual({ x, y }) {
    const cellW = 80;
    const cellH = 80;
    const cols = 6;

    // Hàng trên (index 0-5): ô quan trái (0) + 4 ô dân (1-4) + padding
    // Hàng dưới (index 6-11): ô quan phải (6) + 4 ô dân (7-10) + padding
    for (let i = 0; i < 12; i++) {
      const row = i < 6 ? 0 : 1;
      const col = i < 6 ? i : 11 - i;
      const cellX = x - (cols / 2) * cellW + col * cellW + cellW / 2;
      const cellY = y - cellH / 2 + row * cellH;

      const isQuan = i === 0 || i === 6;
      const cell = this.scene.add.rectangle(
        cellX, cellY,
        isQuan ? cellW * 1.5 : cellW - 4,
        cellH - 4,
        isQuan ? 0xe65100 : 0x8d6e63
      ).setStrokeStyle(2, 0x4e342e).setInteractive({ useHandCursor: true });

      // Hiển thị số quân
      const label = this.scene.add.text(cellX, cellY, String(this.stoneCounts[i]), {
        fontSize: '20px',
        fill: '#fff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
      }).setOrigin(0.5);

      // Chỉ cho phép click ô dân của người chơi (hàng dưới = index 7-11)
      if (!isQuan && row === 1) {
        cell.on('pointerdown', () => this.scene.events.emit('cellSelected', i));
        cell.on('pointerover', () => cell.setFillStyle(0xa1887f));
        cell.on('pointerout', () => cell.setFillStyle(0x8d6e63));
      }

      this.cells.push({ rect: cell, label, index: i, row, col });
    }
  }

  moveStones(startIndex) {
    let count = this.stoneCounts[startIndex];
    if (count === 0) return;

    this.stoneCounts[startIndex] = 0;
    let idx = startIndex;

    // Rải quân theo chiều kim đồng hồ
    while (count > 0) {
      idx = (idx + 1) % 12;
      this.stoneCounts[idx]++;
      count--;
    }

    // Ăn quân nếu ô tiếp theo trống
    this._capture(idx);
    this._refreshDisplay();
  }

  _capture(lastIdx) {
    let next = (lastIdx + 1) % 12;
    while (this.stoneCounts[next] > 0) {
      const skip = (next + 1) % 12;
      if (this.stoneCounts[skip] === 0) break;
      // Ăn quân
      if (this.currentPlayer === 0) {
        this.playerScore += this.stoneCounts[next];
      } else {
        this.aiScore += this.stoneCounts[next];
      }
      this.stoneCounts[next] = 0;
      next = (skip + 1) % 12;
    }
  }

  _refreshDisplay() {
    this.cells.forEach(({ label, index }) => {
      label.setText(String(this.stoneCounts[index]));
    });
  }

  isGameOver() {
    // Game over khi tất cả ô dân trống
    const danIndices = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
    return danIndices.every((i) => this.stoneCounts[i] === 0);
  }

  getScores() {
    return { playerScore: this.playerScore, aiScore: this.aiScore };
  }
}
