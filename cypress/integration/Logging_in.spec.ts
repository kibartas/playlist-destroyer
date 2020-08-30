const username = 'JohnLukeThe3rd';

describe('Logging in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Logs in the user', () => {
    cy.get('[data-cy="usernameText"]').type(username);

    cy.get('[data-cy="passwordText"]').type('Password123');

    cy.get('[data-cy="loginButton"]').click();

    cy.location('pathname').should('eq', `/${username}`);
  });

  it("Doesn't login the user if fields empty", () => {
    cy.get('[data-cy="loginButton"]').click();

    cy.location('pathname').should('eq', '/');
  });

  it('Provides an error message if user credentials are incorrect', () => {
    cy.get('[data-cy="usernameText"]').type(username);

    cy.get('[data-cy="passwordText"]').type('abc');

    cy.get('[data-cy="loginButton"]').click();

    cy.get('[data-cy="errorMessage"]').contains('Invalid credentials');
  });
});
