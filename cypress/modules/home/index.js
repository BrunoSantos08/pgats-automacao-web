class Home {
    verificarHomePage() {
        cy.get('.fa-home').parent().should('have.attr', 'style').and('include', 'color: orange');
    }

    scrollParaBaixo() {
        cy.scrollTo('bottom');
    }

    preencherCampoInscricao(email) {
        cy.get('input#susbscribe_email').type(email);
    }

    enviarInscricao() {
        cy.get('button#subscribe').click();
    }

    clicarExcluirConta() {
        cy.get('a[href="/delete_account"]').click();
    }

    continuarAposExclusaoConta () {
        cy.get('[data-qa="continue-button"]').click();
    }
    
}

export default new Home()