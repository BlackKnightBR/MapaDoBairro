//Área de dados.
var clientes = [
  {
    "name" : "Black Knight Studio BR",
    "desc" : "Agência de marketing digital.",
    "location" : {lat: -21.4740523 , lng: -47.0034376},
    "end" : "Rua Recife, 149, Mococa-SP.",
    "cel" : "(19)99194-4298",
    "tel" : "(19)3656-2178",
    "index" : 0
   },
  {
    "name" : "Clebinarius Social Estudio",
    "desc" : "Estudio de piercings em Mococa.",
    "location" : {lat: -21.4659485 , lng: -47.000363 },
    "end" : "Praça Epitácio Pessoa, 94, Mococa-SP.",
    "cel" : "(19)99299-5763",
    "tel" : "(19)3665-5981",
    "index" : 1
  },
  {
    "name" : "Pisani Inovações",
    "desc" : "Inovações em pintura e texturização.",
    "location" : {lat: -21.4490099 , lng: -47.0121738},
    "end" : "Rua Francisco Pedrosa filho, 72, Mococa-SP.",
    "cel" : "(19)99504-5825",
    "tel" : "Apenas celular.",
    "index" : 2
  },
  {
    "name" : "Fábio Celulares",
    "desc" : "Conserto, peças e serviços para o seu celular ou tablet.",
    "location" : {lat: -21.4657949 , lng: -47.0141764},
    "end" : "Rua Pernambuco, 30, Mococa-SP.",
    "cel" : "(19)98943-4141",
    "tel" : "(19)97138-7241",
    "index" : 3
  },
  {
    "name" : "Açougue São Domingos",
    "desc" : "Casa de carnes do Tião Nicola.",
    "location" : {lat: -21.4571339 , lng: -47.005603},
    "end" : "Rua Adalberto Santos Figueiredo, 545, Mococa-SP.",
    "cel" : "(19)3656-2610",
    "tel" : "(19)3665-3647",
    "index" : 4
  },
  {
    "name" : "Clinica Wilson Saboya Brito Filho",
    "desc" : "Clinica de ginecologia.",
    "location" : {lat: -21.46497088 , lng: -47.00775683},
    "end" : "Rua Antônio Teófilo, 480, Mococa-SP.",
    "cel" : "(19)3656-4865",
    "tel" : "Apenas telefone.",
    "index" : 5
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

 //Adicona todos os clientes a lista de clientes em tempo de execução.
 initList : function(){
   for(var i=0; i < clientes.length; i++){
      AppViewModel.clientes.push(clientes[i]);
   }
 },

 //Função "mostrarClienteLista" linkada ao HTML pelo knockout usando "mostrarClienteComClick".
 //Recebe o nome do cliente a ser exibido por parâmetro.
 mostrarClienteComClick: function(index){
   mostrarInfoWindow(index);
 },

 //Função "showListings" linkada ao HTML pelo knockout usando "listar".
 listar: function(){
   showListings();
 },

 //Função "hideListings" linkada ao HTML pelo knockout usando "esconderListagem".
 esconderListagem: function(){
   hideListings();
 },

 //Função "mostrarCliente" linkada ao HTML pelo knockout usando "marcarCliente".
 marcarCliente: function(){
   mostrarCliente();
 }

};
AppViewModel.query.subscribe(AppViewModel.search);
ko.applyBindings(AppViewModel);
AppViewModel.initList();
