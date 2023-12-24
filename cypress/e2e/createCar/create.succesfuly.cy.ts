const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTcwMzE1MjgyNiwiZXhwIjoxNzAzNzU3NjI2fQ.xk2M24EYzNG9_iWbGH3BaM1JMNnA-3CV_PbiBWLheyk";
describe("create car", () => {
  it("create car is done", () => {
    cy.visit("http://localhost:3000/");

    cy.setCookie("MyToken", token);
    cy.get('[data-cy="createButton"]').should("have.text", "create");

    cy.get('[data-cy="createForm"]').should("be.hidden");

    cy.get('[data-cy="createButton"]').click();
    cy.get('[data-cy="createForm"]').should("be.visible");

    cy.get('[data-cy="title"]').should("have.text", "Create car");
    cy.get('[data-cy="nameInput"]').type("bmw").should("have.value", "bmw");
    cy.get('[data-cy="carColorInput"]').type("red").should("have.value", "red");
    cy.get('[data-cy="yearInput"]')
      .clear()
      .type("2010")
      .should("have.value", "2010");

    cy.get('[data-cy="categoryButton"]').click();

    cy.get('[data-cy="geepCy"]').click().should("have.text", "geep");

    cy.get('[data-cy="typeInput"]')

      .type("type")
      .should("have.value", "type");

    cy.get('[data-cy="cylindersInput"]')
      .clear()
      .type("1234")
      .should("have.value", "1234");

    cy.get('[data-cy="moveButton"]').should("have.text", "next");
    cy.get('[data-cy="moveButton"]').click();

    cy.get('[data-cy="priceInput"]')
      .clear()
      .type("2002")
      .should("have.value", "2002");

    cy.get('[data-cy="sellInput"]').type("rent").should("have.value", "rent");
    cy.get('[data-cy="userIdInput"]')
      .clear()
      .type("1")
      .should("have.value", "1");

    cy.get('[data-cy="transmissionInput"]')
      .type("auto")
      .should("have.value", "auto");

    cy.get('[data-cy="makeInput"]').type("make").should("have.value", "make");

    cy.get('[data-cy="img"]').click();
    cy.get('[data-cy="pictures"]').should("have.text", "add car pictures");

    cy.get('[data-cy="perviousButton"]').should("have.text", "Pervious");

    cy.get('[data-cy="createCategoryButton"]').should("have.text", "create");
    cy.get('[data-cy="createCategoryButton"]').click();
  });
});

export {};
