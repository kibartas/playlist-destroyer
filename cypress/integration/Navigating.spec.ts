describe('Navigating through web app', () => {
  it('going to an unrecognized path serves a NotFound page', () => {
    cy.visit('http://localhost:3000/anything_goes_here');
    cy.get('[data-testid="notFoundMessage"').contains('Page not found');
  });
});
