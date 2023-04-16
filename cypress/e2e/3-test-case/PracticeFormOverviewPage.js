import dayjs from "dayjs";
import "cypress-file-upload";
import { PracticeFormElement } from "../../Selectors/practiceformselectors";

//  It will cause cypress to ignore all uncaught JS exception
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Practice Form Overview Page", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
  });

  it("Should check maim elements on the page", () => {
    cy.contains("Form").click();
    cy.contains("Practice Form").click();

    // check left menu
    cy.get(".header-wrapper")
      .eq(0)
      .should("be.visible")
      .and("have.css", "background-color", "rgb(108, 117, 125)")
      .contains("Elements")
      .find("svg")
      .should("have.attr", "viewBox", "0 0 448 512");
    cy.get(".header-right").eq(0).children().eq(1).find("svg").should("have.attr", "viewBox", "0 0 24 24");
    cy.get(".header-wrapper").eq(1).should("be.visible").and("have.css", "background-color", "rgb(108, 117, 125)").contains("Forms");
    cy.get(".header-right").eq(1).children().eq(1).find("svg").should("have.attr", "viewBox", "0 0 24 24");
    cy.get("#item-0").should("exist").and("have.css", "background-color", "rgb(204, 204, 204)");
    cy.get(".element-list").contains("Practice Form").should("be.visible");
    cy.get(".header-wrapper")
      .eq(2)
      .should("be.visible")
      .and("have.css", "background-color", "rgb(108, 117, 125)")
      .contains("Alerts, Frame & Windows")
      .find("svg")
      .should("have.attr", "viewBox", "0 0 14 16");
    cy.get(".header-right").eq(2).children().eq(1).find("svg").should("have.attr", "viewBox", "0 0 24 24");
    cy.get(".header-wrapper")
      .eq(3)
      .should("be.visible")
      .and("have.css", "background-color", "rgb(108, 117, 125)")
      .contains("Widgets")
      .find("svg")
      .should("have.attr", "viewBox", "0 0 24 24");
    cy.get(".header-right").eq(3).children().eq(1).find("svg").should("have.attr", "viewBox", "0 0 24 24");
    cy.get(".header-wrapper")
      .eq(4)
      .should("be.visible")
      .and("have.css", "background-color", "rgb(108, 117, 125)")
      .contains("Interaction")
      .find("svg")
      .should("have.attr", "viewBox", "0 0 1024 1024");
    cy.get(".header-right").eq(0).children().eq(1).find("svg").should("have.attr", "viewBox", "0 0 24 24");

    // check header
    cy.get(".col-md-4").children().eq(0).should("be.visible");
    cy.get("header a img").should("have.attr", "src", "/images/Toolsqa.jpg").and("be.visible");
    cy.get(".playgound-header").should("have.css", "background-color").and("eq", "rgba(177, 177, 177, 0.11)");
    cy.get(".main-header").contains("Practice Form");
    PracticeFormElement();

    // check Name, Last Name, Email
    cy.get("#userName-wrapper").should("exist");
    cy.get("#firstName").should("exist").and("have.attr", "placeholder", "First Name").and("be.visible");
    cy.get("#lastName").should("exist").and("have.attr", "placeholder", "Last Name").and("be.visible");
    cy.get("#userEmail").should("exist").and("have.attr", "placeholder", "name@example.com").and("be.visible");
    cy.get("#genterWrapper").should("exist");

    // Check Gender Radio Buttons
    cy.get("#genterWrapper").within(() => {
      cy.get('input[type="radio"]').should("have.length", 3);
      // Assert that the radio button is checked
      cy.get('input[type="radio"]')
        .eq(0)
        .should("have.value", "Male")
        .check({ force: true })
        .should((el) => {
          expect(el[0]).to.have.property("checked", true);
        });

      cy.get('input[type="radio"]')
        .eq(1)
        .within((el) => {
          cy.get(el[0]).should("have.prop", "checked", false);
        });
      cy.get('input[type="radio"]')
        .eq(2)
        .within((el) => {
          cy.get(el[0]).should("have.prop", "checked", false);
        });

      cy.get('input[type="radio"]')
        .eq(1)
        .should("have.value", "Female")
        .check({ force: true })
        .should((el) => {
          expect(el[0]).to.have.property("checked", true);
        });
      cy.get('input[type="radio"]')
        .eq(0)
        .within((el) => {
          cy.get(el[0]).should("have.prop", "checked", false);
        });
      cy.get('input[type="radio"]')
        .eq(2)
        .within((el) => {
          cy.get(el[0]).should("have.prop", "checked", false);
        });
      cy.get('input[type="radio"]')
        .eq(2)
        .should("have.value", "Other")
        .check({ force: true })
        .should((el) => {
          expect(el[0]).to.have.property("checked", true);
        });
      cy.get('input[type="radio"]')
        .eq(0)
        .within((el) => {
          cy.get(el[0]).should("have.prop", "checked", false);
        });
      cy.get('input[type="radio"]')
        .eq(1)
        .within((el) => {
          cy.get(el[0]).should("have.prop", "checked", false);
        });
    });
    // checks userNumber input field
    cy.get("#userNumber-wrapper").should("exist");
    cy.get("#userNumber-label").should("have.text", "Mobile(10 Digits)");
    cy.get("#userNumber").should("have.attr", "required");
    cy.get("#userNumber").should("have.attr", "autocomplete", "off");
    cy.get("#userNumber").should("have.attr", "placeholder", "Mobile Number");

    // check Date of Birth input field
    cy.contains("Date of Birth").should("exist").should("be.visible");
    const today = new Date();
    const formatDate = dayjs(today).format("D MMM YYYY");

    // check that the field contains today's date
    cy.get("#dateOfBirthInput").should("have.value", formatDate).click();
    cy.get(".react-datepicker__month-container").should("be.visible");
    cy.get("#firstName").click();

    // check subjects-label input field
    cy.get("#subjectsWrapper").should(($el) => {
      expect($el[0].outerText).to.contain("Subjects");
    });
    cy.get(".subjects-auto-complete__value-container").should("be.visible").invoke("val").should("be.empty");

    cy.get("#hobbiesWrapper").should(($el) => {
      expect($el[0].outerText).to.contain("Hobbies");
    });
    // check that hobbiesWrapper el has 3 checkboxes
    cy.get("#hobbiesWrapper").find('input[type="checkbox"]').should("have.length", 3);
    cy.get('input[type="checkbox"]').eq(0).check({ force: true });
    cy.get('input[type="checkbox"]').eq(1).check({ force: true });
    cy.get('input[type="checkbox"]').eq(2).check({ force: true });
    cy.get('input[type="checkbox"]')
      .eq(0)
      .within((el) => {
        cy.get(el[0]).should("have.prop", "checked", true);
      });
    cy.get('input[type="checkbox"]')
      .eq(1)
      .within((el) => {
        cy.get(el[0]).should("have.prop", "checked", true);
      });
    cy.get('input[type="checkbox"]')
      .eq(2)
      .within((el) => {
        cy.get(el[0]).should("have.prop", "checked", true);
      });

    // check select picture button
    const imagefile = "cat_logo.png";
    const path = "C:\\fakepath\\";
    cy.get("#uploadPicture")
      .should("be.visible")
      .attachFile(imagefile)
      .then((el) => {
        expect(el).to.have.prop("value", path + imagefile);
      });

    // check address field
    cy.get("#currentAddress-wrapper").contains("Current Address").should("be.visible");
    cy.get("#currentAddress")
      .should("have.attr", "placeholder", "Current Address")
      .and("not.be.disabled")
      .should("have.css", "background-color", "rgb(255, 255, 255)");

    // check State and City
    cy.get("#stateCity-label").contains("State and City").should("be.visible");

    cy.get("#react-select-3-input").should("not.be.disabled").and("have.prop", "ariaAutoComplete", "list");
    cy.get("#react-select-4-input").should("be.disabled");

    //  check Submit button
    cy.get("#submit").should("exist").should("contain.text", "Submit").and("have.css", "border-color", "rgb(0, 123, 255)");
  });
});
