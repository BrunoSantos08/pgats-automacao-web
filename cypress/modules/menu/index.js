class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click();
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click();
    }

    navegarParaContato() {
        cy.get('a[href="/contact_us"]').click();
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').click();
    }

    navegarParaCarrinho() {
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    }
}

export default new Menu();