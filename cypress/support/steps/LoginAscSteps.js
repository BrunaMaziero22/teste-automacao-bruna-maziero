import LoginAscPage from	'../page/LoginAscPage'
const login = new LoginAscPage




Given(/^que acesso a tela de login$/, () => {
	login.AbrirBrowser();
});

When(/^informo os dados validos$/, () => {
	login.DadosValidos_Usuario_Senha();
});

Then(/^o sistema deve realizar Login com Sucesso$/, () => {
	login.BtnEntrar();
});

Given(/^que eu esteja na home logada$/, () => {
	login.AbrirBrowser();
	login.DadosValidos_Usuario_Senha();
	login.BtnEntrar();
});

When(/^acessar sessao de notificacao$/, () => {
	login.SessaoAgentes();

});

Then(/^o sistema deve criar uma notificacao com Sucesso$/, () => {
	login.CriarNotificacao();
});