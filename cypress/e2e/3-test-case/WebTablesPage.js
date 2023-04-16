describe("Web Tables page (create, edit, delete)", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
  });

  //  It will cause cypress to ignore all uncaught JS exception
  Cypress.on("uncaught:exception", (_err, runnable) => {
    return false;
  });

  const pattern = "QWERTYUIOPASDFGHJKLZXqwertyuiopasdfghjklzxcvbnm1234567890";
  const pattern1 = "1234567890";
  let randomText = "";
  let randomNumbers = "";

  for (let i = 0; i < 6; i += 1) {
    randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
  }

  for (let i = 0; i < 2; i += 1) {
    randomNumbers += pattern1.charAt(Math.floor(Math.random() * pattern1.length));
  }

  const testText = randomText;
  const testAge = randomNumbers;

  it("Should check maim elements on the page", () => {
    // open Web Tables page
    cy.contains("Elements").click();
    cy.contains("Web Tables").click();

    // create new record
    cy.contains("Add").should("be.visible").click();
    cy.get(".modal-content").should("exist");
    cy.get(".modal-header").contains("Registration Form");
    cy.get("#firstName").should("be.visible").type(testText);
    cy.get("#lastName").should("be.visible").type(testText);
    cy.get("#userEmail").should("be.visible").type("demo@demo.demo");
    cy.get("#age").should("be.visible").type(testAge).as("age");
    cy.get("#salary")
      .should("be.visible")
      .type(testAge + testAge);
    cy.get("#department").should("be.visible").type(testText);
    cy.contains("Submit").should("be.visible").click();

    // check that record was created
    cy.get("#searchBox").type(testText);
    cy.get(".rt-tbody")
      .children()
      .eq(0)
      .within((el) => {
        cy.wrap(el).find(".rt-td").eq(0).contains(testText).should("be.visible");
        cy.wrap(el).find(".rt-td").eq(1).contains(testText).should("be.visible");
        cy.wrap(el).find(".rt-td").eq(2).contains(testAge).should("exist");
        cy.wrap(el).find(".rt-td").eq(3).contains("demo@demo.demo").should("exist");
        cy.wrap(el)
          .find(".rt-td")
          .eq(4)
          .contains(testAge + testAge)
          .should("exist");
      });

    // edit record
    cy.get(".rt-table").scrollTo("right");
    cy.get(".mr-2").children().click();
    cy.get(".modal-content").should("exist");
    cy.get("#firstName").should("be.visible").clear().type("Test");
    cy.contains("Submit").should("be.visible").click();

    // check that record was changed

    cy.get("#searchBox").clear().type("Test");
    cy.get(".rt-table").scrollTo("left");
    cy.get(".rt-tbody")
      .children()
      .eq(0)
      .within((el) => {
        cy.wrap(el).find(".rt-td").eq(0).contains("Test").should("be.visible");
        cy.wrap(el).find(".rt-td").eq(1).contains(testText).should("be.visible");
        cy.wrap(el).find(".rt-td").eq(2).contains(testAge).should("exist");
        cy.wrap(el).find(".rt-td").eq(3).contains("demo@demo.demo").should("exist");
        cy.wrap(el)
          .find(".rt-td")
          .eq(4)
          .contains(testAge + testAge)
          .should("exist");
      });

    // delete record
    cy.get(".rt-table").scrollTo("right");
    // or cam use: cy.get('#delete-record-4').click();
    cy.get('span[data-toggle="tooltip"][title="Delete"]').click();

    // check thar record was deleted

    cy.get("#searchBox").clear().type("Test");
    cy.get(".rt-noData").contains("No rows found");
  });
});
