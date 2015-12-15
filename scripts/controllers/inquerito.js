/*
 * Laboratório de Tecnologia da Informação - LTI - CESED - 2014
 * Todos os direitos reservados
 *
 * Software desenvolvido para a Polícia Civil de Campina Grande - PB
 *
 * Script com as funcoes que implementam o modulo controlador dos Inquéritos
 */
 
cartpol.controlador.inquerito = {
  // Atributos do controlador
  indiceVitimaSelecionada:     false,
  indiceTestemunhaSelecionada: false,
  indiceAcusadoSelecionado:    false,
  indiceObjetoSelecionado:     false,
  indiceExameSelecionado:      false,

  // Métodos
  init: function() {
    // Configuração dos eventos das abas (tabs)
    $(".para_tab_buscar").click(function() { $("#tab_buscar").tab("show"); });
    $(".para_tab_infogerais").click(function() { $("#tab_infogerais").tab("show"); });
    $(".para_tab_vitima").click(function() { $("#tab_vitimas").tab("show"); });
    $(".para_tab_comunicante").click(function() { $("#tab_comunicante").tab("show"); });
    $(".para_tab_testemunha").click(function() { $("#tab_testemunhas").tab("show"); });
    $(".para_tab_acusado").click(function() { $("#tab_acusados").tab("show"); });
    $(".para_tab_objeto").click(function() { $("#tab_objetos").tab("show"); });
    $(".para_tab_concluir").click(function() { $("#tab_concluir").tab("show"); });
    $(".para_tab_exames").click(function() { $("#tab_exames").tab("show"); cartpol.controlador.inquerito.atualizarTabelaDeExames(); });
    $("#tab_exames").click(function() { cartpol.controlador.inquerito.atualizarTabelaDeExames(); }); //ao carregar a tab exames a tabela é atualizada
    
    // Configuração dos eventos dos botões
    $("#botao_adicionar_vitima").click(cartpol.controlador.inquerito.exibirFormularioNovaVitima);
    $("#botao_excluir_vitima").click(cartpol.controlador.inquerito.excluirVitima);
    $("#botao_adicionar_testemunha").click(cartpol.controlador.inquerito.exibirFormularioNovaTestemunha);
    $("#botao_excluir_testemunha").click(cartpol.controlador.inquerito.excluirTestemunha);
    $("#botao_adicionar_acusado").click(cartpol.controlador.inquerito.exibirFormularioNovoAcusado);
    $("#botao_excluir_acusado").click(cartpol.controlador.inquerito.excluirAcusado);
    $("#botao_adicionar_objeto").click(cartpol.controlador.inquerito.exibirFormularioNovoObjeto);
    $("#botao_excluir_objeto").click(cartpol.controlador.inquerito.excluirObjeto);
    $("#botao_gerar_inquerito").click(cartpol.controlador.inquerito.gerarInquerito);
    $("#botao_salvar_inquerito").click(cartpol.controlador.inquerito.salvarInquerito);
    $("#botao_adicionar_exame").click(cartpol.controlador.inquerito.exibirFormularioNovoExame);
    $("#botao_excluir_exame").click(cartpol.controlador.inquerito.excluirExame);

  },
  exibirForm: function() {
    cartpol.globals.iquerito = new cartpol.entidades.Inquerito();
    // Sempre que a lista de acusados for alterada, notificar o combo box de acusados
    cartpol.globals.iquerito.adicionarAcusadosListener(cartpol.controlador.inquerito.atualizarComboAcusados);
    toolkit.fillElementWithTemplate("conteudo", "inquerito/form", {}, cartpol.controlador.inquerito.funcoesForm);
  },
  funcoesForm: function() {
    cartpol.controlador.inquerito.init();
    
    /** 19/08/2014 - wagner.araujo - INICIO **/
    //Validações
    require(['validator'], function() {
        // validate signup form on keyup and submit
        $('form').each(function () {
            $(this).validate();
        });
    });
    /** 19/08/2014 - wagner.araujo - FIM **/
      
    // Vítimas
    $("#tabela_vitimas").hide();
    $("#botao_salvar_vitima").click(cartpol.controlador.inquerito.salvarVitima);

    // Testemunhas
    $("#tabela_testemunhas").hide();
    $("#botao_salvar_testemunha").click(cartpol.controlador.inquerito.salvarTestemunha);

    // Acusados
    $("#tabela_acusados").hide();
    $("#botao_salvar_acusado").click(cartpol.controlador.inquerito.salvarAcusado);
    
    // Objetos Apreendidos
    $("#tabela_objetos").hide();
    $("#botao_salvar_objeto").click(cartpol.controlador.inquerito.salvarObjeto);

    // Exames
    $("#tabela_exames").hide();
    $("#botao_salvar_exame").click(cartpol.controlador.inquerito.salvarExame);


      // Máscaras
    require(['maskedInput'], function(){
      $(".data").mask("99/99/9999");
      $(".hora").mask("99:99");
      $(".cpf").mask("999.999.999-99");
      $(".telefone").mask("(99)9999-9999");
      $(".cep").mask("99999-999");
    });
      
      
  },
  salvarVitima: function() {
    // Cria um objeto vítima a partir dos dados do formulário
    console.log($("#inputVitimaNome").val());
    var vitima = toolkit.criarPessoaPeloFormulario("vitima");
    vitima.declarou = $("#inputDeclarouVitima").val();
    
    // wagner.araujo - 26/08/2014 - Inicio
/*    var erros = toolkit.verificarCampoPessoa("vitima");
    //Verifica se os campos foram preechidos corretamente
    if (erros != null && erros != ""){
      alert(erros);
      return;
    }*/
    // wagner.araujo - 26/08/2014 - Fim

    // Verifica se está editando ou adicionando uma vítima
    if (cartpol.controlador.inquerito.indiceVitimaSelecionada !== false) {
      // Atualiza a vítima selecionada
      cartpol.globals.inquerito.vitimas[cartpol.controlador.inquerito.indiceVitimaSelecionada] = vitima;
    } else {
      // Adiciona a vítima ao Inquerito
      cartpol.globals.inquerito.adicionarVitima(vitima);
    }
    
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceVitimaSelecionada = false;
    toolkit.limparFormulario("vitima");
    $("#inputDeclarouVitima").val("");
    
    // Esconde o formulário
    $("#modal_vitima").modal("hide");
    // Atualiza a tabela de vítimas
    cartpol.controlador.inquerito.atualizarTabelaDeVitimas();
  },
  atualizarTabelaDeVitimas: function() {
    if (cartpol.globals.inquerito.vitimas.length === 0) {
      $("#tabela_vitimas").hide();   // Esconde a tabela de vítimas
      $("#div_zero_vitimas").show(); // Exibe a mensagem de que não há vítimas cadastradas
    } else {
      $("#tabela_vitimas").show();   // Exibe a tabela de vítimas
      $("#div_zero_vitimas").hide(); // Esconde a mensagem de que não há vítimas cadastradas
      
      var tbody = "";
      
      for (var i = 0; i < cartpol.globals.inquerito.vitimas.length; i++) {
        var vitima = cartpol.globals.inquerito.vitimas[i];
        tbody += "<tr class='linhaVitima' data-indice='" + i + "'>";
        tbody += "<td>" + vitima.nome + "</td>";
        tbody += "<td>" + vitima.cpf + "</td>";
        tbody += "</tr>"
      }
      
      $("#corpo_tabela_vitimas").html(tbody);
      $(".linhaVitima").click(function() {
        cartpol.controlador.inquerito.exibirFormularioEditarVitima(parseInt($(this).attr("data-indice")));
      });
    }
  },
  exibirFormularioNovaVitima: function() {
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceVitimaSelecionada = false;
    toolkit.limparFormulario("vitima");
    $("#inputDeclarouVitima").val("");
    
    // Esconde o botão de editar a vítima
    $("#botao_excluir_vitima").hide();
    
    // Exibe o formulário
    $("#modal_vitima").modal("show");
    
    
  },
  exibirFormularioEditarVitima: function(indice) {
    // Obtém a vítima que foi clicada
    cartpol.controlador.inquerito.indiceVitimaSelecionada = indice;
    var vitima = cartpol.globals.inquerito.vitimas[indice];
    
    // Preenche o formulário com os dados da vítima
    toolkit.preencherFormularioPessoa("vitima", vitima);
    $("#inputDeclarouVitima").val(vitima.declarou);

    // Exibe o botão de editar a vítima
    $("#botao_excluir_vitima").show();
    
    // Exibe o formulário
    $("#modal_vitima").modal("show");
  },
  excluirVitima: function() {
    if (confirm("Tem certeza que quer excluir esta vítima ?")) {
      // Exclui a vítima
      cartpol.globals.inquerito.vitimas.splice(cartpol.controlador.inquerito.indiceVitimaSelecionada, 1);
      cartpol.controlador.inquerito.indiceVitimaSelecionada = false;
      
      // Esconde o formulário
      $("#modal_vitima").modal("hide");
      // Atualiza a tabela de vítimas
      cartpol.controlador.inquerito.atualizarTabelaDeVitimas();
    }
  },
  salvarTestemunha: function() {
    // Cria um objeto testemunha a partir dos dados do formulário
    var testemunha = toolkit.criarPessoaPeloFormulario("testemunha");
    testemunha.declarou = $("#inputDeclarouTestemunha").val();
    
    // wagner.araujo - 26/08/2014 - Inicio
    var erros = toolkit.verificarCampoPessoa("testemunha");
    //Verifica se os campos foram preechidos corretamente
    if (erros != ""){
      alert(erros);
      return;
    }
    // wagner.araujo - 26/08/2014 - Fim

    // Verifica se está editando ou adicionando uma testemunha
    if (cartpol.controlador.inquerito.indiceTestemunhaSelecionada !== false) {
      // Atualiza a testemunha selecionada
      cartpol.globals.inquerito.testemunhas[cartpol.controlador.inquerito.indiceTestemunhaSelecionada] = testemunha;
    } else {
      // Adiciona a testemunha ao BO
      cartpol.globals.inquerito.adicionarTestemunha(testemunha);
    }
    
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceTestemunhaSelecionada = false;
    toolkit.limparFormulario("testemunha");
    $("#inputDeclarouTestemunha").val("");
    
    // Esconde o formulário
    $("#modal_testemunha").modal("hide");
    // Atualiza a tabela de testemunhas
    cartpol.controlador.inquerito.atualizarTabelaDeTestemunhas();
  },
  atualizarTabelaDeTestemunhas: function() {
    if (cartpol.globals.inquerito.testemunhas.length === 0) {
      $("#tabela_testemunhas").hide();   // Esconde a tabela de testemunhas
      $("#div_zero_testemunhas").show(); // Exibe a mensagem de que não há testemunhas cadastradas
    } else {
      $("#tabela_testemunhas").show();   // Exibe a tabela de testemunhas
      $("#div_zero_testemunhas").hide(); // Esconde a mensagem de que não há testemunhas cadastradas
      
      var tbody = "";
      
      for (var i = 0; i < cartpol.globals.inquerito.testemunhas.length; i++) {
        var testemunha = cartpol.globals.inquerito.testemunhas[i];
        tbody += "<tr class='linhaTestemunha' data-indice='" + i + "'>";
        tbody += "<td>" + testemunha.nome + "</td>";
        tbody += "<td>" + testemunha.cpf + "</td>";
        tbody += "</tr>"
      }
      
      $("#corpo_tabela_testemunhas").html(tbody);
      $(".linhaTestemunha").click(function() {
        cartpol.controlador.inquerito.exibirFormularioEditarTestemunha(parseInt($(this).attr("data-indice")));
      });
    }
  },
  exibirFormularioNovaTestemunha: function() {
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceTestemunhaSelecionada = false;
    toolkit.limparFormulario("testemunha");
    $("#inputDeclarouTestemunha").val("");
    
    // Esconde o botão de editar a testemunha
    $("#botao_excluir_testemunha").hide();
    
    // Exibe o formulário
    $("#modal_testemunha").modal("show");
  },
  exibirFormularioEditarTestemunha: function(indice) {
    // Obtém a testemunha que foi clicada
    cartpol.controlador.inquerito.indiceTestemunhaSelecionada = indice;
    var testemunha = cartpol.globals.inquerito.testemunhas[indice];
    
    // Preenche o formulário com os dados da testemunha
    toolkit.preencherFormularioPessoa("testemunha", testemunha);
    $("#inputDeclarouTestemunha").val(testemunha.declarou);

    // Exibe o botão de editar a testemunha
    $("#botao_excluir_testemunha").show();
    
    // Exibe o formulário
    $("#modal_testemunha").modal("show");
  },
  excluirTestemunha: function() {
    if (confirm("Tem certeza que quer excluir esta testemunha ?")) {
      // Exclui a testemunha
      cartpol.globals.inquerito.testemunhas.splice(cartpol.controlador.inquerito.indiceTestemunhaSelecionada, 1);
      cartpol.controlador.inquerito.indiceTestemunhaSelecionada = false;
      
      // Esconde o formulário
      $("#modal_testemunha").modal("hide");
      // Atualiza a tabela de testemunhas
      cartpol.controlador.inquerito.atualizarTabelaDeTestemunhas();
    }
  },
  salvarAcusado: function() {
    // Cria um objeto acusado a partir dos dados do formulário
    var acusado = toolkit.criarPessoaPeloFormulario("acusado");
    acusado.declarou = $("#inputDeclarouAcusado").val();
    
        
    // wagner.araujo - 26/08/2014 - Inicio
    var erros = toolkit.verificarCampoPessoa("acusado");
    //Verifica se os campos foram preechidos corretamente
    if (erros != ""){
      alert(erros);
      return;
    }
    // wagner.araujo - 26/08/2014 - Fim
                     

    // Verifica se está editando ou adicionando um acusado
    if (cartpol.controlador.inquerito.indiceAcusadoSelecionado !== false) {
      // Atualiza o acusado selecionada
      cartpol.globals.inquerito.atualizarAcusado(cartpol.controlador.bo.indiceAcusadoSelecionado, acusado);
    } else {
      // Adiciona o acusado ao BO
      cartpol.globals.inquerito.adicionarAcusado(acusado);
    }
    
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceAcusadoSelecionado = false;
    toolkit.limparFormulario("acusado");
    $("#inputDeclarouAcusado").val("");
    
    // Esconde o formulário
    $("#modal_acusado").modal("hide");
    // Atualiza a tabela de acusados
    cartpol.controlador.inquerito.atualizarTabelaDeAcusados();
  },
  atualizarTabelaDeAcusados: function() {
    if (cartpol.globals.inquerito.acusados.length === 0) {
      $("#tabela_acusados").hide();   // Esconde a tabela de acusados
      $("#div_zero_acusados").show(); // Exibe a mensagem de que não há acusados cadastrados
    } else {
      $("#tabela_acusados").show();   // Exibe a tabela de acusados
      $("#div_zero_acusados").hide(); // Esconde a mensagem de que não há acusados cadastrados
      
      var tbody = "";
      
      for (var i = 0; i < cartpol.globals.inquerito.acusados.length; i++) {
        var acusado = cartpol.global.inquerito.acusados[i];
        tbody += "<tr class='linhaAcusado' data-indice='" + i + "'>";
        tbody += "<td>" + acusado.nome + "</td>";
        tbody += "<td>" + acusado.cpf + "</td>";
        tbody += "</tr>"
      }
      
      $("#corpo_tabela_acusados").html(tbody);
      $(".linhaAcusado").click(function() {
        cartpol.controlador.inquerito.exibirFormularioEditarAcusado(parseInt($(this).attr("data-indice")));
      });
    }
  },
  exibirFormularioNovoAcusado: function() {
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceAcusadoSelecionado = false;
    toolkit.limparFormulario("acusado");
    $("#inputDeclarouAcusado").val("");
    
    // Esconde o botão de editar o acusado
    $("#botao_excluir_acusado").hide();
    
    // Exibe o formulário
    $("#modal_acusado").modal("show");
    

  },
  exibirFormularioEditarAcusado: function(indice) {
    // Obtém o acusado que foi clicado
    cartpol.controlador.inquerito.indiceAcusadoSelecionado = indice;
    var acusado = cartpol.globals.inquerito.acusados[indice];
    
    // Preenche o formulário com os dados do acusado
    toolkit.preencherFormularioPessoa("acusado", acusado);
    $("#inputDeclarouAcusado").val(acusado.declarou);

    // Exibe o botão de editar o acusado
    $("#botao_excluir_acusado").show();
    
    // Exibe o formulário
    $("#modal_acusado").modal("show");
  },
  excluirAcusado: function() {
    if (confirm("Tem certeza que quer excluir este acusado ?")) {
      // Exclui o acusado
      cartpol.globals.inquerito.excluirAcusado(cartpol.controlador.inquerito.indiceAcusadoSelecionado);
      cartpol.controlador.inquerito.indiceAcusadoSelecionado = false;
      
      // Esconde o formulário
      $("#modal_acusado").modal("hide");
      // Atualiza a tabela de acusados
      cartpol.controlador.inquerito.atualizarTabelaDeAcusados();
    }
  },
  salvarObjeto: function() {
    // Cria um objeto apreendido a partir dos dados do formulário
    var objeto = toolkit.criarObjetoApreendidoPeloFormulario();

    // Verifica se está editando ou adicionando um objeto
    if (cartpol.controlador.inquerito.indiceObjetoSelecionado !== false) {
      // Atualiza o acusado selecionada
      cartpol.globals.inquerito.objetosApreendidos[cartpol.controlador.inquerito.indiceObjetoSelecionado] = objeto;
    } else {
      // Adiciona o objeto apreendido ao BO
      cartpol.globals.inquerito.adicionarObjetoApreendido(objeto);
    }
    
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceObjetoSelecionado = false;
    toolkit.limparFormularioObjetoApreendido();
    
    // Esconde o formulário
    $("#modal_objeto").modal("hide");
    // Atualiza a tabela de objetos apreendidos
    cartpol.controlador.inquerito.atualizarTabelaDeObjetos();
  },
  atualizarTabelaDeObjetos: function() {
    if (cartpol.globals.inquerito.objetosApreendidos.length === 0) {
      $("#tabela_objetos").hide();   // Esconde a tabela de objetos apreendidos
      $("#div_zero_objetos").show(); // Exibe a mensagem de que não há objetos apreendidos cadastrados
    } else {
      $("#tabela_objetos").show();   // Exibe a tabela de objetos apreendidos
      $("#div_zero_objetos").hide(); // Esconde a mensagem de que não há objetos apreendidos cadastrados
      var tbody = "";
      for (var i = 0; i < cartpol.globals.inquerito.objetosApreendidos.length; i++) {
        var objeto = cartpol.globals.inquerito.objetosApreendidos[i];
        tbody += "<tr class='linhaObjeto' data-indice='" + i + "'>";
        tbody += "<td>" + objeto.categoria + "</td>";
        tbody += "<td>" + objeto.emPoderDe + "</td>";
        tbody += "<td><button type='button' class='btn btn-primary botao-prox botao-gerar-entrega' id='bge"+i+"'>Entrega</button><button type='button' class='btn btn-primary botao-prox botao-gerar-apreensao'>Apreensão</button></td>";
        tbody += "</tr>"
      }
      $("#corpo_tabela_objetos").html(tbody);
      for (var i = 0; i < cartpol.globals.inquerito.objetosApreendidos.length; i++) {
        $("#bge"+i).hide();
        var objeto = cartpol.globals.inquerito.objetosApreendidos[i];
        if(objeto.paraEntrega == true){
            $("#bge"+i).show();
        }
      }
      $(".linhaObjeto").click(function() {
        cartpol.controlador.inquerito.exibirFormularioEditarObjeto(parseInt($(this).attr("data-indice")));
      });
      $(".linhaObjeto").delegate('button[class~="botao-gerar-entrega"]', 'click', function(e){
        e.stopImmediatePropagation();
        data = new Date;
        new DocxGen().loadFromFile("modelos/objeto/entrega.docx", {async: true}).success(function(doc) {
          doc.setTags({
              "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
              "dspc":             cartpol.globals.informacaoGeral.dspc,
              "delegacia":        cartpol.globals.informacaoGeral.delegacia,
              "delegado":         cartpol.globals.informacaoGeral.delegado,
              "data":             data.getDate()+"/"+(parseInt(data.getMonth())+1)+"/"+data.getFullYear()

          }); //set the templateVariables
          doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
          doc.output(); //Output the document using Data-URI
        });

      });
      $(".linhaObjeto").delegate('button[class~="botao-gerar-apreensao"]', 'click', function(e){
        e.stopImmediatePropagation();
        data = new Date;
        new DocxGen().loadFromFile("modelos/objeto/apreensao.docx", {async: true}).success(function(doc) {
          doc.setTags({
              "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
              "dspc":             cartpol.globals.informacaoGeral.dspc,
              "delegacia":        cartpol.globals.informacaoGeral.delegacia,
              "delegado":         cartpol.globals.informacaoGeral.delegado,
              "data":             data.getDate()+"/"+(parseInt(data.getMonth())+1)+"/"+data.getFullYear()

          }); //set the templateVariables
          doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
          doc.output(); //Output the document using Data-URI
        });
      });

    }
  },
  exibirFormularioNovoObjeto: function() {
    // Limpa o formulário
    cartpol.controlador.inquerito.indiceObjetoSelecionado = false;
    toolkit.limparFormularioObjetoApreendido();
    
    // Esconde o botão de excluir o objeto apreendido
    $("#botao_excluir_objeto").hide();
    
    // Exibe o formulário
    $("#modal_objeto").modal("show");
  },
  exibirFormularioEditarObjeto: function(indice) {
    // Obtém o objeto apreendido que foi clicado
    cartpol.controlador.inquerito.indiceObjetoSelecionado = indice;
    var objeto = cartpol.globals.inquerito.objetosApreendidos[indice];
    
    // Preenche o formulário com os dados do objeto apreendido
    toolkit.preencherFormularioObjetoApreendido(objeto);

    // Exibe o botão de excluir o objeto apreendido
    $("#botao_excluir_objeto").show();
    
    // Exibe o formulário
    $("#modal_objeto").modal("show");
  },
  excluirObjeto: function() {
    if (confirm("Tem certeza que quer excluir este objeto apreendido ?")) {
      // Exclui o objeto apreendido
      cartpol.globals.inquerito.objetosApreendidos.splice(cartpol.controlador.inquerito.indiceObjetoSelecionado, 1);
      cartpol.controlador.inquerito.indiceObjetoSelecionado = false;
      
      // Esconde o formulário
      $("#modal_objeto").modal("hide");
      // Atualiza a tabela de objetos apreendidos
      cartpol.controlador.inquerito.atualizarTabelaDeObjetos();
    }
  },
  salvarInfoGerais: function() {
    var infoGerais = {
      versando : $('#inputInfoGeraisVersando').val(),
      dataFato : $('#inputInfoGeraisDataFato').val(),
      horaFato : $('#inputInfoGeraisHoraFato').val(),
      localFato: $('#inputInfoGeraisLocalFato').val()
    };

    return infoGerais;
  },
  // Inicio Exame - Atylla
  exibirFormularioNovoExame: function() {
    cartpol.controlador.inquerito.indiceExameSelecionado = false;
    // Limpa o formulário
    toolkit.limparFormularioExame();
    // Esconde o botão de excluir exame
    $("#botao_excluir_exame").hide();
    // Campo de texto somente leitura
    //$("#inputExameLista").attr('readonly','readonly');
    //$(".itemCheckBox").hide();
    //$('#HIV, label[for="HIV"]').show();

    // Exibe o formulário
    $("#modal_exame").modal("show");
    cartpol.controlador.inquerito.atualizarComboSolicitar();
    cartpol.controlador.inquerito.atualizarCheckBoxExame();
  },
  salvarExame: function() {
        // Cria um objeto vítima a partir dos dados do formulário
        var exame = toolkit.criarExamePeloFormulario();

        // Verifica se está editando ou adicionando uma vítima
        if (cartpol.controlador.inquerito.indiceExameSelecionado !== false) {
            // Atualiza o exame selecionado
            cartpol.globals.inquerito.exames[cartpol.controlador.inquerito.indiceExameSelecionado] = exame;
        } else {
            // Adiciona o exame ao BO
            cartpol.globals.inquerito.adicionarExame(exame);
        }

        // Limpa o formulário
        cartpol.controlador.inquerito.indiceExameSelecionado = false;
        toolkit.limparFormularioExame();

        // Esconde o formulário
        $("#modal_exame").modal("hide");
        // Atualiza a tabela de exames
        cartpol.controlador.inquerito.atualizarTabelaDeExames();
    },
  exibirFormularioEditarExame: function(indice) {
    // Obtém o exame que foi clicado
    cartpol.controlador.inquerito.indiceExameSelecionado = indice;
    var exame = cartpol.globals.inquerito.exames[indice];

    // Limpa o formulário
    toolkit.limparFormularioExame();

    // Exibe o botão de excluir o exame
    $("#botao_excluir_exame").show();

      // Exibe o formulário
    $("#modal_exame").modal("show");


    // Preenche o formulário com os dados do exame
    toolkit.preencherFormularioExame(exame);
    cartpol.controlador.inquerito.atualizarComboSolicitar();
    cartpol.controlador.inquerito.atualizarCheckBoxExame();
    toolkit.preencherFormularioExame(exame);
  },
  excluirExame: function() {
        if (confirm("Tem certeza que quer excluir este exame ?")) {
            // Exclui o exame
            cartpol.globals.inquerito.exames.splice(cartpol.controlador.inquerito.indiceExameSelecionado, 1);
            cartpol.controlador.inquerito.indiceExameSelecionado = false;
            // Esconde o formulário
            $("#modal_exame").modal("hide");
            // Atualiza a tabela de exames
            cartpol.controlador.inquerito.atualizarTabelaDeExames();
        }
    },
  gerarRequisicao: function() {
        data = new Date;
        new DocxGen().loadFromFile("modelos/requisicoes/MetaResiEntor.docx", {async: true}).success(function(doc) {
            doc.setTags({
                "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
                "dspc":             cartpol.globals.informacaoGeral.dspc,
                "delegacia":        cartpol.globals.informacaoGeral.delegacia,
                "delegado":         cartpol.globals.informacaoGeral.delegado,
                "data":             data.getDate()+"/"+(parseInt(data.getMonth())+1)+"/"+data.getFullYear()

            }); //set the templateVariables
            doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
            doc.output(); //Output the document using Data-URI
        });
    },
//  gerarRequisicao: function(indice) {
//      exame = cartpol.globals.bo.exames[indice];
//      for (i = 0; i < exame.requisicoes.length; i++){
//            console.log(exame.requisicoes[i]);
//            switch (exame.requisicoes[i]) {
//                case "CONSTATAÇÃO DE ALTERAÇÃO EM ARMA DE FOGO":
//                    // Emite o documento
//                    setTimeout(function(){
//                        new DocxGen().loadFromFile("modelos/requisicoes/objeto/AArma.docx", {async: true}).success(function(doc) {
//                            doc.setTags({
//                                "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                                "dspc":             cartpol.globals.informacaoGeral.dspc,
//                                "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                                "delegado":         cartpol.globals.informacaoGeral.delegado
//                            }); //set the templateVariables
//                            doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                            doc.output(); //Output the document using Data-URI
//                        });
//                    },1000);
//                    break;
//                case "BALÍSTICO EM ESTOJO":
//                    setTimeout(function(){
//                        // Emite o documento
//                        new DocxGen().loadFromFile("modelos/requisicoes/objeto/BEstojo.docx", {async: true}).success(function(doc) {
//                            doc.setTags({
//                                "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                                "dspc":             cartpol.globals.informacaoGeral.dspc,
//                                "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                                "delegado":         cartpol.globals.informacaoGeral.delegado
//                            }); //set the templateVariables
//                            doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                            doc.output(); //Output the document using Data-URI
//                        });
//                    },1000);
//                    break;
//                case "BALÍSTICO EM PROJÉTIL DEFLAGRADO":
//                    // Emite o documento
//                    setTimeout(function(){
//                        new DocxGen().loadFromFile("modelos/requisicoes/objeto/BProjetil.docx", {async: true}).success(function(doc) {
//                            doc.setTags({
//                                "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                                "dspc":             cartpol.globals.informacaoGeral.dspc,
//                                "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                                "delegado":         cartpol.globals.informacaoGeral.delegado
//                            }); //set the templateVariables
//                            doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                            doc.output(); //Output the document using Data-URI
//                        });
//                    },1000);
//                    break;
//                case "EFICIÊNCIA DE ARMA DE FOGO":
//                    // Emite o documento
//                    setTimeout(function(){
//                        new DocxGen().loadFromFile("modelos/requisicoes/objeto/EArma.docx", {async: true}).success(function(doc) {
//                            doc.setTags({
//                                "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                                "dspc":             cartpol.globals.informacaoGeral.dspc,
//                                "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                                "delegado":         cartpol.globals.informacaoGeral.delegado
//                            }); //set the templateVariables
//                            doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                            doc.output(); //Output the document using Data-URI
//                        });
//                    },1000);
//                    break;
//                case "QUÍMICO METALOGRÁFICO":
//                    // Emite o documento
//                        new DocxGen().loadFromFile("modelos/requisicoes/objeto/QMetalografico.docx", {async: true}).success(function(doc) {
//                        doc.setTags({
//                            "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                            "dspc":             cartpol.globals.informacaoGeral.dspc,
//                            "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                            "delegado":         cartpol.globals.informacaoGeral.delegado
//                        }); //set the templateVariables
//                        doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                        doc.output(); //Output the document using Data-URI
//                    });
//                    break;
//                case "RESIDUOGRÁFICO":
//                    // Emite o documento
//                    new DocxGen().loadFromFile("modelos/requisicoes/objeto/Residuografico.docx", {async: true}).success(function(doc) {
//                        doc.setTags({
//                            "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                            "dspc":             cartpol.globals.informacaoGeral.dspc,
//                            "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                            "delegado":         cartpol.globals.informacaoGeral.delegado
//                        }); //set the templateVariables
//                        doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                        doc.output(); //Output the document using Data-URI
//                    });
//                    break;
//                case "VERIFICAÇÃO DE SUBSTÂNCIA ENTORPECENTE":
//                    // Emite o documento
//                    new DocxGen().loadFromFile("modelos/requisicoes/objeto/VSEntorpecente.docx", {async: true}).success(function(doc) {
//                        doc.setTags({
//                            "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
//                            "dspc":             cartpol.globals.informacaoGeral.dspc,
//                            "delegacia":        cartpol.globals.informacaoGeral.delegacia,
//                            "delegado":         cartpol.globals.informacaoGeral.delegado
//                        }); //set the templateVariables
//                        doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
//                        doc.output(); //Output the document using Data-URI
//                    });
//                    break;
//                default:
//                    break;
//            }
//        }
//  },
  atualizarCheckBoxExame: function() {
      function criarChecBox(opcoes){
          prefixo = "#inputExameRequisicao";
          $(prefixo).empty();
          for (i = 0; i < opcoes.length; i++) {
              var opcao = opcoes[i];
              $('<input />', { type: 'checkbox', value: opcao }).appendTo(prefixo);
              $('<label />', { 'for': opcao, text: opcao }).appendTo(prefixo);
              $('<br>').appendTo(prefixo);
          }
      }
      function atualiza(){
          switch($('select#inputExameCategoria option:selected').val()){
                case "Medicina e Odontologia Legal":
                    criarChecBox(["Pericial Tanatoscópico ou Cadavérico","Pericial Tanatoscópico ou Cadavérico de Exumação","Pericial Tanatoscópico ou Cadavérico Antropológico","Pericial Traumatológico (Corpo de Delito)","Pericial Traumatológico (DPVAT)","Pericial Traumatológico Potencialmente sem Lesão Física","Pericial Traumatológico de Sanidade ou Complementar","Pericial Traumatológico Odonto-legal","Pericial Traumatológico Sexológico","Pericial de Estimativa de Idade Odonto-legal","Pericial de Estimativa de Idade Médico-legal","Pericial Médico-legal de Embriaguez"]);
                    break;
                case "Criminalística":
                    criarChecBox(["Pericial em Local de Morte Violenta","Pericial em Local de Morte Violenta Suspeita","Pericial em Local de Acidente de Transito com Vítima","Pericial em Local de Crime contra o Patrimônio","Pericial de Levantamento de Impressões Digitais","Pericial de Analise de Impressões Digitais","Pericial de Confronto de Impressões Digitais","Pericial de Reprodução Simulada","Pericial em Local de Crime contra a Fauna","Pericial em Local de Crime contra a Flora","Pericial em constatação de Poluição","Pericial em Local de Crime contra o Patrimônio Cultural","Pericial de Autenticidade Documental","Pericial de Integridade Documental","Pericial de Autenticidade Gráfica","Pericial de Autoria Gráfica","Pericial Contábil","Pericial de Analise de Conteúdo em registros de áudio","Pericial de Analise de Conteúdo em registros de imagens","Pericial de Verificação de Edição em registros de áudio","Pericial de Verificação de Locutor","Pericial em Dispositivos de Armazenamento","Pericial em Dispositivos de Telefonia","Pericial em Dispositivos Eletrônicos","Pericial de Identificação Veicular","Pericial de Eficiência de Disparo de Arma de Fogo","Pericial de Eficiência de Munição","Pericial de Confronto Balístico","Pericial de Descrição de Material Bélico ou Balístico"]);
                    break;
                case "Laboratório Forense":
                    criarChecBox(["Pericial de Constatação de Drogas","Pericial Definitivo de Drogas","Pericial de Identificação Química de Substancia","Pericial de Dosagem Alcoólica in vivo","Pericial de Dosagem Alcoólica post-mortem","Pericial Toxicológico in vivo","Pericial Toxicológico post-mortem","Pericial de Residuográfica de Chumbo","Pericial de Constatação de Material Explosivo","Pericial de Constatação de Substancia Inflamável","Pericial Químico Metalográfico em arma de fogo","Pericial de Pesquisa de Sangue Humano","Pericial de Pesquisa de Antígeno Prostático Especifico (PSA)","Pericial de Constatação de Pelo Humano","Pericial de DNA para Confronto Genético","Pericial de DNA para Crime Sexual","Pericial de DNA para Identificação Humana"]);
                    break;
                default:
                    $("#inputExameRequisicao").val("");
                    break;
          }
      }
        $('#inputExameCategoria').change(function() {
            atualiza();
        });
        atualiza();
    },
  atualizarTabelaDeExames: function() {
        if (cartpol.globals.inquerito.exames.length === 0) {
            $("#tabela_exames").hide();   // Esconde a tabela de exames
            $("#div_zero_exames").show(); // Exibe a mensagem de que não há exames cadastrados
        } else {
            $("#tabela_exames").show();   // Exibe a tabela de exames
            $("#div_zero_exames").hide(); // Esconde a mensagem de que não há exames cadastrados

            var tbody = "";

            for (var i = 0; i < cartpol.globals.inquerito.exames.length; i++) {
                var nome = null;
                var exame = cartpol.globals.inquerito.exames[i];
                switch(exame.envolvimento){
                    case "Vítima":
                        nome = cartpol.globals.inquerito.vitimas[exame.pessoa].nome;
                        break;
                    case "Comunicante":
                        nome = toolkit.criarPessoaPeloFormulario("comunicante").nome;
                        break;
                    case "Acusado":
                        nome = cartpol.globals.inquerito.acusados[exame.pessoa].nome;
                        break;
                    default:
                        break;
                }
                tbody += "<tr class='linhaExame' data-indice='" + i + "'>";
                tbody += "<td>" + nome + "</td>";
                tbody += "<td>" + exame.categoria + "</td>";
                tbody += "<td><button type='button' class='btn btn-primary botao-prox' id='botao_gerar_requisicao'>Gerar</button></td>";
                tbody += "</tr>"
            }
            $("#corpo_tabela_exames").html(tbody);
            $(".linhaExame").click(function() {
                cartpol.controlador.inquerito.exibirFormularioEditarExame(parseInt($(this).attr("data-indice")));
            });
            $(".linhaExame").delegate('button', 'click', function(e){
                e.stopImmediatePropagation();
                //cartpol.controlador.bo.gerarRequisicao(parseInt($(".linhaExame").attr("data-indice")));
                cartpol.controlador.inquerito.gerarRequisicao();
            });

        }
    },
  atualizarComboSolicitar: function() {
        function adicionaOpcoes(campo, lista){
            $(campo).empty();
            if(lista instanceof Array){
                for (var i = 0; i < lista.length; i++) {
                    var pessoa = lista[i];
                    $(campo).append(new Option(pessoa.nome, i));
                }
            } else {
                var pessoa = lista;
                $(campo).append(new Option(pessoa.nome, i));
            }
        }
        function atualiza() {
            switch($('select#inputExameEnvolvimento option:selected').val()){
                case "Vítima":
                    adicionaOpcoes("#inputExameSolicitar", cartpol.globals.inquerito.vitimas);
                    break;
                case "Comunicante":
                    adicionaOpcoes("#inputExameSolicitar", toolkit.criarPessoaPeloFormulario("comunicante"));
                    break;
                case "Acusado":
                    adicionaOpcoes("#inputExameSolicitar", cartpol.globals.inquerito.acusados);
                    break;
                default:
                    break;
            }
        }
        $('#inputExameEnvolvimento').change(function() {
            atualiza();
        });
        atualiza();
    },
  //Fim Exame - Atylla
  gerarInquerito: function() {
    cartpol.globals.inquerito.infoGerais = cartpol.controlador.inquerito.salvarInfoGerais();

    var comunicante = toolkit.criarPessoaPeloFormulario("comunicante");
    comunicante.historico = $("#inputHistoricoComunicante").val();
    cartpol.globals.inquerito.comunicante = comunicante;
    
    // wagner.araujo - 26/08/2014 - Inicio
    var erros = toolkit.verificarCampoPessoa("comunicante");
    //Verifica se os campos foram preechidos corretamente
    if (erros != ""){
      alert(erros);
      return;
    }
    // wagner.araujo - 26/08/2014 - Fim
    
    var dadosComunicante = comunicante.toString();
    
    var dadosVitimas = "";

    for (var i = 0; i < cartpol.globals.inquerito.vitimas.length; i++) {
      var vitima = cartpol.globals.inquerito.vitimas[i];
      if (i > 0) dadosVitimas += ', ';
      dadosVitimas += vitima.toString();
    }

    var dadosTestemunhas = "";
    for (var i = 0; i < cartpol.globals.inquerito.testemunhas.length; i++) {
      var testemunha = cartpol.globals.inquerito.testemunhas[i];
      if (i > 0) dadosTestemunhas += ', ';
      dadosTestemunhas += testemunha.toString();
    }
    
    var dadosAcusados = "";
    for (var i = 0; i < cartpol.globals.inquerito.acusados.length; i++) {
      var acusado = cartpol.globals.inquerito.acusados[i];
      if (i > 0) dadosAcusados += ', ';
      dadosAcusados += acusado.toString();
    }

    // Emite o documento
    new DocxGen().loadFromFile("modelos/INQUERITO.docx", {async: true}).success(function(doc) {
        doc.setTags({
            "superintendencia": cartpol.globals.informacaoGeral.superintendencia,
            "dspc":             cartpol.globals.informacaoGeral.dspc,
            "delegacia":        cartpol.globals.informacaoGeral.delegacia,
            "delegado":         cartpol.globals.informacaoGeral.delegado,
            "sobre":            cartpol.globals.inquerito.infoGerais.versando,
            "datadofato":       cartpol.globals.inquerito.infoGerais.dataFato,
            "horadofato":       cartpol.globals.inquerito.infoGerais.horaFato,
            "localdofato":      cartpol.globals.inquerito.infoGerais.localFato,
            "comunicante":      dadosComunicante,
            "vitimas":          dadosVitimas,
            "testemunhas":      dadosTestemunhas,
            "acusados":         dadosAcusados,
            "historico":        cartpol.globals.inquerito.comunicante.historico,
            "nome_comunicante": cartpol.globals.inquerito.comunicante.nome,
            "exames":           cartpol.controlador.inquerito.getExames

        }); //set the templateVariables
        doc.applyTags(); //apply them (replace all occurences of {first_name} by Hipp, ...)
        doc.output(); //Output the document using Data-URI
    });
  },

  getExames: function() {
    var saida = "";
    for (i = 0; i < cartpol.globals.inquerito.exames.length; i++){
        var nome = null;
        var exame = cartpol.globals.inquerito.exames[i];
        switch(exame.envolvimento){
            case "Vítima":
                nome = cartpol.globals.inquerito.vitimas[exame.pessoa].nome;
                break;
            case "Comunicante":
                nome = toolkit.criarPessoaPeloFormulario("comunicante").nome;
                break;
            case "Acusado":
                nome = cartpol.globals.inquerito.acusados[exame.pessoa].nome;
                break;
            default:
                break;
        }
        saida += nome + ": ";
        for (y = 0; y < exame.requisicoes.length; y++){
            if(y == exame.requisicoes.length-1){
                saida += exame.requisicoes[y];
            }else{
                saida += exame.requisicoes[y] + ", ";
            }

        }
        saida += ";";
    }
    return saida;
  },

  salvarInquerito: function() {
     var id = String(new Date().getTime()),
        infoGerais = [],
        comunicante = toolkit.deletaObjetoFuncao(cartpol.globals.inquerito.comunicante),
        vitimas = [],
        testemunhas = [],
        acusados = [],
        objetosApreendidos = [];
        
    // Salva informações do array em vitimas[]
    cartpol.globals.inquerito.vitimas.forEach(function(arr) {
      vitimas.push(toolkit.deletaObjetoFuncao(arr));
    });

    // Salva informações do array em testemunhas[]
    cartpol.globals.inquerito.testemunhas.forEach(function(arr) {
      testemunhas.push(toolkit.deletaObjetoFuncao(arr));
    });

    // Salva informações do array em acusados[]
    cartpol.globals.inquerito.acusados.forEach(function(arr) {
      acusados.push(toolkit.deletaObjetoFuncao(arr));
    });

    // Salva informações do array em objetosApreendidos[]
    cartpol.globals.inquerito.objetosApreendidos.forEach(function(arr) {
      objetosApreendidos.push(toolkit.deletaObjetoFuncao(arr));
    });

    var doc = {
      _id: id,
      infoGerais: cartpol.globals.inquerito.infoGerais,
      comunicante: comunicante,
      vitimas: vitimas,
      testemunhas: testemunhas,
      acusados: acusados,
      objetosApreendidos: objetosApreendidos
    };

    cartpol.dataBase.inserir(doc);
  },
  // Método listener que será chamado sempre que a lista de acusados do BO for alterada
  atualizarComboAcusados: function() {
    var options = null;
    var selectObjetos = $('#inputObjetoAcusado');
    
    if (selectObjetos.prop) {
      options = selectObjetos.prop('options');
    } else {
      options = selectObjetos.attr('options');
    }
    
    $('option', selectObjetos).remove();
    for (var i = 0; i < cartpol.globals.inquerito.acusados.length; i++) {
      var acusado = cartpol.globals.inquerito.acusados[i];
      options[options.length] = new Option(acusado.nome, acusado.nome);
    }
  }
};