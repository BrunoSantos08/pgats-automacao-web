import { faker } from '@faker-js/faker';

class Cadastro {
    preencherFormularioDePreCadastroCompleto() {
        cy.get('input#id_gender1').check();

        cy.get('input#password').type('12345', { log: false });

        // combobox ou select -> select()
        cy.get('[data-qa="days"]').select('10');
        cy.get('[data-qa="months"]').select('May');
        cy.get('select#years').select('1990');

        // radio ou checkbox -> check()
        cy.get('input[type="checkbox"]#newsletter').check();
        cy.get('input#optin').check();

        cy.get('input#first_name').type(faker.person.firstName());
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type(faker.company.name());
        cy.get('input#address1').type(faker.location.streetAddress());
        cy.get('select#country').select('Canada');
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('input[data-qa="zipcode"]').type(faker.location.zipCode());
        cy.get('input[data-qa="mobile_number"]').type('111-222-123');

        // Act
        cy.get('button[data-qa="create-account"]').click();
    }
}

export default new Cadastro();