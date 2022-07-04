const selector = require("../fixtures/selectors.json");
const data = require("../fixtures/data.json");
describe("Home Page assertions", () => {
  before(() => {
    cy.login(data.email, data.password);
    cy.viewport(1440, 720);
  });
  it("it should check the page is loaded correctly", () => {
    cy.get(selector.home_icon).click();
    // Assertion to check we are on the main page
    // This assertion is checking the top header is visible
    cy.get(selector.nav_bar).should("be.visible");
    // This assertion is checking the two main blocks "Discover" and "might Interested products" are visible on the main page
    cy.get(".home__block-components")
      .should("be.visible")
      .should("have.length", 2);
    // Now we will check the functioanlity of an item selecion from "product recommendation section"
    cy.get(selector.recommended_products)
      .find(selector.product_card)
      .eq(0)
      .scrollIntoView()
      .trigger("mouseover");
    //quick add button and variant sliders should also be visible should be visible
    cy.get(selector.quick_add_button).should("be.visible");
  });
});
