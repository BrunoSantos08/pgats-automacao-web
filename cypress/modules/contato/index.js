class Contato {
    preencherFormularioDeContato(name, email, subject, message) {
        cy.get('input[data-qa="name"]').type(name);
        cy.get('input[data-qa="email"]').type(email);
        cy.get('input[data-qa="subject"]').type(subject);
        cy.get('[data-qa="message"]').type(message);
    }

    selecionarArquivo(file) {
        cy.fixture(file).as('file');
        cy.get('input[type="file"]').selectFile('@file');
    }

    enviarMensagem() {
        cy.get('[data-qa="submit-button"]').click();
    }

    validarDadosEnviados() {
        cy.get('.status')
            .should('be.visible')
            .should('have.text', 'Success! Your details have been submitted successfully.');
    }
}

export default new Contato()