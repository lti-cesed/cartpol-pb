var toolkit = {
    palavrasPorGenero: {
      'nascido': ['nascido', 'nascida'],
      'filho': ['filho', 'filha']
    },
    fillElementWithTemplate : function(element_id, template_name, values, callback) {
        require(['hbs!templates/' + template_name], function(template) {
            $("#" + element_id).html(template(values));
            if (callback) {
                callback();
            }
        });
    },
    getValor: function(objeto, propriedade) {
      return objeto && objeto[propriedade] ? objeto[propriedade] : '';
    },
    criaBOParaFormulario : function(dados) {
      return {
        _id:            dados && dados._id ? dados._id : null,
        _rev:           dados && dados._rev ? dados._rev : null,
        nome:           toolkit.getValor(dados, 'nome'),
        dataNascimento: toolkit.getValor(dados, 'dataNascimento'),
        nomeMae:        toolkit.getValor(dados, 'nomeMae'),
        nomePai:        toolkit.getValor(dados, 'nomePai')
      };
    },
    criarPessoaPeloFormulario: function(prefix) {
      return new cartpol.entidades.Pessoa({
        nome          : $("#input" + prefix.capitalize() + "Nome").val(),
        nascimento    : $("#input" + prefix.capitalize() + "Nascimento").val(),
        cpf           : $("#input" + prefix.capitalize() + "Cpf").val(),
        sexo          : $("#input" + prefix.capitalize() + "Sexo").val(),
        telefone      : $("#input" + prefix.capitalize() + "Telefone").val(),
        celular       : $("#input" + prefix.capitalize() + "Celular").val(),
        identificacao : $("#input" + prefix.capitalize() + "Id").val(),
        profissao     : $("#input" + prefix.capitalize() + "Profissao").val(),
        estadoCivil   : $("#input" + prefix.capitalize() + "EstadoCivil").val(),
        escolaridade  : $("#input" + prefix.capitalize() + "Escolaridade").val(),
        pai           : $("#input" + prefix.capitalize() + "Pai").val(),
        mae           : $("#input" + prefix.capitalize() + "Mae").val(),
        naturalidade  : $("#input" + prefix.capitalize() + "Naturalidade").val(),
        nacionalidade : $("#input" + prefix.capitalize() + "Nacionalidade").val(),
        endereco      : $("#input" + prefix.capitalize() + "Endereco").val(),
        cep           : $("#input" + prefix.capitalize() + "Cep").val(),
        complemento   : $("#input" + prefix.capitalize() + "Complemento").val(),
        bairro        : $("#input" + prefix.capitalize() + "Bairro").val(),
        cidade        : $("#input" + prefix.capitalize() + "Cidade").val(),
        estado        : $("#input" + prefix.capitalize() + "Estado").val()
      });
    },
    limparFormulario: function(prefix) {
      $("#input" + prefix.capitalize() + "Nome").val("");
      $("#input" + prefix.capitalize() + "Nascimento").val("");
      $("#input" + prefix.capitalize() + "Cpf").val("");
      $("#input" + prefix.capitalize() + "Sexo").val("");
      $("#input" + prefix.capitalize() + "Telefone").val("");
      $("#input" + prefix.capitalize() + "Celular").val("");
      $("#input" + prefix.capitalize() + "Id").val("");
      $("#input" + prefix.capitalize() + "Profissao").val("");
      $("#input" + prefix.capitalize() + "EstadoCivil").val("");
      $("#input" + prefix.capitalize() + "Escolaridade").val("");
      $("#input" + prefix.capitalize() + "Pai").val("");
      $("#input" + prefix.capitalize() + "Mae").val("");
      $("#input" + prefix.capitalize() + "Naturalidade").val("");
      $("#input" + prefix.capitalize() + "Nacionalidade").val("");
      $("#input" + prefix.capitalize() + "Endereco").val("");
      $("#input" + prefix.capitalize() + "Cep").val("");
      $("#input" + prefix.capitalize() + "Complemento").val("");
      $("#input" + prefix.capitalize() + "Bairro").val("");
      $("#input" + prefix.capitalize() + "Cidade").val("");
      $("#input" + prefix.capitalize() + "Estado").val("");
    },
    preencherFormularioPessoa: function(prefix, pessoa) {
      $("#input" + prefix.capitalize() + "Nome").val(pessoa.nome);
      $("#input" + prefix.capitalize() + "Nascimento").val(pessoa.nascimento);
      $("#input" + prefix.capitalize() + "Cpf").val(pessoa.cpf);
      $("#input" + prefix.capitalize() + "Sexo").val(pessoa.sexo);
      $("#input" + prefix.capitalize() + "Telefone").val(pessoa.telefone);
      $("#input" + prefix.capitalize() + "Celular").val(pessoa.celular);
      $("#input" + prefix.capitalize() + "Id").val(pessoa.identificacao);
      $("#input" + prefix.capitalize() + "Profissao").val(pessoa.profissao);
      $("#input" + prefix.capitalize() + "EstadoCivil").val(pessoa.estadoCivil);
      $("#input" + prefix.capitalize() + "Escolaridade").val(pessoa.escolaridade);
      $("#input" + prefix.capitalize() + "Pai").val(pessoa.pai);
      $("#input" + prefix.capitalize() + "Mae").val(pessoa.mae);
      $("#input" + prefix.capitalize() + "Naturalidade").val(pessoa.naturalidade);
      $("#input" + prefix.capitalize() + "Nacionalidade").val(pessoa.nacionalidade);
      $("#input" + prefix.capitalize() + "Endereco").val(pessoa.endereco);
      $("#input" + prefix.capitalize() + "Cep").val(pessoa.cep);
      $("#input" + prefix.capitalize() + "Complemento").val(pessoa.complemento);
      $("#input" + prefix.capitalize() + "Bairro").val(pessoa.bairro);
      $("#input" + prefix.capitalize() + "Cidade").val(pessoa.cidade);
      $("#input" + prefix.capitalize() + "Estado").val(pessoa.estado);
    },
    criarObjetoApreendidoPeloFormulario: function() {
      return new cartpol.entidades.ObjetoApreendido({
        descricao   : $("#inputObjetoDescricao").val(),
        categoria   : $("#inputObjetoCategoria").val(),
        acusado     : $("#inputObjetoAcusado").val(),
        paraEntrega : $("#inputObjetoParaEntrega").prop('checked')
      });
    },
    criarExamePeloFormulario: function() {
        var ex1 = [];
        $('#inputExameRequisicao :checked').each(function() {
            ex1.push($(this).val());
        });
        return new cartpol.entidades.Exame({
            envolvimento  : $("#inputExameEnvolvimento").val(),
            pessoa        : $("#inputExameSolicitar").val(),
            categoria     : $("#inputExameCategoria").val(),
            requisicoes   : ex1
        });
    },
    limparFormularioObjetoApreendido: function() {
      descricao   : $("#inputObjetoDescricao").val("");
      categoria   : $("#inputObjetoCategoria").val("");
      acusado     : $("#inputObjetoAcusado").val("");
      paraEntrega : $("#inputObjetoParaEntrega").prop('checked', false);
    },
    limparFormularioExame: function() {
        $("#inputExameEnvolvimento").prop('selectedIndex',0);
        $("#inputExameAgressao").prop('selectedIndex',0);
        $("#inputExameSolicitar").empty();
        $("#inputExameCategoria").val("");
        $("#inputExameRequisicao").empty();
    },
    preencherFormularioObjetoApreendido: function(objeto) {
      $("#inputObjetoDescricao").val(objeto.descricao);
      $("#inputObjetoCategoria").val(objeto.categoria);
      $("#inputObjetoAcusado").val(objeto.emPoderDe);
      $("#inputObjetoParaEntrega").prop('checked', objeto.paraEntrega);
    },
    preencherFormularioExame: function(exame) {
        $("#inputExameEnvolvimento").val(exame.envolvimento);
        $("#inputExameSolicitar").val(exame.pessoa);
        $("#inputExameCategoria").val(exame.categoria);
        for (i = 0; i < exame.requisicoes.length; i++) {
            $('input[value="' + exame.requisicoes[i] + '"]').prop('checked', true);
        }
    },
    parseDate: function(str) {
      var campos = str.split("/");
      var dia = parseInt(campos[0]);
      var mes = parseInt(campos[1]) - 1; // Em JS os meses começam em 0
      var ano = parseInt(campos[2]);
      return new Date(ano, mes, dia);
    },
    peloGenero: function(pessoa, palavra) {
     var linhaGenero = toolkit.palavrasPorGenero[palavra];
     return (pessoa.sexo === 'Feminino') ? linhaGenero[1] : linhaGenero[0];
    },
    verificarCampoPessoa: function(prefix){
      
      var erros = [];
      var text = "";
      
      //Inicio o plugin de validação
      $("#"+prefix+"_form").validate();
      
      //Verifico se o form é valido
      if ($("#"+prefix+"_form").valid() != true) {
        return "Existem campos inválidos!";
      }
      
      //Verifico se existem campos vazios
      if ($("#input" + prefix.capitalize() + "Cpf" ).val() == ""){
        erros[erros.length] = "Campo Cpf está vazio";
      }
      if ($("#input" + prefix.capitalize() + "Telefone" ).val() == ""){
        erros[erros.length] = "Campo Telefone está vazio";
      }
      if ($("#input" + prefix.capitalize() + "Celular" ).val() == ""){
        erros[erros.length] = "Campo Celular está vazio";
      }
      if ($("#input" + prefix.capitalize() + "Nome" ).val() == ""){
        erros[erros.length] = "Campo Nome está vazio";
      }
      if ($("#input" + prefix.capitalize() + "Nascimento" ).val() == ""){
        erros[erros.length] = "Campo Nascimento está vazio";
      }
      
      if (erros.length > 0){
        for (i = 0; i < erros.length; i++) { 
          text += erros[i] + "\n";
        }    
      }
      return text;
      
    },
      
    deletaObjetoFuncao: function(obj) {
      if (obj.length === undefined) {
        $.each(obj, function(key, val) {
          if (typeof(val) === 'function') {
            delete(obj[key]);
          }
        });
      }
      else {
        for (var i = 0, len = obj.length; i < len; i++) {
          $.each(obj[i], function(key, val) {
            if (typeof(val) === 'function') {
              delete(obj[i][key]);
            }
          });
        }
      }

      return obj;
    },
    atualizarStatus: function(online){
      if (online){
        $("#status_sistema").html('<div class="ball on"></div><small class="status">ON</small>');
      }
      else{
        $("#status_sistema").html('<div class="ball off"></div><small class="status">OFF</small>');
      }
    },
    carregarBO: function(id){
        for (var i = cartpol.globals.bos.rows.length - 1; i >= 0; i--) {
          if (cartpol.globals.bos.rows[i].doc._id == id){
            cartpol.controlador.bo.exibirBO(cartpol.globals.bos.rows[i].doc);
          }
        };
    }
};