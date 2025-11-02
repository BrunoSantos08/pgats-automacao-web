//import { de, faker } from '@faker-js/faker';

class Login {
    preencherFormularioDePreCadastro(name, email) {
        cy.get('input[data-qa="signup-name"]').type(name);
        cy.get('input[data-qa="signup-email"]').type(email);

        cy.contains('button', 'Signup').click();
    }

    preecherFormularioDeLogin(user, pass) {
        cy.get('input[data-qa="login-email"]').type(user);
        cy.get('input[data-qa="login-password"]').type(pass);

        cy.get('button[data-qa="login-button"]').click();
    }

    preecherFormularioEmailExistente(name, email) {
        cy.get('[data-qa="signup-name"]').type(name)
        cy.get('[data-qa="signup-email"]').type(email)

        cy.contains('button', 'Signup').click();
    }
}

export default new Login();