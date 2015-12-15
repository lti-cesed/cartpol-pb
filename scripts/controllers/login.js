/*
 * Laboratório de Tecnologia da Informação - LTI - CESED - 2014
 * Todos os direitos reservados
 *
 * Software desenvolvido para a Polícia Civil de Campina Grande - PB
 *
 * Script com as funcoes que implementam o modulo controlador do login.
 */
 
cartpol.controlador.login = {
  exibirForm: function() {
    $("#barra-de-ferramentas").html("");
    toolkit.fillElementWithTemplate("main_content", "login/form", {}, cartpol.controlador.login.funcoesForm);
  },
  validarLoginOnline: function(usuario){
    $.get('http://localhost:3000/validarUsuario',{matricula: usuario.matricula, senha: usuario.senha},function(data){
	 if (data.chave != null){
	    usuario.name = data.usuario;
	    cartpol.controlador.informacaoGeral.exibirForm();
	    //Salvo o usuario no LocalStorage.
	    if(typeof(Storage) !== "undefined") {
	 	localStorage.usuario = usuario;
	    }
         }
         else{
            alert('Usuario ou senha inválidos!');
         }
    })
  },
  validarLoginOffline: function(usuario){
    
    var resultado = cartpol.dataBase.recuperarUsuarioPorMatriculaSenha(usuario);
    if (resultado){
      cartpol.controlador.informacaoGeral.exibirForm();
      //Salvo o usuario no LocalStorage.
      if(typeof(Storage) !== "undefined") {
        localStorage.usuario = resultado;
      }
    }
    else {
      alert('Usuario ou senha inválidos!');
    }
    
  },
  funcoesForm: function() {
    require(['md5'], function(){
      $("#login_form").submit(function(evt) {
        evt.preventDefault();
	
        var usuario = {
      		matricula: $("#inputMatricula").val(),
      		senha: $.md5($("#inputSenha").val())
    	}

        //Força a checkagem
        Offline.check();

        if (Offline.state == "up"){
         // cartpol.controlador.login.validarLoginOnline(usuario);
          cartpol.controlador.login.validarLoginOffline(usuario);
        }
        else{
          cartpol.controlador.login.validarLoginOffline(usuario);
        }
        return false;
      });
    });
  }
};