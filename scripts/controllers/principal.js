/*
 * Laboratório de Tecnologia da Informação - LTI - CESED - 2014
 * Todos os direitos reservados
 *
 * Software desenvolvido para a Polícia Civil de Campina Grande - PB
 *
 * Script com as funcoes que implementam o modulo controlador da página 
 * principal do sistema.
 */
 
cartpol.controlador.principal = {
  exibirForm: function() {
    toolkit.fillElementWithTemplate("main_content", "main_page", {}, cartpol.controlador.principal.funcoesForm);
    toolkit.fillElementWithTemplate("conteudo", "bo/form", {}, cartpol.controlador.bo.funcoesForm);
  },
  funcoesForm: function() {
    cartpol.controlador.principal.funcaoControleMenu();
    cartpol.controlador.principal.funcaoControleMenuMobile();
    $("#botao-novo-bo").click(cartpol.controlador.bo.exibirForm);
    $("#botao-novo-tco").click(cartpol.controlador.tco.exibirForm);
    $("#botao-novo-inquerito").click(cartpol.controlador.inquerito.exibirForm);
    $("#botao-novo-apf").click(cartpol.controlador.apf.exibirForm);
    $("#botao-novo-peca").click(cartpol.controlador.peca.exibirForm);
    $("#botao-novo-consultas").click(cartpol.controlador.bo.exibirList);
    //$(".botao-lista-bo").click(cartpol.exibePaginaListaBOs);
    toolkit.fillElementWithTemplate("barra-de-ferramentas", "barra_de_ferramentas", {}, cartpol.controlador.principal.funcoesBarraDeFerramentas);
    //toolkit.fillElementWithTemplate("conteudo", "bo/form", {}, cartpol.controlador.bo.funcoesForm);
  },
  funcoesBarraDeFerramentas: function() {
    $("#sair_btn").click(cartpol.controlador.login.exibirForm);
    $("#botao-novo-bo").click(cartpol.controlador.bo.exibirForm);
    $("#botao-novo-tco").click(cartpol.controlador.tco.exibirForm);
    $("#botao-novo-inquerito").click(cartpol.controlador.inquerito.exibirForm);
    $("#botao-novo-apf").click(cartpol.controlador.apf.exibirForm);
    $("#botao-novo-peca").click(cartpol.controlador.peca.exibirForm);
    //$(".botao-lista-bo").click(cartpol.exibePaginaListaBOs);
  },
  funcaoControleMenu: function(){
    //Função para alterar o bg do botão da tela principal ao ser clicado
    $('.botao-novo').click(function(){
        var id_novo = $(this).attr('id');
        $('.botao-novo').removeClass("new-bg");
        $("#"+id_novo).addClass("new-bg");
    });    
  },
  funcaoControleMenuMobile: function(){
    $('#bt-menu').click(function(){
        $('#menu-topo').animate({width: 'toggle'});
    });
  }
}