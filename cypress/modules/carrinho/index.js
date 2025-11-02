import { faker } from '@faker-js/faker'

class Carrinho {
    adicionarProdutoCarrinho = (productId) => {
        cy.get(`a[data-product-id="${productId}"].add-to-cart`).first().should('be.visible').click();
    };

    clicarContinuarComprando() {
        cy.contains('button', 'Continue Shopping').click();
    }

    clicarFinalizarCompra() {
        cy.get('a.btn.btn-default.check_out').click();
    }

    reviewOrder(productId) {
        cy.get(`a[href="/product_details/${productId}"]`).should('be.visible');
    }

    digitarComentario(message) {
        cy.get('textarea[name="message"]').type(message);
    }

    clicarFazerPedido() {
        cy.get('a.btn.btn-default.check_out').click();
    }

    preencherDadosPagamento() {
        cy.get('input[data-qa=name-on-card]').type(faker.person.fullName());
        cy.get('input[data-qa=card-number]').type(faker.finance.creditCardNumber());
        cy.get('input[data-qa=cvc]').type(faker.finance.creditCardCVV());
        cy.get('input[data-qa=expiry-month]').type(faker.date.future().getMonth() + 1);
        cy.get('input[data-qa=expiry-year]').type(faker.date.future().getFullYear());
    }

    pagarConfirmarPedido() {
        cy.get('[data-qa="pay-button"]').click();
    }

    checkout(productsId) {
        this.clickProceedToCheckout();
        this.checkCheckoutPage();

        productsId.forEach(productId => {
            this.reviewOrder(productId);
        });
    }

}

export default new Carrinho()