//Controla todos os aspectos relacionados ao mapa.
  var map;
  var marker = null;
  var markers = [];
  var locations = [
    {title: 'Black Knight Studio BR', location: {lat: -21.4740523 , lng: -47.0034376}},
    {title: 'Clebinarius Social Estudio', location: {lat: -21.4659485 , lng: -47.000363 }},
    {title: 'Pisani Inovações', location: {lat: -21.4490099 , lng: -47.0121738}},
    {title: 'Fábio Celulares', location: {lat: -21.4657949 , lng: -47.0141764}},
    {title: 'Açougue São Domingos', location: {lat: -21.4571339 , lng: -47.005603}},
    {title: 'Clinica Wilson Saboya Brito Filho', location: {lat: -21.4740523 , lng: -47.0034376}}
  ];



  function initMap() {
    var styles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#19a0d8' }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#ffffff' },
          { weight: 6 }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#e85113' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -40 }
        ]
      },{
        featureType: 'transit.station',
        stylers: [
          { weight: 9 },
          { hue: '#e85113' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          { lightness: 100 }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          { lightness: -100 }
        ]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { visibility: 'on' },
          { color: '#f0e4d3' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -25 }
        ]
      }
    ];

    //Cria um novo mapa definido com as propriedades do array styles centrado na BKS-BR.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -21.4740523 , lng: -47.0034376},
      zoom: 13,
      styles: styles,
      mapTypeControl: false
    });


    var largeInfowindow = new google.maps.InfoWindow();
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');

    //Cria array de marcadores e adiciona observadores a eles.
    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });
      markers.push(marker);
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }

    //Cria conexão dos botões e suas funções.
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('search-input').addEventListener('click', mostrarCliente);
    showListings();
  }

  //Completa a Janela de marcador com informações se disponiveis.
  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;

      //Recupera a street view se disponivel da localiação indicada..
      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div><div><nav>' +
              '<ul id="wikipedia">Wikipedia Links</ul></nav></div>');
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
            loadWiki(marker.title);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
      }
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      infowindow.open(map, marker);
    }
  }

  //Busca por links da wikipedia.
  function loadWiki(value) {
      var $wikiElem = $('#wikipedia');
      var place = value;
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
          if(document.getElementById('wikipedia').childNodes.length <= 1){
            $wikiElem.append('<li>Nada a exibir</li>');
          }
        }
      });
      return false;
  }

  //Função que adiciona o array de marcadores ao mapa.
  function showListings() {
    var bounds = new google.maps.LatLngBounds();
    if(marker) marker.setMap(null);
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  //Limpa os marcadores do mapa tanto o array como marcadores únicos.
  function hideListings() {
    if(marker) marker.setMap(null);
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  //Adiciona um marcador especifico do cliente selecionado pelo usuário.
  function mostrarCliente() {
    var nome = document.getElementById('search').value;
    var todosClientes = locations;
    hideListings();
    for(var i = 0; i < todosClientes.length; i++){
      if(todosClientes[i].title === nome){
        var LInfowindow = new google.maps.InfoWindow();
        marker = new google.maps.Marker({
          position: todosClientes[i].location,
          title: todosClientes[i].title,
          animation: google.maps.Animation.DROP,
        });
        map.setCenter(marker.position);
        map.setZoom(15);
        marker.setMap(map);
        marker.addListener('click', function() {
          populateInfoWindow(this, LInfowindow);
        });
      }
    }
  }

  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }
