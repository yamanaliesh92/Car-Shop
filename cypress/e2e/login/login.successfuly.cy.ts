describe("login is done correctly", () => {
  it("done", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-cy="title"]').should("have.text", "Login");
    // cy.get('[data-cy="emailInput"]')
    //   .type("yaman@gamil.com")
    //   .should("have.value", "yaman@gamil.com");

    // cy.get('[data-cy="passwordInput"]')
    //   .type("password")
    //   .should("have.value", "password");
    // cy.get('[data-cy="submit"]').should("have.value", "sign");
    // cy.get('[data-cy="or"]').should("have.value", "OR");
    // cy.get('[data-cy="create-account"]').should(
    //   "have.value",
    //   "Create a new account"
    // );
  });
});

export {};
