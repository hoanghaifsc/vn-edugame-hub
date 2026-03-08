/**
 * E2E Test - US01: Học sinh chọn và chơi game
 * Tool: Cypress
 */
describe('US01 - Học sinh chọn và chơi game', () => {
  beforeEach(() => {
    // Login stub
    cy.intercept('GET', '/api/games', {
      statusCode: 200,
      body: [
        {
          gameId: 'o-an-quan-math',
          title: 'Ô Ăn Quan - Toán Cơ Bản',
          subject: 'math',
          thumbnailUrl: '/assets/thumbnails/o-an-quan.png',
          description: 'Học Toán qua game Ô Ăn Quan truyền thống',
          isActive: true,
        },
        {
          gameId: 'word-quiz-vi',
          title: 'Đố chữ Tiếng Việt',
          subject: 'vietnamese',
          thumbnailUrl: '/assets/thumbnails/word-quiz.png',
          description: 'Ôn tập từ vựng Tiếng Việt',
          isActive: true,
        },
      ],
    }).as('getGames');

    cy.visit('/');
  });

  it('TC-US01-01: Hiển thị danh sách game khi online', () => {
    cy.wait('@getGames');
    cy.get('[data-testid="game-grid"]').should('be.visible');
    cy.get('[data-testid^="game-card-"]').should('have.length', 2);
    // Kiểm tra load < 3s (Lighthouse sẽ test riêng)
    cy.get('[data-testid="loading"]').should('not.exist');
  });

  it('TC-US01-02: Lọc game theo môn Toán', () => {
    cy.wait('@getGames');
    cy.get('[data-testid="filter-math"]').click();
    cy.get('[data-testid^="game-card-"]').should('have.length', 1);
    cy.get('[data-testid="game-card-o-an-quan-math"]').should('be.visible');
    cy.get('[data-testid="game-card-word-quiz-vi"]').should('not.exist');
  });

  it('TC-US01-03: Lọc Tất cả hiển thị mọi game', () => {
    cy.wait('@getGames');
    cy.get('[data-testid="filter-math"]').click();
    cy.get('[data-testid="filter-all"]').click();
    cy.get('[data-testid^="game-card-"]').should('have.length', 2);
  });

  it('TC-US01-04: Click game và load đúng nội dung', () => {
    cy.wait('@getGames');
    cy.get('[data-testid="game-card-o-an-quan-math"]').click();
    cy.url().should('include', '/game/o-an-quan-math');
    // Canvas Phaser load
    cy.get('canvas').should('exist');
  });

  it('TC-US01-05: Không có game nào khớp filter', () => {
    cy.wait('@getGames');
    cy.get('[data-testid="filter-science"]').click();
    cy.get('[data-testid="no-games"]').should('be.visible').and('contain', 'Không có game nào');
  });
});
