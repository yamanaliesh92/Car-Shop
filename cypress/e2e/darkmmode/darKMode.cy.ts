describe("darkMode", () => {
  it.only("change to dark mode", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="darkMode"]').should("be.hidden");

    cy.get('[data-cy="darkModeButton"]').click();

    cy.get('[data-cy="darkMode"]').should("not.be.hidden");
  });
});

export {};
