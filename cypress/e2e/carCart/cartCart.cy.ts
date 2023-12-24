const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4NzEwMjc0ZDhiOWUyZDhhY2E3ODYiLCJpYXQiOjE3MDEzNDM0OTB9.AkTWA_mGL3Q4fzDcFW9qXhpf5flJFOeCQaqWS9arSiw";

describe("card", () => {
  it("cart", () => {
    cy.visit("http://localhost:3000");
    cy.scrollTo("center");
    cy.setCookie("token", token);

    cy.get('[data-cy="name1"]')
      .should("have.text", "bmw")
      .get('[data-cy="price1"]')
      .should("have.text", 123)
      .get('[data-cy="type1"]')
      .should("have.text", "gas")
      .get('[data-cy="cylinders1"]')
      .should("have.text", 14)
      .get('[data-cy="transmission1"]')
      .should("have.text", "automatic");

    cy.get('[data-cy="task6568714874d8b9e2d8aca78b"]').should("be.hidden");
  });
});

export {};
