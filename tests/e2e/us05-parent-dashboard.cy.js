/**
 * E2E Test - US05: Phụ huynh theo dõi tiến độ
 */
describe('US05 - Phụ huynh theo dõi tiến độ', () => {
  const mockOverview = {
    weeklyOnlineMinutes: 145,
    gamesPlayedThisWeek: 12,
    averageScore: 78.5,
    totalAssignments: 5,
    completedAssignments: 3,
  };

  const mockWeekly = [
    {
      subject: 'math',
      subjectLabel: 'Toán',
      sessionsCount: 8,
      totalMinutes: 90,
      averageScore: 82.0,
      trend: 'up',
    },
    {
      subject: 'vietnamese',
      subjectLabel: 'Tiếng Việt',
      sessionsCount: 4,
      totalMinutes: 55,
      averageScore: 71.0,
      trend: 'stable',
    },
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/progress/overview', { body: mockOverview }).as('getOverview');
    cy.intercept('GET', '/api/progress/weekly', { body: mockWeekly }).as('getWeekly');

    // Login as parent
    cy.visit('/parent');
    cy.wait(['@getOverview', '@getWeekly']);
  });

  it('TC-US05-01: Hiển thị dashboard tổng quan với 4 thẻ', () => {
    cy.get('[data-testid="parent-dashboard"]').should('be.visible');

    // 4 thẻ tổng quan
    cy.get('[data-testid="card-online-time"]').should('be.visible')
      .and('contain', '2h');   // 145 min = 2h 25m
    cy.get('[data-testid="card-games-played"]').should('be.visible')
      .and('contain', '12');
    cy.get('[data-testid="card-avg-score"]').should('be.visible')
      .and('contain', '78.5');
    cy.get('[data-testid="card-assignments"]').should('be.visible')
      .and('contain', '3 / 5');
  });

  it('TC-US05-02: Tiến độ môn học hàng tuần', () => {
    cy.get('[data-testid="weekly-table"]').should('be.visible');
    cy.get('[data-testid="progress-row-math"]').should('be.visible');
    cy.get('[data-testid="progress-row-vietnamese"]').should('be.visible');
  });

  it('TC-US05-03: Xu hướng tốt hơn hiển thị mũi tên lên', () => {
    cy.get('[data-testid="progress-row-math"]')
      .find('.trend-up')
      .should('contain', '↑ Tốt hơn');
  });

  it('TC-US05-04: Xu hướng ổn định hiển thị đúng', () => {
    cy.get('[data-testid="progress-row-vietnamese"]')
      .find('.trend-stable')
      .should('contain', '→ Ổn định');
  });

  it('TC-US05-05: Responsive - Mobile view', () => {
    cy.viewport(375, 812); // iPhone SE
    cy.get('[data-testid="parent-dashboard"]').should('be.visible');
    cy.get('[data-testid="overview-section"]').should('be.visible');
    // Cards không overflow
    cy.get('[data-testid="card-online-time"]').should('not.have.css', 'overflow', 'hidden');
  });
});
