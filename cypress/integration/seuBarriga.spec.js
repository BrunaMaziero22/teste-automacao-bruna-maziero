class LoginPage {
  acessarLogin() {
    cy.visit('https://seubarriga.wcaquino.me/login');
  }

  preencherEmail(email) {
    cy.get('#email').clear().type(email);
  }

  preencherSenha(senha) {
    cy.get('#senha').clear().type(senha);
  }

  clicarLogin() {
    cy.get('.btn-primary').click();
  }

  validarLoginSucesso() {
    cy.get('.alert-success').should('contain', 'Bem vindo');
  }

  validarErroLogin() {
    cy.get('.alert-danger').should('be.visible');
  }

  criarUsuario(nome, email, senha) {
    cy.contains('Novo usuário?').click();
    cy.get('#nome').clear().type(nome);
    cy.get('#email').clear().type(email);
    cy.get('#senha').clear().type(senha);
    cy.get('.btn-primary').click();
  }

  validarCadastroSucesso() {
    cy.get('.alert-success').should('contain', 'Usuário inserido com sucesso');
  }

  realizarLogout() {
    cy.contains('a', 'Sair').click();
    cy.url().should('include', '/login');
  }
}

class ContasPage {
  acessarContas() {
    cy.contains('a', 'Contas').click();
  }

  adicionarConta(nome) {
    cy.get('#nome').clear().type(nome);
    cy.contains('button', 'Salvar').click();
  }

  validarContaSucesso() {
    cy.get('.alert-success').should('contain', 'Conta adicionada com sucesso');
  }

  alterarConta(novoNome) {
    cy.get('table tbody tr').first().find('.glyphicon-edit').click();
    cy.get('#nome').clear().type(novoNome);
    cy.contains('button', 'Salvar').click();
  }

  validarAlteracaoConta() {
    cy.get('.alert-success').should('contain', 'Conta alterada com sucesso');
  }

  excluirContaComMovimentacao() {
    cy.on('window:confirm', () => true);
    cy.get('table tbody tr').first().find('.glyphicon-remove-circle').click();
  }

  validarErroExclusao() {
    cy.get('.alert-danger').should('contain', 'Conta em uso na movimentação');
  }
}

class MovimentacaoPage {
  acessarCriarMovimentacao() {
    cy.contains('a', 'Criar Movimentação').click();
  }

  criarMovimentacao(tipo, descricao, valor, interessado, conta, situacao, data) {
    cy.get('#tipo').select(tipo);
    cy.get('#data_transacao').clear().type(data);
    cy.get('#data_pagamento').clear().type(data);
    cy.get('#descricao').clear().type(descricao);
    cy.get('#interessado').clear().type(interessado);
    cy.get('#valor').clear().type(valor);
    cy.get('#conta').select(conta);
    if (situacao === 'Pago') {
      cy.get('#status_pago').check();
    } else {
      cy.get('#status_pendente').check();
    }
    cy.contains('button', 'Salvar').click();
  }

  validarMovimentacaoSucesso() {
    cy.get('.alert-success').should('contain', 'sucesso');
  }
}

class ResumoPage {
  acessarResumoMensal() {
    cy.contains('a', 'Resumo Mensal').click();
  }

  filtrarMesAno(mes, ano) {
    cy.get('#mes').select(mes);
    cy.get('#ano').select(ano);
    cy.contains('button', 'Buscar').click();
  }

  excluirMovimentacao() {
    cy.on('window:confirm', () => true);
    cy.get('.glyphicon-remove-circle').first().click();
  }

  validarExclusao() {
    cy.get('.alert-success').should('contain', 'Movimentação removida com sucesso');
  }
}

const Login = new LoginPage();
const Contas = new ContasPage();
const Movimentacao = new MovimentacaoPage();
const Resumo = new ResumoPage();

describe('Desafio QA - Automação Seu Barriga', () => {
  const timestamp = Date.now();
  const nome = 'Bruna QA';
  const email = `teste_${timestamp}@mail.com`;
  const senha = '123456';
  const contaPrincipal = `Conta QA ${timestamp}`;
  const contaSecundaria = `Conta QA ${timestamp + 1}`;
  const contaAlterada = `Conta QA Alterada ${timestamp}`;
  const descricaoReceita = `Salário ${timestamp}`;
  const descricaoDespesa = `Luz ${timestamp}`;

  const realizarLogin = () => {
    Login.acessarLogin();
    Login.preencherEmail(email);
    Login.preencherSenha(senha);
    Login.clicarLogin();
  };

  it('✅ Criar usuário com sucesso', () => {
    Login.acessarLogin();
    Login.criarUsuario(nome, email, senha);
    Login.validarCadastroSucesso();
    Login.acessarLogin();
  });

  it('🚫 Fluxo alternativo - tentar login sem usuário cadastrado', () => {
    Login.acessarLogin();
    Login.preencherEmail('naoexiste@mail.com');
    Login.preencherSenha('123456');
    Login.clicarLogin();
    Login.validarErroLogin();
  });

  it('✅ Login com sucesso', () => {
    realizarLogin();
    Login.validarLoginSucesso();
    Login.realizarLogout();
  });

  context('Área autenticada', () => {
    beforeEach(() => {
      realizarLogin();
      Login.validarLoginSucesso();
    });

    afterEach(() => {
      Login.realizarLogout();
    });

    it('🧾 Adicionar e editar contas', () => {
      Contas.acessarContas();
      Contas.adicionarConta(contaPrincipal);
      Contas.validarContaSucesso();

      Contas.adicionarConta(contaSecundaria);
      Contas.validarContaSucesso();

      Contas.alterarConta(contaAlterada);
      Contas.validarAlteracaoConta();
    });

    it('💰 Criar movimentações (Receita e Despesa)', () => {
      Movimentacao.acessarCriarMovimentacao();
      Movimentacao.criarMovimentacao(
        'Receita',
        descricaoReceita,
        '5000',
        'Empresa',
        contaAlterada,
        'Pago',
        '2024-07-05',
      );
      Movimentacao.validarMovimentacaoSucesso();

      Movimentacao.criarMovimentacao(
        'Despesa',
        descricaoDespesa,
        '250',
        'CEEE',
        contaAlterada,
        'Pendente',
        '2024-07-15',
      );
      Movimentacao.validarMovimentacaoSucesso();
    });

    it('⚠️ Fluxo alternativo - excluir conta com movimentação', () => {
      Contas.acessarContas();
      Contas.excluirContaComMovimentacao();
      Contas.validarErroExclusao();
    });

    it('📊 Resumo mensal - aplicar filtros e excluir movimentação', () => {
      Resumo.acessarResumoMensal();
      Resumo.filtrarMesAno('Julho', '2024');
      Resumo.excluirMovimentacao();
      Resumo.validarExclusao();
    });
  });

  it('🚪 Logout', () => {
    realizarLogin();
    Login.validarLoginSucesso();
    Login.realizarLogout();
  });
});
