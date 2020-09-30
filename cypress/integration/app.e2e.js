describe('Aurelia navigation app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page and display the initial page title', () => {
    cy.title().should('equal', 'Home | ITS CodeHub');
  });

  it('should display greeting', () => {
    cy.get('#search-bar_main-title').contains('Explore ITS CodeHub');
  });
});
