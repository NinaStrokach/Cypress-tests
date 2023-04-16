/* eslint-disable no-undef */

export function PracticeFormElement () {
  cy.get('h5').contains('Student Registration Form')
    .should('have.css', 'font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"')
    .should('have.css', 'font-size', '20px')
    .should('have.css', 'font-weight', '500')
    .should('have.css', 'line-height', '24px')
    .should('have.css', 'color', 'rgb(33, 37, 41)');
}
