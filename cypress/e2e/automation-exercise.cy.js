import {
    getRandomNumber,    
    getRandomEmail
} from '../support/helpers.js';

import { fa, faker } from '@faker-js/faker';


/**
 // describe -> Automation Exercise
// it -> Cadastrar um usuário
 */

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
    });

    
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type('QA Tester')
        //cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())

        cy.contains('button', 'Signup').click();
        //cy.get('[data-qa="signup-button"]').click();

        // radio ou checkbox -> check()
        cy.get('#id_gender1').check();
        //cy.get('input[type=radio]').check('Mr');

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

        // Assert
        cy.url().should('includes', 'account_created');

        cy.contains('b', 'Account Created!');

        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');


    });


    // it -> Fazer login com o usuário cadastrado (qa-tester-1761708608284@test.com)
    it.only('Fazer login com e-mail e senha corretos', () => {
        cy.get('input[data-qa="login-email"]').type('qa-tester-1761708608284@test.com');
        cy.get('input[data-qa="login-password"]').type('12345', { log: false });

        cy.get('button[data-qa="login-button"]').click();

        // Assert
        cy.get('i.fa-user').parent().should('contain', 'QA Tester');
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('a', 'Logged in as QA Tester');
    });


    // it -> Fazer login com e-mail e senha incorretos
    it('Fazer login com e-mail e senha incorretos', () => {
        cy.get('input[data-qa="login-email"]').type('qa-tester-123@test.com');
        cy.get('input[data-qa="login-password"]').type('54321');

        cy.get('button[data-qa="login-button"]').click();

        // Assert
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');

    });


    // it -> Fazer logout com sucesso
    it('Fazer logout com sucesso', () => {
        // Arrange
        cy.get('input[data-qa="login-email"]').type('qa-tester-1761708608284@test.com');
        cy.get('input[data-qa="login-password"]').type('12345', { log: false });

        cy.get('button[data-qa="login-button"]').click();
        cy.get('i.fa-user').parent().should('contain', 'QA Tester');

        // Act
        cy.get('a[href="/logout"]').should('be.visible').click();

        // Assert
        cy.url().should('include', '/login');
        cy.contains('Login to your account');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login');
        cy.get('a[href="/logout"]').should('not.exist');
    });


    // it -> Cadastrar um usuário com e-mail existente
    it('Cadastrar um usuário com e-mail existente', () => {
        // Arrange
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-1761708608284@test.com`)

        // Act
        cy.contains('button', 'Signup').click();

         // Assert
        cy.contains('.signup-form > form > p', 'Email Address already exist!').should('be.visible');
        //cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!');
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
 
    
    });


});

