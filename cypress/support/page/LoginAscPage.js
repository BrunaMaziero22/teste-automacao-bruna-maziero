const ambiente = Cypress.config("baseUrl")

import LoginAscElements from "../elements/LoginAscElements";
const AscElements = new LoginAscElements

const users = require('../../fixtures/users.json')
const usuario = users.LoginValido.usuario
const senha = users.LoginValido.senha

class LoginAscPage {

    AbrirBrowser (){
        cy.visit(ambiente);
    }

    DadosValidos_Usuario_Senha (){
        cy.get(AscElements.usuario())
        .type (usuario)

        cy.get(AscElements.senha())
        .type (senha)
    }

    BtnEntrar (){
        cy.get(AscElements.btn_entrar())
        .should ('be.visible')
        .and ('have.text', 'Entrar')
        .click()
    }

    SessaoAgentes (){
            cy.get(AscElements.btn_agentes())
            .should ('be.visible')
            .click()
            
            cy.get(AscElements.btn_notificar_agentes())
            .click()

            cy.get(AscElements.txt_notificacao())
            .should ('be.visible')
            .and ('have.text', ' Notificações de agente')

            cy.get(AscElements.btn_mais())
            .should ('be.visible')
            .click()    
    }
    
    CriarNotificacao (){
            cy.get(AscElements.campo_mensagem())
            .click()
            .type ('Teste Bruna - QA')

            cy.get(AscElements.txt_notificacao())
            .should ('be.visible')
            .and ('have.text', ' Notificações de agente')

            cy.get(AscElements.btn_voltar())
            .and ('have.text', 'Voltar')

            cy.get(AscElements.btn_salvar())
            .should ('be.visible')
            .and ('have.text', ' Salvar')
            .click()

            cy.get(AscElements.validar_mensagem())
            .should ('be.visible')
            .and ('have.text', 'Teste Bruna - QA')



    }

























}
export default LoginAscPage; 