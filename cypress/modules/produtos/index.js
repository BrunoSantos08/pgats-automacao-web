class Produto {
    get titulo() {
        return cy.get('h2.title.text-center');
    }

    verificarTextoTitulo(expectedText) {
        this.titulo.should('be.visible');
        this.titulo.should('have.text', expectedText);
    }

    cliquePrimeiroProduto() {
        cy.get('a[href="/product_details/1"]').click();
    }

    preencherBuscaProduto(name, time = 0) {
        cy.get('input#search_product').clear().type(name, { delay: time });
    }

    cliqueBuscarProduto() {
        cy.get('button#submit_search').click();
    }
    
}

export default new Produto();