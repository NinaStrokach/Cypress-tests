import './commands'

import '@shelex/cypress-allure-plugin';
require('@shelex/cypress-allure-plugin');

before(() => {

});

beforeEach(() => {
cy.server();
cy.createOng();

});
