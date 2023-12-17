describe("kk", () => {
  it("create user is correctly", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="dashboardButton"]').should("have.text", "dashboard");

    cy.get('[data-cy="emailInput"]').click();

    cy.url().should("include", "/dashboard");

    cy.get('[data-cy="usernameTitle"]').should("have.text", "username:");

    cy.get('[data-cy="usernameData"]').should("have.text", "ali");

    cy.get('[data-cy="numberTitle"]').should("have.text", "the number:");

    cy.get('[data-cy="numberData"]').should("have.text", 1244);

    cy.get('[data-cy="passwordTitle"]').should("have.text", "the password");

    cy.get('[data-cy="passwordData"]').should("have.text", "pass123");

    cy.get('[data-cy="updateButtonCancel"]').should("not.be.visible");

    cy.get('[data-cy="updateButtonDone"]').should("not.be.visible");

    cy.get('[data-cy="updateButton"]').should("have.text", "update");

    cy.get('[data-cy="updateButton"]').click();

    cy.get('[data-cy="updateButton"]').should("not.be.visible");

    cy.get('[data-cy="updateButtonCancel"]').should("have.text", "cancel");

    cy.get('[data-cy="updateButtonDone"]').should("have.text", "update");

    cy.get('[data-cy="passwordInput"]')
      .type("password")
      .should("have.value", "password");

    cy.get('[data-cy="usernameInput"]')
      .type("username")
      .should("have.value", "username");

    cy.get('[data-cy="numberInput"]')
      .clear()
      .type("123")
      .should("have.value", "123");

    cy.get('[data-cy="updateButtonDone"]').click();
  });
});

export {};
