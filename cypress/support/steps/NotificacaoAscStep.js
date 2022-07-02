import LoginAscPage from '../page/LoginAscPage'
const login = new LoginAscPage



Given(/^que eu esteja na home logada$/, () => {
	login.AbrirBrowser();
	login.DadosValidos_Usuario_Senha();
	login.BtnEntrar();
});

When(/^informo os dados validos$/, () => {
	return true;
});

Then(/^o sistema deve criar uma notificacao com Sucesso$/, () => {
	return true;
});
