const selector = require("../fixtures/selectors.json");
const data = require("../fixtures/data.json");
// const fn = require("../functions/getProductValues");
// const genders = ["Men", "Women"];
let productTitle, productPrice;
describe("checkout flow with quick add to cart feature", () => {
  before(() => {
    cy.login(data.email, data.password);
  });
  it(`it should add the product to cart successfully for Men shoes`, () => {
    cy.get(selector.home_icon).click();
    // Selecting Men shoes

    cy.get(selector.Men_dropdown).contains("Men").trigger("mouseover");
    cy.get(selector.men_shoes).contains("Shoes").click({ force: true });
    // Checking the number of products cards being shown

    cy.get(selector.products_block)
      .find(selector.product_card)
      .should("have.length", "15");
    // Getting Title of product

    cy.get(selector.product_description)
      .find(selector.product_title)
      .eq(0)
      .invoke("text")
      .then((text) => {
        productTitle = text;
      });
    // Getting Price of product

    cy.get(selector.product_description)
      .find(selector.product_price)
      .eq(0)
      .invoke("text")
      .then((text) => {
        let productPrice1 = text;
        productPrice = productPrice1.trim();
      });
    // Adding product through Quick Add button to cart

    cy.get(selector.products_block)
      .find(selector.product_card)
      .eq(0)
      .trigger("mouseover");
    // shoes variants should be visible on mouseover

    cy.get(selector.product_variants).should("be.visible");

    cy.get(selector.quick_add_button).eq(0).click({ force: true });

    // select size which is available
    cy.get(selector.size_block)
      .find(selector.size)
      .contains(44)
      .click({ force: true });
    cy.wait(2000);
  });
  it("it should checkout successfully", () => {
    cy.get(selector.order_info)
      .find(selector.order_product_title)
      .should("contain", productTitle);
    // cy.get(selector.order_info)
    //   .find(selector.order_price)
    //   .should("contain", productPrice);
    cy.wait(10000);
    cy.get(selector.checkout_button).click({ force: true });
  });
  it("should check all the user data successfully", () => {
    cy.get(selector.acceptCookies).click();
    cy.wait(5000);
    cy.get(selector.recepient_name).should(
      "contain.text",
      `${data.first_name} ${data.last_name}`
    );
    cy.get(selector.recepient_address).should(
      "contain.text",
      `${data.Address}, ${data.postal_code}, ${data.city}`
    );

    // cy.get("#firstname").should("have.value", data.first_name);
    // cy.get("#lastname").should("have.value", data.last_name);
    // cy.get("#zipcode").should("have.value", data.postal_code);
    // cy.get("#city").should("have.value", data.city);
    // // cy.get("#country_id").should("have.value", data.Country);
    // cy.get("#phone").should("have.value", data.phone);
    cy.get(selector.form_submit).click();
    cy.get(selector.shipment_block).should("be.visible");
    // go to payment method
    cy.get(selector.form_submit).eq(1).click();
  });
  it("should add payment method successfully", () => {
    cy.wait(5000);
    cy.get(selector.payment_method).find(selector.credit_card_radio).click();

    cy.get(selector.card_no_block)
      .find(selector.iframe)
      .its("0.contentDocument.body")
      .within(() => {
        cy.get(selector.card_num_input)
          .click({ force: true })
          .type(data.credit_card_info.card_no);
      });
    cy.get(selector.card_DOE_block)
      .find(selector.iframe)
      .its("0.contentDocument.body")
      .within(() => {
        cy.get(selector.card_DOE_input)
          .click()
          .type(data.credit_card_info.date_of_expirt);
      });

    cy.get(selector.card_cvc_block)
      .find(selector.iframe)
      .its("0.contentDocument.body")
      .within(() => {
        cy.get(selector.card_cvc_input)
          .click()
          .click()
          .type(data.credit_card_info.cvc);
      });

    cy.get(selector.card_name).type(`${data.first_name} ${data.last_name}`);
    cy.get(selector.form_submit).click();
  });
  it("The summary of product should have all the necessary data", () => {
    cy.wait(10000);
    // Confirmation Message should be visible
    cy.get(".confirmation-container").should("be.visible");
    cy.get(".confirmation-container__title").should("be.visible");
    cy.get(".confirmation-container__order-totals").should("be.visible");
    cy.get(".confirmation-container__order-details").should("be.visible");
    cy.get(".order-totals-row__amount").should("contain.text", productPrice);
  });
});
