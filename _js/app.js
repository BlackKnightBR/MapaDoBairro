//Aplicando a bibloteca knockout.js e suas práticas.
function AppViewModel(){
  //Área de dados.
  this.nomeCliente = ko.observable("Nome do Cliente");
  //Array com todas as inormações dos clientes.
  this.clientes = ko.observableArray([
    {
      "title" : "Black Knight Studio BR",
      "desc" : "Agência de marketing digital.",
      "location" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Clebinarius Social Estudio",
      "desc" : "Estudio de piercings em Mococa.",
      "location" : {lat: -21.4659485 , lng: -47.000363 },
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Pisani Inovações",
      "desc" : "Inovações em pintura e texturização.",
      "location" : {lat: -21.4490099 , lng: -47.0121738},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Fábio Celulares",
      "desc" : "Conserto, peças e serviços para o seu celular ou tablet.",
      "location" : {lat: -21.4657949 , lng: -47.0141764},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Açougue São Domingos",
      "desc" : "Casa de carnes do Tião Nicola.",
      "location" : {lat: -21.4571339 , lng: -47.005603},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Clinica Wilson Saboya Brito Filho",
      "desc" : "Clinica de ginecologia.",
      "location" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    }
  ]);

  this.loadData = function() {
      var $wikiElem = $('#wikipedia-links');
      //Limpa o cabeçalho da pesquisa. Recupera o valor de texto inserido pelo usuário.
      //Repõe o cabeçalho com o valor incluso pelo usuário.
      $wikiElem.text("");
      var place = $('#user-input').val();
      $wikiElem.text(place);


      //Url de solicitação e definição do timeout de resposta ajax.
      var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + place + '&format=json&callback=wikiCallback';
      var wikiRequestTimeout = setTimeout(function(){$wikiElem.text("failed to get wikipedia resources")},8000);

      //Requisição Ajax para api wikipedia.
      $.ajax(wikiUrl,{
        dataType: "jsonp",
        success: function(response){
          var articleList = response[1];
          //Cria uma lista dos links relevantes da Wikipedia sobre o lugar.
          for(var i = 0; i < articleList.length; i++){
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url + '">"' + articleStr + '</a></li>');
          };
          //Quando existe resposta "limpa" o limite de tempo para resposta.
          clearTimeout(wikiRequestTimeout);
        }
      });

      return false;
  };
};
ko.applyBindings(new AppViewModel());
