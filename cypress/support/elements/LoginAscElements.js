class LoginAscElements {

    usuario = () => {return '#login-user'}
    senha = () => {return '#login-password'}

    btn_entrar = () => {return '#form-login > :nth-child(3) > .controls > .btn'}

    //Notificacao 

    btn_agentes = () => {return '#side_agentes > .dropdown-toggle > .arrow'}


    btn_notificar_agentes = () => {return '#side_agente_notificacoes > a'}

    btn_mais = () => {return '.btn-to-success > .fa'}

    campo_mensagem = () => {return '#nom_msg'}

    txt_notificacao = () => {return 'h1'}

    btn_salvar = () => {return 'btn-info'}

}
export default LoginAscElements; 