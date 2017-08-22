//Área de dados.
var clientes = [
  {
    "name" : "Black Knight Studio BR",
    "desc" : "Agência de marketing digital.",
    "location" : {lat: -21.4740523 , lng: -47.0034376},
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178"
  },
  {
    "name" : "Clebinarius Social Estudio",
    "desc" : "Estudio de piercings em Mococa.",
    "location" : {lat: -21.4659485 , lng: -47.000363 },
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178"
  },
  {
    "name" : "Pisani Inovações",
    "desc" : "Inovações em pintura e texturização.",
    "location" : {lat: -21.4490099 , lng: -47.0121738},
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178"
  },
  {
    "name" : "Fábio Celulares",
    "desc" : "Conserto, peças e serviços para o seu celular ou tablet.",
    "location" : {lat: -21.4657949 , lng: -47.0141764},
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178"
  },
  {
    "name" : "Açougue São Domingos",
    "desc" : "Casa de carnes do Tião Nicola.",
    "location" : {lat: -21.4571339 , lng: -47.005603},
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178"
  },
  {
    "name" : "Clinica Wilson Saboya Brito Filho",
    "desc" : "Clinica de ginecologia.",
    "location" : {lat: -21.4740523 , lng: -47.0034376},
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178"
  }
];

var AppViewModel = {
  query : ko.observable(''),
  nomeCliente : ko.observable(''),
  //Array com todas as inormações dos clientes.
  clientes : ko.observableArray([]),

  search : function(value) {
  //Limpa os clientes.
  AppViewModel.clientes.removeAll();
  //Exibe o cliente selecionado na caixa de busca.
   for (var cliente in clientes) {
     if (clientes[cliente].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
       AppViewModel.clientes.push(clientes[cliente]);
     }
   }
 },

 initList : function(){
   for(var i=0; i < clientes.length; i++){
      AppViewModel.clientes.push(clientes[i]);
   }
 },
};
AppViewModel.query.subscribe(AppViewModel.search);
ko.applyBindings(AppViewModel);
AppViewModel.initList();
