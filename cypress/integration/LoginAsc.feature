
Feature: Tela de Login 

Scenario: Realizar Login com Sucesso 
        Given que acesso a tela de login  
        When  informo os dados validos 
        Then o sistema deve realizar Login com Sucesso 

Scenario: Criar Notificacao com sucesso  
        Given que eu esteja na home logada 
        When  acessar sessao de notificacao 
        Then o sistema deve criar uma notificacao com Sucesso        