// Configuracao das bibliotecas do projeto
require.config({
  // Pasta onde as bibliotecas estao
  baseUrl: 'scripts',
  // Todas as bibliotecas devem ser declaradas aqui
  paths: {
    jquery:                     'lib/jquery-1.11.0.min',
    maskedInput:                'lib/jquery.maskedinput.min',
    validator:                  'lib/jquery.validate',
    offline:                    'lib/offline.min',
    md5:                        'lib/jquery.md5.min',
    handlebars:                 'lib/handlebars-v1.3.0',
    datatables:                 'lib/jquery.dataTables',
    hbs:                        'lib/hbs',
    text:                       'lib/text',
    bootstrap:                  'lib/bootstrap',
    numeral:                    'lib/numeral',
    pouchdb:                    'lib/pouchdb.min',
    bootbox:                    'lib/bootbox.min',
    config:                     'utils/configuraProjeto',
    dataBase:                   'utils/dataBase',
    toolkit:                    'utils/toolkit',
    helpers:                    'helpers/helpers',
    entidades:                  'entidades/entidades',
    loginController:            'controllers/login',
    principalController:        'controllers/principal',
    informacaoGeralController:  'controllers/informacaoGeral',
    boController:               'controllers/bo',
    tcoController:              'controllers/tco',
    inqueritoController:        'controllers/inquerito',
    apfController:              'controllers/apf',
    pecaController:             'controllers/peca'
  },
  // Configuracao do motor de templating
  hbs: {
    templateExtension: ".html"
  },
  // Definicao de dependencias entre as bibliotecas
  shim: {
    datatables:          ['jquery'],
    bootstrap:           ['jquery'],
    bootbox:             ['bootstrap'],
    hbs:                 ['text', 'helpers'],
    entidades:           ['config'],
    loginController:     ['config'],
    principalController: ['config'],
    boController:        ['config'],
    tcoController:       ['config'],
    inqueritoController: ['config'],
    apfController:       ['config'],
    pecaController:      ['config'],
	validator:           ['jquery'],
    md5:                 ['jquery']
  }
});

// Função principal do sistema
require(["bootstrap", "toolkit", "config", "dataBase", "entidades", "loginController", "principalController", "boController", "inqueritoController", "informacaoGeralController", "offline", "tcoController", "apfController", "pecaController"], function() {
  $(function() {
    // Inicia o sistema
    cartpol.inicia();
    // Move a barra de progresso para 85%
    $("#main_progress_bar").css("width", "85%");
    // Exibe o formulário de login
    cartpol.controlador.login.exibirForm();
  });
});
