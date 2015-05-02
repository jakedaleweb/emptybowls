//set up variables to be used between diff functions
var map;
var supportersList;
var markerCollection = [];

//set up icons object
var ICONS = {
'UNSELECTED': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
'SELECTED':   'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
};

//run everything
function initialise() {
  //set up map
  var mapOptions = {
    center: new google.maps.LatLng(-41.128314,174.944385),
    zoom: 9
  };
  map = new google.maps.Map(document.querySelector("#map-canvas"), mapOptions);
  //capture supporters ul in variable
  supportersList = document.querySelector("#supporters");
  //run function to load json
  loadSupportersJSON();

  google.maps.event.addDomListener(window, 'load', initialise);

  //function to load json, calls processJSON function
  function loadSupportersJSON () {
  	jQuery.getJSON('js/maps.json', processSupportersJSON);
  }

  //process JSON
  function processSupportersJSON(supporters) {
    //log json in console
  	console.log(supporters);
    // sort supporters array from north to south
    supporters.sort(function (supportersA, supportersB) {
      if (supportersA.lat < supportersB.lat) {
        return 1; // A comes first - correct order
      } else {
        return -1; // B comes first - reverse the order
      }
    });
    //empty out supporters list
    supportersList.innerHTML = "";
    // setting up a var for this particular location and calling add marker function
    for(var i = 0; i < supporters.length; i += 1) {
      var locations = supporters[i];
      addMarker(locations);
    }
    //run function to fit markers on map
    fitMapToBounds();
  }

  //function to fit markers to map
  function fitMapToBounds() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markerCollection.length; i += 1) {
      bounds.extend(markerCollection[i].getPosition());
    }
    map.fitBounds(bounds);
  }

  function addMarker(locations) {
    var marker = new google.maps.Marker({
      'map': map,
      'position': new google.maps.LatLng(locations.lat, locations.lng),
      'title': locations.name,
      'icon': ICONS.UNSELECTED
    });

    markerCollection.push(marker);

    var listItem = document.createElement('li');
    listItem.innerHTML = '<li><a href="'+locations.link+'">'+locations.name+'<img src="img/supportingLogo/'+locations.img+'" alt="logo of supporting business"></a></li>';
    supportersList.appendChild(listItem);

    var infoWindow = new google.maps.InfoWindow({
      'content': '<li><a href="'+locations.link+'">'+locations.name+'<img src="img/supportingLogo/'+locations.img+'" alt="logo of supporting business"></a></li>'
    });

    listItem.addEventListener("mouseover", function (evt) {
      evt.preventDefault();
      selectMarker(marker, listItem);
    });

    google.maps.event.addDomListener(marker, "click", function(){
      selectMarker(marker, listItem);
      infoWindow.open(map, marker);
    });
  }

  function selectMarker(marker, listItem) {
    deselectAllMarkers();
    marker.setIcon(ICONS.SELECTED);
    marker.setZIndex(1000);
    //map.setZoom(12);
    listItem.className = "active";
  }

  function deselectAllMarkers() {
    for (var i = 0; i < markerCollection.length; i += 1) {
      markerCollection[i].setIcon(ICONS.UNSELECTED);
      markerCollection[i].setZIndex(null);
    }
    listItemCollection = supportersList.querySelectorAll('li');
    for (var i = 0; i < listItemCollection.length; i += 1) {
      listItemCollection[i].className = "";
    }
  }
};

initialise();
