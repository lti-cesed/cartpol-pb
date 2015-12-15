/**
 * Laboratório de Tecnologia da Informação - LTI - CESED - 2014
 * Todos os direitos reservados
 *
 * Software desenvolvido para a Polícia Civil de Campina Grande - PB
 *
 * Script com as funcoes que implementam o modulo controlador dos Boletins de 
 * Ocorrencia - BO
 */

/**
 * Classe que herda e add novos protótipos da lib PouchDB.
 * @class DataBase
 */
define(['pouchdb'], function(PouchDB) {
	'use strict';

	var USUARIO = 'nome_usuario',
    	SENHA   = 'senha_usuario';
	
  /**
   * DataBase construtor.
   * @constructor
   * @param {String} dataBaseName - Nome do banco de dados.
   */
	function DataBase(dataBaseName) {
		PouchDB.call(this, dataBaseName);
		this.dataBaseName = dataBaseName;
  }

  // Cria um novo objeto com o objeto de protótipo especificado e propriedades.
  DataBase.prototype = Object.create(PouchDB.prototype);
  // Herda uma referência da função DataBase.
  DataBase.prototype.constructor = DataBase;

 /**
  * Método que retorna url para o Cloud de onde encontra-se o CouchDB.
  *
  * @method _remoteCouch
  * @param {String} url - URL do Cloud.
  * @param {String} dataBaseName - Nome do banco de dados.
  * @return {String} Retorna a url do Cloud com usuário, senha e nome de banco de dados.
  */
  var _remoteCouch = function(url, dataBaseName) {
  	//return 'https://' + USUARIO + ':' + SENHA + '@' + USUARIO + '.' + url + '/' + dataBaseName;
    return 'http://'+ url + '/' + dataBaseName;
  };
  
  /**
   * Método para inserir novas informações no banco de dados. 
   *
   * @method inserir
   * @param {Object} doc - Documento (objeto) com informações para ser salva no banco de dados.
   */
  DataBase.prototype.inserir = function(doc) {
    this.put(doc, function(err, res) {
      if (!err) {
        console.info('Informações salvas no banco de dados com sucesso!');
      }
      else {
        console.error(err.message);
      }
    });
  };
  
/**
   * Método para recuperar informações no banco de dados. 
   *
   * @method recuperar
   * @param {Int} objId - _id do objeto salvo no banco de dados.
   */
  DataBase.prototype.recuperarPorId = function(objId) {
    this.get(objId, function(err, res) {
      if (!err) {
        console.info('Informações recuperadas no banco de dados com sucesso!');
        return res;
      }
      else {
        console.error(err.message);
      }  
    });
  };
  
  DataBase.prototype.recuperarTodos = function(callback) {
    this.allDocs({include_docs: true}, function(err, response){
        if(!err){
          console.info('Informações recuperadas no banco de dados com sucesso!');
          callback(response);
        }
        else {
          console.error(err.message);
        }
    });
  };
    
  DataBase.prototype.recuperarUsuarioPorMatriculaSenha = function(usuario){
      var retorno = null;
      cartpol.bancoDeDados.usuarios.forEach(function(element, index, array){
        if (array[index].matricula == usuario.matricula && array[index].senha == usuario.senha) {
          retorno = array[index];
        }
      });
      return retorno;
  };  

  /**
   * Método que verifica conectividade com a internet e sincroniza os dados armazenadas 
   * localmente para o servidor Cloud e vice-versa.
   *
   * @method sincronizarBancoDeDados
   * @param {String} url  - URL do Cloud.
   * @param {Object} opts - Se for true, começa a subscrição de futuras mudanças no 
   *                        banco de dados de origem e continuar replicá-los.
   */
  DataBase.prototype.sincronizarBancoDeDados = function(url, opts) {
    var self = this;
  	$(window).on('online', function() {

      //TODO - GAMBIS REMOVERs 
      toolkit.atualizarStatus(true);

  	    console.log('Estou online, sincronizando o banco de dados ...   ');
  		self.replicate.to(_remoteCouch(url, self.dataBaseName), opts);
  		self.replicate.from(_remoteCouch(url, self.dataBaseName), opts);
  		console.log('Pronto !');
  	}).on('offline', function() {
  		console.log('Offline :(');

        //TODO - GAMBIS REMOVERs 
      toolkit.atualizarStatus(false);
  	});
  };

  return DataBase;
});