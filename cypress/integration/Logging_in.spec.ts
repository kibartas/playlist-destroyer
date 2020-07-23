const username = 'JohnLukeThe3rd';

describe('Logging in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Logs in the user', () => {
    cy.get('[data-testid="usernameText"]').type(username);

    cy.get('[data-testid="passwordText"]').type('Password123');

    cy.get('[data-testid="loginButton"]').click();

    cy.location('pathname').should('eq', `/user/${username}`);
  });

  it('Doesn\'t login the user', () => {
    cy.get('[data-testid="loginButton"]').click();

    cy.location('pathname').should('eq', '/');
  })
});
