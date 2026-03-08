/**
 * E2E Test - US02: Chơi game khi mạng yếu/mất mạng (Core Feature)
 * Tool: Cypress với Chrome DevTools Protocol (CDP) để simulate offline
 */
describe('US02 - Offline/Online Sync (CORE)', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/games', { fixture: 'games.json' }).as('getGames');
    cy.intercept('POST', '/api/sessions/sync').as('syncSessions');
    cy.visit('/');
    cy.wait('@getGames');
  });

  it('TC-US02-01: Game tiếp tục khi rớt mạng đột ngột', () => {
    // Vào game
    cy.get('[data-testid^="game-card-"]').first().click();
    cy.get('canvas').should('be.visible');

    // Simulate offline
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false);
      win.dispatchEvent(new Event('offline'));
    });

    // Banner offline xuất hiện
    cy.get('[data-testid="offline-banner"]').should('be.visible')
      .and('contain', 'đang offline');

    // Game canvas vẫn còn
    cy.get('canvas').should('be.visible');
    // Không có error modal/crash indicator
    cy.get('[data-testid="error"]').should('not.exist');
  });

  it('TC-US02-02: Tiến trình được lưu local khi offline', () => {
    // Simulate offline và verify IndexedDB save
    cy.window().then((win) => {
      win.dispatchEvent(new Event('offline'));
    });

    cy.get('[data-testid^="game-card-"]').first().click();

    // Sau khi game kết thúc (mocked), kiểm tra IndexedDB
    // Trigger game end manually in test
    cy.window().then(async (win) => {
      const { savePendingSession } = await import('/src/services/offlineSync.js');
      await savePendingSession({
        sessionId: 'test-offline-session',
        gameId: 'o-an-quan-math',
        score: 70,
        correctAnswers: 7,
        wrongAnswers: 3,
        durationSeconds: 95,
      });

      // Verify IndexedDB
      const { getPendingSessions } = await import('/src/services/offlineSync.js');
      const pending = await getPendingSessions();
      expect(pending.some((s) => s.sessionId === 'test-offline-session')).to.be.true;
      expect(pending.find((s) => s.sessionId === 'test-offline-session').syncStatus).to.equal('local');
    });
  });

  it('TC-US02-03: Tự động sync khi có mạng lại - KHÔNG gián đoạn UX', () => {
    // Setup: offline, play game, save local session
    cy.window().then((win) => {
      win.dispatchEvent(new Event('offline'));
    });

    // Banner offline
    cy.get('[data-testid="offline-banner"]').should('be.visible');

    // Bật mạng lại
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(true);
      win.dispatchEvent(new Event('online'));
    });

    // Sync banner xuất hiện ngắn
    cy.get('[data-testid="sync-banner"]').should('be.visible');

    // Offline banner biến mất
    cy.get('[data-testid="offline-banner"]').should('not.exist');

    // CRITICAL: Không bị navigate/reload
    cy.url().should('not.include', '/login');

    // Sync API được gọi
    cy.wait('@syncSessions').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Sync banner tự ẩn sau khi xong
    cy.get('[data-testid="sync-banner"]', { timeout: 5000 }).should('not.exist');
  });

  it('TC-US02-04: Load game khi offline từ cache', () => {
    // First visit online để cache
    cy.get('[data-testid^="game-card-"]').first().click();
    cy.get('canvas').should('be.visible');
    cy.go('back');

    // Offline
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false);
      win.dispatchEvent(new Event('offline'));
    });

    // Game vẫn load từ cache
    cy.get('[data-testid^="game-card-"]').first().click();
    cy.get('canvas').should('be.visible');
  });
});
