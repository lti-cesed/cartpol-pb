/*
 * Laboratório de Tecnologia da Informação - LTI - CESED - 2014
 * Todos os direitos reservados
 *
 * Software desenvolvido para a Polícia Civil de Campina Grande - PB
 *
 * Script com as funcoes que implementam o modulo controlador da página 
 * de informações gerais.
 */

cartpol.controlador.informacaoGeral = {

  exibirForm: function() {
    toolkit.fillElementWithTemplate("main_content", "informacao_geral/form", {}, cartpol.controlador.informacaoGeral.funcoesForm);
  },
  funcoesForm: function() {
    $.getJSON("informacaoGeral.json", function(data) {
        cartpol.controlador.informacaoGeral.adicionaOpcoes("#superintendencia", data.superintendencia);
        cartpol.controlador.informacaoGeral.adicionaOpcoes("#delegado", data.delegado);
    });
    cartpol.controlador.informacaoGeral.atualizadorCombo("superintendencia","dspc");
    cartpol.controlador.informacaoGeral.atualizadorCombo("dspc","delegacia");
    cartpol.controlador.informacaoGeral.atualizadorCombo("superintendencia","delegacia");
    $("#informacao_geral_form").submit(function(evt) {
      evt.preventDefault();     
      var dados = {
        superintendencia: $('#superintendencia option:selected').text(),
        dspc: $('#dspc option:selected').text(),
        delegacia: $('#delegacia option:selected').text(),
        delegado: $('#delegado option:selected').text()
      };
      cartpol.globals.informacaoGeral = new cartpol.entidades.InformacaoGeral(dados);
      cartpol.controlador.principal.exibirForm();
      return false;
    });
  },
  adicionaOpcoes: function(campo, lista){
    $(campo).empty();
    $(campo).append(new Option("-- Selecione --"));
    if(lista instanceof Array){
        for (var i = 0; i < lista.length; i++) {
            var elemento = lista[i];
            $(campo).append(new Option(elemento.nome, i));
        }
    } else {
        var elemento = lista;
        try {
            $(campo).append(new Option(elemento.nome, i));
        }
        catch(err){

        }
    }
  },
  atualizadorCombo: function(idouvinte, idmodificado) {
    $('#'+idouvinte).change(function() {
        var posx = $('select#'+idouvinte+' option:selected').val();
        $.getJSON("informacaoGeral.json", function(data) {
            if(idmodificado == "dspc") {
                cartpol.controlador.informacaoGeral.adicionaOpcoes("#"+idmodificado, data.superintendencia[posx].dspc);
            }else{
                var posy = $('select#superintendencia option:selected').val();
                cartpol.controlador.informacaoGeral.adicionaOpcoes("#"+idmodificado, data.superintendencia[posy].dspc[posx].delegacia);
            }
        });
    })}
};