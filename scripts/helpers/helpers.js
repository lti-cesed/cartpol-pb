String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

require(['handlebars', 'numeral'], function() {
    Handlebars.registerHelper('listaDeBOs', function(context, options) {
        
        var ret = "";
        
        for(var i = 0, j = context.length; i < j; i++) {
            var id            = context[i].doc._id;
            var tipo          = "BO";
            var data          = context[i].doc.infoGerais.dataFato;
            var versando      = context[i].doc.infoGerais.versando;
            var comunicante   = context[i].doc.comunicante.nome;
            
            ret +=
                "<tr data-bo-id='" + id + "' data-bo-rev='" + data + "'>" + 
                  "<td style='text-align: center'>" + id     + "</td>" +
                  "<td style='text-align: center'>" + data    + "</td>" +
                  "<td style='text-align: center'>" + tipo     + "</td>" +
                  "<td style='text-align: center'>" + versando  + "</td>" +
                  "<td style='text-align: center'>" + comunicante  + "</td>" +
                "</tr>";
        }

        return ret;
    });
    
    var helperCampo = function(prefix, name, label, tamanho, placeholder, classe) {
      if (typeof placeholder != 'string' && !(placeholder instanceof String)) {
        placeholder = label;
      }
      
      if (typeof tamanho != 'number') {
        tamanho = 10;
      }
      
      var classes = "form-control";
      if (classe) {
        classes += " " + classe;
      }
      
        //20/08/2014 - wagner.araujo - Inicio
//      ret = 
//      '  <label for="input' + prefix.capitalize() + name.capitalize() + '" class="col-sm-2 control-label">' + label + '</label>' + 
//      '  <div class="col-sm-' + tamanho + '">' + 
//      '    <input class="' + classes + '" id="input' + prefix.capitalize() + name.capitalize() + '" placeholder="' + placeholder + '">' + 
//      '  </div>';
        
        
        ret = 
        '  <label for="input' + prefix.capitalize() + name.capitalize() + '" class="col-sm-2 control-label">' + label + '</label>' + 
        '  <div class="col-sm-' + tamanho + '">' + 
        '    <input class="' + classes + '" id="input' + prefix.capitalize() + name.capitalize() + '" placeholder="' + placeholder + '"' +
        '     name="input' + prefix.capitalize() + name.capitalize() + '">' +
        '  </div>';
      
        //20/08/2014 - wagner.araujo - Fim
        
      return ret;
    };
    
    var helperCampoCompleto = function(name, label, tamanho, placeholder) {
      return '<div class="form-group">' + helperCampo(name, label, placeholder, tamanho) + '</div>';
    };
    
    var helperFormGroup = function(str) {
      return '<div class="form-group">' + str + '</div>';
    };
    
    var helperFormularioPessoa = function(prefix) {
      var estados = [
      {texto: 'Paraíba',             valor: 'PB'},	
      {texto: 'Acre',                valor: 'AC'},	
      {texto: 'Alagoas',             valor: 'AL'},	
      {texto: 'Amapá',               valor: 'AP'},	
      {texto: 'Amazonas',            valor: 'AM'},	
      {texto: 'Bahia',               valor: 'BA'},	
      {texto: 'Ceará',	             valor: 'CE'},	
      {texto: 'Distrito Federal',    valor: 'DF'},	
      {texto: 'Espírito Santo',      valor: 'ES'},	
      {texto: 'Goiás',               valor: 'GO'},	
      {texto: 'Maranhão',            valor: 'MA'},	
      {texto: 'Mato Grosso',         valor: 'MT'},	
      {texto: 'Mato Grosso do Sul',  valor: 'MS'},	
      {texto: 'Minas Gerais',        valor: 'MG'},	
      {texto: 'Pará',                valor: 'PA'},	
      {texto: 'Paraná',              valor: 'PR'},	
      {texto: 'Pernambuco',	         valor: 'PE'},	
      {texto: 'Piauí',               valor: 'PI'},	
      {texto: 'Rio de Janeiro',      valor: 'RJ'},	
      {texto: 'Rio Grande do Norte', valor: 'RN'},	
      {texto: 'Rio Grande do Sul',   valor: 'RS'},	
      {texto: 'Rondônia',            valor: 'RO'},	
      {texto: 'Roraima',             valor: 'RR'},	
      {texto: 'Santa Catarina',      valor: 'SC'},	
      {texto: 'São Paulo',           valor: 'SP'},	
      {texto: 'Sergipe',             valor: 'SE'},	
      {texto: 'Tocantins',           valor: 'TO'}
      ];
      
      var generos = [
      {texto: 'Masculino',     valor: 'Masculino'},
      {texto: 'Feminino',      valor: 'Feminino'},
      {texto: 'Outros',         valor: 'Outros' },
      {texto: 'Não Informado', valor: 'Não Informado'}
      ];
      
      var ret = 
        helperFormGroup(helperCampo(prefix, "nome", "Nome", 6)                            + helperCampo(prefix, "nascimento", "Data Nasc.", 2, null, "data")) +
        helperFormGroup(helperCampo(prefix, "cpf", "CPF", 4, null, "cpf")                 + helperComboBox(prefix, "sexo", "Sexo", 4, generos)) +
        helperFormGroup(helperCampo(prefix, "telefone", "Telefone", 4, null, "telefone")  + helperCampo (prefix, "celular", "Celular", 4, null, "telefone")) +
        helperFormGroup(helperCampo(prefix, "id", "Id", 4, "Identificação")               + helperCampo (prefix, "profissao", "Profissão", 4)) +
        helperFormGroup(helperCampo(prefix, "estadoCivil", "Estado Civil", 4)             + helperCampo (prefix, "escolaridade", "Escolaridade", 4)) +
        helperFormGroup(helperCampo(prefix, "pai", "Pai", 4, "Nome do Pai")               + helperCampo (prefix, "mae", "Mãe", 4, "Nome da Mãe")) +
        helperFormGroup(helperCampo(prefix, "naturalidade", "Natural", 4, "Naturalidade") + helperCampo (prefix, "nacionalidade", "Nacional", 4, "Nacionalidade")) +
        helperFormGroup(helperCampo(prefix, "endereco", "Endereço", 6)                    + helperCampo (prefix, "cep", "CEP", 2, null, "cep")) +
        helperFormGroup(helperCampo(prefix, "complemento", "Complemento", 4)              + helperCampo (prefix, "bairro", "Bairro", 4)) +
        helperFormGroup(helperCampo(prefix, "cidade", "Cidade", 6)                        + helperComboBox (prefix, "estado", "Estado", 2, estados));
      return ret;
    };
    
    var helperFormularioObjetoApreendido = function() {
      var prefix     = "objeto";
      var categorias = [
        {texto: 'Arma de Fogo',         valor: 'Arma de Fogo'},
        {texto: 'Arma Branca',          valor: 'Arma Branca'},
        {texto: 'Droga',                valor: 'Droga'},
        {texto: 'Veículo Apreendido',   valor: 'Veículo Apreendido'},
        {texto: 'Objetos Apreendidos',  valor: 'Objetos Apreendidos'},
        {texto: 'Veículo Para Entrega', valor: 'Veículo Para Entrega'},
        {texto: 'Objetos Para Entrega', valor: 'Objetos Para Entrega'}
      ];
      var ret        = 
        helperFormGroup(helperComboBox(prefix, "acusado", "Em poder de", 4) + 
                        helperComboBox(prefix, "categoria", "Categoria", 4, categorias)) +
        helperCampoTexto("objetoDescricao", "Descrição")+
        helperCheckBox(prefix, "paraEntrega", "", ["Para Entrega"]);
      return ret;
    };
    var helperFormularioExame = function() {

        var prefix     = "exame";
        var envolvimento       = [
            {texto: '-- Selecionar --', valor: ''},
            {texto: 'Vítima',           valor: 'Vítima'},
            {texto: 'Comunicante',      valor: 'Comunicante'},
            {texto: 'Acusado',          valor: 'Acusado'}
        ];
        var categorias              = [
            {texto: '-- Selecionar --', valor: ''},
            {texto: 'Medicina e Odontologia Legal',  valor: 'Medicina e Odontologia Legal'},
            {texto: 'Criminalística',                valor: 'Criminalística'},
            {texto: 'Laboratório Forense',           valor: 'Laboratório Forense'}
        ];
        var ret        =
            helperFormGroup(helperComboBox(prefix, "envolvimento", "Envolvimento", 4, envolvimento) +
                    helperComboBox(prefix, "solicitar", "Solicitar a", 4) +
                    helperComboBox(prefix, "categoria", "Categoria", 4, categorias)
            );
            //helperCheckBox("exameLista", "Exames", exames);
            //helperCampoTexto("exameLista", "Exames");
        return ret;
    };
    
    var helperCampoTexto = function(name, label) {
      var ret =
      '<div class="form-group">' + 
      '    <label for="inputHistorico" class="col-sm-2 control-label">' + label + '</label>' + 
      '    <div class="col-sm-10">' + 
      '      <textarea class="form-control" rows="3" id="input' + name.capitalize() + '"></textarea>' + 
      '    </div>' +
      "</div>";
      return ret;
    };
    
    var helperComboBox = function(prefix, name, label, tamanho, opcoes) {
      if (typeof tamanho != 'number') {
        tamanho = 10;
      }
      
      ret = 
      '  <label for="input' + prefix.capitalize() + name.capitalize() + '" class="col-sm-2 control-label">' + label + '</label>' +
      '  <div class="col-sm-' + tamanho + '">' + 
      '    <select class="form-control" id="input' + prefix.capitalize() + name.capitalize() + '">';
      
      if (opcoes) {
        for (var i = 0; i < opcoes.length; i++) {
          var opcao = opcoes[i];
          ret += '<option value="' + opcao.valor + '">' + opcao.texto + '</option>';
        }
      }
      
      ret += 
      '    </select>' +
      '  </div>';
      
      return ret;
    };

    var helperCheckBox = function(prefix, name, label, opcoes){
        var ret =
            '<label for="input' + name.capitalize() + '" class="col-sm-2 control-label">' + label + '</label>' +
            '<div class="form-group">' +
                '<div class="col-sm-offset-2 col-sm-10">' +
                    '<div class="checkbox">';
                        if (opcoes) {
                            for (var i = 0; i < opcoes.length; i++) {
                                var opcao = opcoes[i];
                                var id = opcao;
                                prefix = prefix.capitalize();
                                id = id.capitalize();
                                id = id.replace(" ", "");
                                id = prefix + id;
                                ret += '<input type="checkbox" id="input'+id+'"><label for="input'+id+'">'+opcao+'</label><br>';
                            }
                        }
            ret +=
                    '</div>' +
                '</div>' +
            '</div>';
        return ret;
    };

    
    Handlebars.registerHelper('campo', helperCampo);
    Handlebars.registerHelper('campoCompleto', helperCampoCompleto);
    Handlebars.registerHelper('campoTexto', helperCampoTexto);
    Handlebars.registerHelper('formularioPessoa', helperFormularioPessoa);
    Handlebars.registerHelper('formularioObjetoApreendido', helperFormularioObjetoApreendido);
    Handlebars.registerHelper('formularioExame', helperFormularioExame);
});
