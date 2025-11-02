import { faker } from '@faker-js/faker';
import { getRandomEmail } from '../support/helpers'

import userData from '../fixtures/user.json';
import contatoData from '../fixtures/contato.json';
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import produtos from '../modules/produtos';
import home from '../modules/home';
import carrinho from '../modules/carrinho';

/**
 // describe -> Automation Exercise
// it -> Cadastrar um usuário
 */

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');  
    });

    it('Cadastrar um usuário', () => {
        const name = faker.person.firstName();
        const email = getRandomEmail();
        
        menu.navegarParaLogin();
        login.preencherFormularioDePreCadastro(name, email);
        cadastro.preencherFormularioDePreCadastroCompleto();
        
        // Assert
        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!');
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
    });

    it('Fazer login com e-mail e senha corretos', () => {
        menu.navegarParaLogin();
        login.preecherFormularioDeLogin(userData.user, userData.password); 

        // Assert
        cy.get('i.fa-user').parent().should('contain', userData.name);
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('a', 'Logged in as QA Tester');
    });

    it('Fazer login com e-mail e senha incorretos', () => {
        menu.navegarParaLogin();
        login.preecherFormularioDeLogin(userData.user, '54321');
         
        // Assert
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');

    });

    it('Fazer logout com sucesso', () => {
        menu.navegarParaLogin();
        login.preecherFormularioDeLogin(userData.user, userData.password);
        menu.efetuarLogout();

        // Assert
        cy.url().should('include', '/login');
        cy.contains('Login to your account');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login');
        cy.get('a[href="/logout"]').should('not.exist');
    });

    it('Cadastrar um usuário com e-mail existente', () => {
        menu.navegarParaLogin();
        login.preecherFormularioEmailExistente(userData.name, userData.user);

        // Assert
        cy.contains('.signup-form > form > p', 'Email Address already exist!').should('be.visible');
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
    });

    it('Formulário de contato', () => {
        menu.navegarParaContato();

        contato.preencherFormularioDeContato(contatoData.name, contatoData.email, contatoData.subject, contatoData.message);
        contato.selecionarArquivo('contato.json');
        contato.enviarMensagem();

        // Assert
        contato.validarDadosEnviados();
    });

    it('Verificar todos os produtos e detalhes da página', () => {
        menu.navegarParaProdutos();

        produtos.verificarTextoTitulo('All Products');
        
        // verificar os produtos listados
        cy.get('a:contains("View Product")').should('have.length.greaterThan', 0);

        produtos.cliquePrimeiroProduto();

        // Asserts
        // verificar tela de detalhamento de produto
        cy.url().should('include', 'product_details');
        
        // verificar informações visíveis do produto
        cy.get('div.product-information h2')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Category')
            .should('be.visible');
        cy.get('div.product-information span span')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Availability')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Condition')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Brand')
            .should('be.visible');          
    });

    it('Pesquisar produtos', () => {
        const productName = 'Men Tshirt'
        menu.navegarParaProdutos();

        produtos.verificarTextoTitulo('All Products');
        produtos.preencherBuscaProduto(productName);
        produtos.cliqueBuscarProduto();
        
        // Asserts
        produtos.verificarTextoTitulo('Searched Products');
        
        // verificar quantidade de produtos listados
        cy.get('a:contains("View Product")').should('have.length', 1);
        
        // verificar produto pesquisado
        cy.get('div.productinfo.text-center p').should('contain',  productName);
    });

    it('Verificar inscrição na home page', () => {
        home.verificarHomePage();
        home.scrollParaBaixo();

        // verificar texto "SUBSCRIPTION"
        cy.get('.single-widget h2').should('be.visible').should('contain', 'Subscription');
        
        home.preencherCampoInscricao(userData.user);
        home.enviarInscricao();
        
        // verificar mensagem de sucesso
        cy.get('.alert-success').should('be.visible').should('have.text', 'You have been successfully subscribed!')
    });

    it('Cadastro antes da finalização do pedido', () => {
        const name = faker.person.firstName();
        const email = getRandomEmail();
        const productId = [1, 2, 3];
        const comentario = faker.lorem.lines(3);

        menu.navegarParaLogin();
        login.preencherFormularioDePreCadastro(name, email);
        cadastro.preencherFormularioDePreCadastroCompleto();
        
        // verificar se conta foi criada
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
        
        cy.get('[data-qa="continue-button"]').click();
        
        // verificar se usuário está logado
        cy.get('a[href="/logout"]').should('be.visible');

        productId.forEach(productId => {
            carrinho.adicionarProdutoCarrinho(productId);
            carrinho.clicarContinuarComprando();
        });

        menu.navegarParaCarrinho();

        // verificar página de carrinho
        cy.url().should('contain', 'cart');
        cy.get('section#cart_items').should('contain', 'Shopping Cart');

        carrinho.clicarFinalizarCompra();
        
        // verificar página de compra finalizada
        cy.url().should('include', '/checkout');
        cy.get('section#cart_items').should('contain', 'Checkout').should('be.visible');
        
        carrinho.digitarComentario(comentario);
        carrinho.clicarFazerPedido();
    
        // verificar página de pagamento
        cy.url().should('include', '/payment');
        cy.get('section#cart_items').should('contain', 'Payment').should('be.visible');

        carrinho.preencherDadosPagamento();
        carrinho.pagarConfirmarPedido();

        // verificar confirmação de realização do pedido
        cy.get('[data-qa="order-placed"]').should('be.visible');
        cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');

        home.clicarExcluirConta();

        // verificar exclusão da conta
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('#form p').first().should('contain', 'Your account has been permanently deleted!');
        
        home.continuarAposExclusaoConta ();

        // verificar se voltou para a home page
        home.verificarHomePage();
    });

});

