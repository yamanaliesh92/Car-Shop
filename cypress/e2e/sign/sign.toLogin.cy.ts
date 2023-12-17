describe("to login", () => {
  it.only("have account and navigate to login page", () => {
    cy.visit("http://localhost:3000/sign");
    cy.get('[data-cy="toLogin"]').should("have.text", "Do have account?");

    cy.get('[data-cy="toLogin"]')
      .click()
      .wait(200)
      .then(() => {
        cy.url().should("include", "/login");
      });
  });
});

export {};
