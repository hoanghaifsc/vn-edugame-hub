/**
 * E2E Test - US03: Giáo viên giao bài + US04: Xem báo cáo
 */
describe('US03 - Giáo viên giao bài tập', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/games', { fixture: 'games.json' }).as('getGames');
    cy.intercept('GET', '/api/assignments/class/*', { fixture: 'assignments.json' }).as('getAssignments');
    cy.intercept('POST', '/api/assignments', {
      statusCode: 201,
      body: { assignmentId: 'new-assign-001' },
    }).as('createAssignment');

    // Login as teacher
    cy.visit('/teacher');
    cy.wait('@getGames');
  });

  it('TC-US03-01: Tạo bài tập mới thành công', () => {
    cy.get('[data-testid="tab-assignments"]').click();

    cy.get('[data-testid="input-title"]').type('Bài tập Toán tuần 10');
    cy.get('[data-testid="select-game"]').select('Ô Ăn Quan - Toán Cơ Bản');
    cy.get('[data-testid="input-class"]').type('3A');
    cy.get('[data-testid="input-due"]').type('2026-03-15T23:59');

    cy.get('[data-testid="btn-assign"]').click();
    cy.wait('@createAssignment');

    cy.get('[data-testid="assign-message"]')
      .should('be.visible')
      .and('contain', 'Giao bài thành công');
  });

  it('TC-US03-02: Validation form - không submit khi thiếu field', () => {
    cy.get('[data-testid="btn-assign"]').click();
    // HTML5 validation ngăn submit
    cy.get('[data-testid="assign-message"]').should('not.exist');
    cy.get('@createAssignment.all').should('have.length', 0);
  });

  it('TC-US03-03: Trạng thái "Chưa làm" sau khi giao bài', () => {
    cy.intercept('GET', '/api/reports/assignment/*', {
      body: [
        { studentUid: 'std-001', studentName: 'Nguyễn An', status: 'pending', score: null },
        { studentUid: 'std-002', studentName: 'Trần Bình', status: 'pending', score: null },
      ],
    }).as('getReport');

    cy.get('[data-testid="tab-reports"]').click();
    cy.wait('@getReport');

    cy.get('[data-testid="status"]').each(($el) => {
      cy.wrap($el).should('contain', 'Chưa làm');
    });
  });
});

describe('US04 - Giáo viên xem báo cáo', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/reports/assignment/*', {
      body: [
        {
          studentUid: 'std-001',
          studentName: 'Nguyễn An',
          status: 'completed',
          score: 80,
          correctAnswers: 8,
          wrongAnswers: 2,
          durationSeconds: 120,
        },
        {
          studentUid: 'std-002',
          studentName: 'Trần Bình',
          status: 'pending',
          score: null,
          correctAnswers: null,
          wrongAnswers: null,
          durationSeconds: null,
        },
      ],
    }).as('getReport');

    cy.visit('/teacher');
  });

  it('TC-US04-01: Hiển thị bảng thống kê kết quả', () => {
    cy.get('[data-testid="tab-reports"]').click();
    cy.wait('@getReport');

    cy.get('[data-testid="report-table"]').should('be.visible');
    // Row học sinh đã hoàn thành
    cy.get('[data-testid="report-row-std-001"]').within(() => {
      cy.get('[data-testid="status"]').should('contain', 'Hoàn thành');
    });
  });

  it('TC-US04-02: Dữ liệu điểm và câu hỏi chính xác', () => {
    cy.get('[data-testid="tab-reports"]').click();
    cy.wait('@getReport');

    cy.get('[data-testid="report-row-std-001"]').within(() => {
      cy.contains('80').should('exist'); // score
      cy.contains('8').should('exist');  // correctAnswers
      cy.contains('2').should('exist');  // wrongAnswers
      cy.contains('120').should('exist'); // durationSeconds
    });
  });

  it('TC-US04-03: Học sinh chưa làm hiển thị "-"', () => {
    cy.get('[data-testid="tab-reports"]').click();
    cy.wait('@getReport');

    cy.get('[data-testid="report-row-std-002"]').within(() => {
      cy.get('[data-testid="status"]').should('contain', 'Chưa làm');
      cy.contains('-').should('exist');
    });
  });
});
