cartpol.entidades = {
  Pessoa: function(dados) {
    if (dados) {
      this.nome          = dados.nome;
      this.nascimento    = dados.nascimento;
      this.identificacao = dados.identificacao;
      this.cpf           = dados.cpf;
      this.profissao     = dados.profissao;
      this.sexo          = dados.sexo;
      this.escolaridade  = dados.escolaridade;
      this.estadoCivil   = dados.estadoCivil;
      this.pai           = dados.pai;
      this.mae           = dados.mae;
      this.naturalidade  = dados.naturalidade;
      this.nacionalidade = dados.nacionalidade;
      this.telefone      = dados.telefone;
      this.celular       = dados.celular;
      this.endereco      = dados.endereco;
      this.cep           = dados.cep;
      this.complemento   = dados.complemento;
      this.bairro        = dados.bairro;
      this.cidade        = dados.cidade;
      this.estado        = dados.estado;
    }
    
    // Métodos
    this.getIdade = function() {
      if (!this.nascimento) {
        return undefined;
      }
      
      var dataDeNascimento = toolkit.parseDate(this.nascimento);
      var dataAtual        = new Date();
      
      // Subtrai o ano atual do ano que a pessoa nasceu para calcular a idade
      var idade = dataAtual.getFullYear() - dataDeNascimento.getFullYear();
      
      // Porém, se ainda não chegou ao mês do aniversário ...
      if (dataAtual.getMonth() < dataDeNascimento.getMonth()) {
        idade--; // Diminui um ano
      } else if (dataAtual.getMonth() === dataDeNascimento.getMonth()) {
        // Se já chegou ao mês do aniversário, porém, ainda não chegou ao dia ...
        if (dataDeNascimento.getUTCDate() < dataAtual.getUTCDate()) {
          idade--; // Diminui um ano
        }
      }
      
      // Retorna a idade que foi calculada
      return idade;
    };
    
    this.toString = function() {
      var ret = '';
      
      ret += this.nome.toUpperCase();
      if (this.nacionalidade) ret += ', ' + this.nacionalidade.toLowerCase();
      if (this.estadoCivil)   ret += ', ' + this.estadoCivil.toLowerCase();
      if (this.profissao)     ret += ', ' + this.profissao.toUpperCase();
      if (this.naturalidade)  ret += ', ' + this.naturalidade.toLowerCase();
      if (this.nascimento) {
        ret += ', ' + toolkit.peloGenero(this, 'nascido') + ' no dia ' + this.nascimento;
        ret += ', com ' + this.getIdade() + ' anos de idade';
      }
      if (this.sexo) ret += ', do sexo ' + this.sexo.toLowerCase();
      if (this.escolaridade) ret += ', escolaridade: ' + this.escolaridade.toUpperCase();
      if (this.pai || this.mae) {
        ret += ', ' + toolkit.peloGenero(this, 'filho') + ' de ';
        if (this.pai)             ret += this.pai.toUpperCase();
        if (this.pai && this.mae) ret += ' e de ';
        if (this.mae)             ret += this.mae.toUpperCase();
      }
      if (this.identificacao) ret += ', ID: ' + this.identificacao;
      if (this.endereco) {
        ret += ', residente em ' + this.endereco.toUpperCase();
        if (this.complemento) ret += ', ' + this.complemento.toUpperCase();
        if (this.bairro)      ret += ', bairro ' + this.bairro.toUpperCase();
        if (this.cidade)      ret += ', na cidade de ' + this.cidade.toUpperCase();
        if (this.estado)      ret += ', ' + this.estado.toUpperCase();
      }
      if (this.telefone) ret += ', telefone nº ' + this.telefone;
      if (this.celular)  ret += ', celular nº ' + this.celular;
      ret += '.';
      
      return ret;
    };
  },
  ObjetoApreendido: function(dados) {
    if (dados) {
      this.descricao   = dados.descricao;
      this.categoria   = dados.categoria;
      this.emPoderDe   = dados.acusado;
      this.paraEntrega = dados.paraEntrega;
    }
  },
  InformacaoGeral: function(dados)  {
    if (dados){
      this.superintendencia = dados.superintendencia;
      this.dspc = dados.dspc;
      this.delegacia = dados.delegacia;
      this.delegado = dados.delegado;
    }
  },
  Exame: function(dados) {
    if (dados) {
        this.envolvimento = dados.envolvimento;
        this.pessoa = dados.pessoa;
        this.categoria = dados.categoria;
        this.requisicoes = dados.requisicoes;
    }
  },
  BO: function(dados) {
    if (dados) {
      this.historico = dados.historico;
    }
    
    // Atributos padrao do BO
    this.objetosApreendidos = [];
    this.comunicante        = {};
    this.vitimas            = [];
    this.testemunhas        = [];
    this.acusados           = [];
    this.exames             = [];
    this.infoGerais         = {};
    
    // Listeners
    this.acusadosListener = []; // Array com a lista de funções listeners 
                                // que serão chamadas sempre que um acusado 
                                // for adicionado ou removido.
                               
    // Metodos do BO
    this.adicionarAcusadosListener = function(listener) {
      this.acusadosListener.push(listener);
    };
    
    this.adicionarObjetoApreendido = function(objetoApreendido) {
      this.objetosApreendidos.push(objetoApreendido);
    };
    
    this.adicionarVitima = function(vitima) {
      this.vitimas.push(vitima);
    };

    this.adicionarExame = function(exame) {
      this.exames.push(exame);
    };

    this.adicionarTestemunha = function(testemunha) {
      this.testemunhas.push(testemunha);
    };
    
    this.adicionarAcusado = function(acusado) {
      this.acusados.push(acusado);
      this._notificaAcusadosListener();
    };
    
    this.atualizarAcusado = function(indice, acusado) {
      this.acusados[indice] = acusado;
      this._notificaAcusadosListener();
    };
    
    this.excluirAcusado = function(indice) {
      this.acusados.splice(indice, 1);
      this._notificaAcusadosListener();
    };
    
    // Métodos privados
    this._notificaAcusadosListener = function() {
      for (var i = 0; i < this.acusadosListener.length; i++) {
        var listener = this.acusadosListener[i];
        listener();
      }
    };
  },
  Inquerito: function(dados) {
    if (dados) {
        this.historico = dados.historico;
    }

    // Atributos padrao do Iquerito
    this.objetosApreendidos = [];
    this.comunicante        = {};
    this.vitimas            = [];
    this.testemunhas        = [];
    this.acusados           = [];
    this.exames             = [];

    // Listeners
    this.acusadosListener = []; // Array com a lista de funções listeners
    // que serão chamadas sempre que um acusado
    // for adicionado ou removido.

    // Metodos do Iquerito
    this.adicionarAcusadosListener = function(listener) {
        this.acusadosListener.push(listener);
    };

    this.adicionarObjetoApreendido = function(objetoApreendido) {
        this.objetosApreendidos.push(objetoApreendido);
    };

    this.adicionarVitima = function(vitima) {
        this.vitimas.push(vitima);
    };

    this.adicionarExame = function(exame) {
        this.exames.push(exame);
    };

    this.adicionarTestemunha = function(testemunha) {
        this.testemunhas.push(testemunha);
    };

    this.adicionarAcusado = function(acusado) {
        this.acusados.push(acusado);
        this._notificaAcusadosListener();
    };

    this.atualizarAcusado = function(indice, acusado) {
        this.acusados[indice] = acusado;
        this._notificaAcusadosListener();
    };

    this.excluirAcusado = function(indice) {
        this.acusados.splice(indice, 1);
        this._notificaAcusadosListener();
    };

    // Métodos privados
    this._notificaAcusadosListener = function() {
        for (var i = 0; i < this.acusadosListener.length; i++) {
            var listener = this.acusadosListener[i];
            listener();
        }
    };
  },
  TCO: function(dados) {
    if (dados) {
        this.historico = dados.historico;
    }

    // Atributos padrao do Iquerito
    this.objetosApreendidos = [];
    this.comunicante        = {};
    this.vitimas            = [];
    this.testemunhas        = [];
    this.acusados           = [];
    this.exames             = [];

    // Listeners
    this.acusadosListener = []; // Array com a lista de funções listeners
    // que serão chamadas sempre que um acusado
    // for adicionado ou removido.

    // Metodos do BO
    this.adicionarAcusadosListener = function(listener) {
        this.acusadosListener.push(listener);
    };

    this.adicionarObjetoApreendido = function(objetoApreendido) {
        this.objetosApreendidos.push(objetoApreendido);
    };

    this.adicionarVitima = function(vitima) {
        this.vitimas.push(vitima);
    };

    this.adicionarExame = function(exame) {
        this.exames.push(exame);
    };

    this.adicionarTestemunha = function(testemunha) {
        this.testemunhas.push(testemunha);
    };

    this.adicionarAcusado = function(acusado) {
        this.acusados.push(acusado);
        this._notificaAcusadosListener();
    };

    this.atualizarAcusado = function(indice, acusado) {
        this.acusados[indice] = acusado;
        this._notificaAcusadosListener();
    };

    this.excluirAcusado = function(indice) {
        this.acusados.splice(indice, 1);
        this._notificaAcusadosListener();
    };

    // Métodos privados
    this._notificaAcusadosListener = function() {
        for (var i = 0; i < this.acusadosListener.length; i++) {
            var listener = this.acusadosListener[i];
            listener();
        }
    };
  },
  APF: function(dados) {
    if (dados) {
        this.historico = dados.historico;
    }

    // Atributos padrao do BO
    this.objetosApreendidos = [];
    this.comunicante        = {};
    this.vitimas            = [];
    this.testemunhas        = [];
    this.acusados           = [];
    this.exames             = [];

    // Listeners
    this.acusadosListener = []; // Array com a lista de funções listeners
    // que serão chamadas sempre que um acusado
    // for adicionado ou removido.

    // Metodos do BO
    this.adicionarAcusadosListener = function(listener) {
        this.acusadosListener.push(listener);
    };

    this.adicionarObjetoApreendido = function(objetoApreendido) {
        this.objetosApreendidos.push(objetoApreendido);
    };

    this.adicionarVitima = function(vitima) {
        this.vitimas.push(vitima);
    };

    this.adicionarExame = function(exame) {
        this.exames.push(exame);
    };

    this.adicionarTestemunha = function(testemunha) {
        this.testemunhas.push(testemunha);
    };

    this.adicionarAcusado = function(acusado) {
        this.acusados.push(acusado);
        this._notificaAcusadosListener();
    };

    this.atualizarAcusado = function(indice, acusado) {
        this.acusados[indice] = acusado;
        this._notificaAcusadosListener();
    };

    this.excluirAcusado = function(indice) {
        this.acusados.splice(indice, 1);
        this._notificaAcusadosListener();
    };

    // Métodos privados
    this._notificaAcusadosListener = function() {
        for (var i = 0; i < this.acusadosListener.length; i++) {
            var listener = this.acusadosListener[i];
            listener();
        }
    };
  },
  PECA: function(dados) {
    if (dados) {
        this.historico = dados.historico;
    }

    // Atributos padrao do BO
    this.objetosApreendidos = [];
    this.comunicante        = {};
    this.vitimas            = [];
    this.testemunhas        = [];
    this.acusados           = [];
    this.exames             = [];

    // Listeners
    this.acusadosListener = []; // Array com a lista de funções listeners
    // que serão chamadas sempre que um acusado
    // for adicionado ou removido.

    // Metodos do BO
    this.adicionarAcusadosListener = function(listener) {
        this.acusadosListener.push(listener);
    };

    this.adicionarObjetoApreendido = function(objetoApreendido) {
        this.objetosApreendidos.push(objetoApreendido);
    };

    this.adicionarVitima = function(vitima) {
        this.vitimas.push(vitima);
    };

    this.adicionarExame = function(exame) {
        this.exames.push(exame);
    };

    this.adicionarTestemunha = function(testemunha) {
        this.testemunhas.push(testemunha);
    };

    this.adicionarAcusado = function(acusado) {
        this.acusados.push(acusado);
        this._notificaAcusadosListener();
    };

    this.atualizarAcusado = function(indice, acusado) {
        this.acusados[indice] = acusado;
        this._notificaAcusadosListener();
    };

    this.excluirAcusado = function(indice) {
        this.acusados.splice(indice, 1);
        this._notificaAcusadosListener();
    };

    // Métodos privados
    this._notificaAcusadosListener = function() {
        for (var i = 0; i < this.acusadosListener.length; i++) {
            var listener = this.acusadosListener[i];
            listener();
        }
    };
  }
};