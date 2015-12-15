var cartpol = {
  bancoDeDados: {
    usuarios: [
      {name: 'Administrador', matricula: '1122', senha: 'e10adc3949ba59abbe56e057f20f883e'},
      {name: '1321231124', matricula: 'teste', senha: '202cb962ac59075b964b07152d234b70'}
    ]
  },
  constantes: {
    DATABASE_NAME:  'cartpol',
    DATABASE_CLOUD: 'heroku.cloudant.com',
    DATABASE_OPTS:  {live: true},
    LANGUAGE:       'pt-BR'
  },
  configuraFormatos: function() {
    require(['numeral'], function() {
      numeral.language(cartpol.constantes.LANGUAGE, {
        delimiters: {
          thousands: '.',
          decimal: ','
        }
      });

      numeral.language(cartpol.constantes.LANGUAGE);
    });
  },
  dataBase: null,
  iniciaBancoDeDados: function() {
    require(['dataBase'], function(DataBase){
      cartpol.dataBase = new DataBase(cartpol.constantes.DATABASE_NAME);
      cartpol.dataBase.sincronizarBancoDeDados(cartpol.constantes.DATABASE_CLOUD, cartpol.constantes.DATABASE_OPTS);
      console.info('Banco de Dados Inicializado!');
    });
  },
  inicia: function() {
    cartpol.configuraFormatos();
    cartpol.iniciaBancoDeDados();
    require(['bootbox'], function(bootbox) {
      cartpol.bootbox = bootbox;
    });
  },
  // Módulo responsável por exibir janelas de diálogo
  bootbox: null,
  // Local para armazenar as variaveis globais do projeto
  globals: {
    informacaoGeral :  null,
    bo              :  null,
    tco             :  null,
    inquerito       :  null,
    apf             :  null,
    peca            :  null,
    bos             :  null
  },
  // Local onde os controladores serao definidos
  controlador: {}
};
