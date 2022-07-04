const selector = require("../fixtures/selectors.json");
const data = require("../fixtures/data.json");
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get(selector.acceptCookies).click();
  cy.get(selector.profile_icon).click();
  cy.get(selector.email).eq(0).should("be.visible").type(email);
  cy.get(selector.password).eq(0).should("be.visible").type(password);
  cy.get(selector.login_button).click();
  cy.get(selector.account_welcome).should("contain.text", data.first_name);
});
// Cypress.Commands.add("getIframe", (iframe) => {
//   return cy
//     .get(iframe)
//     .its("0.contentDocument.body")
//     .should("be.visible")
//     .then(cy.wrap);
// });

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
