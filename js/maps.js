function initialize() {

  //set locations as empty array
  var locations = [];

  //get locations from db
  $.ajax({
    dataType: "json",
      url: "js/maps.json",
    success: function(data){
      $(data).each(function(i){
        var location = [ data[i].name, data[i].link, new google.maps.LatLng(data[i].lat, data[i].lng) ];
        locations.push(location);
        //set up the google objects needed
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();  
        //set up map options
        var mapOptions = {
          zoom: 20
        }
        //add location to list
        $('#supporters').append('<li><a href="'+locations[i][1]+'">'+locations[i][0]+'</a></li>')
        //create map
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        //loop through array to place markers
        for (var i = 0; i < locations.length; i++) {  
          var marker = new google.maps.Marker({
            position: locations[i][2],
            map: map
          });

          //create bounds based on each marker
          bounds.extend(marker.position);
          //fit map to bounds
          map.fitBounds(bounds);

          //when mouse over the marker
          google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
              //open windown with link to website
              infowindow.setContent('<a href="'+locations[i][1]+'">'+locations[i][0]+'</a>');
              infowindow.open(map, marker);
            }
          })(marker, i)); 
        }
      }); 
    },
    error: function(){
      alert('failure');
    }
  });
}
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
      https://maps.google.com/maps/api/js?sensor=true
  document.body.appendChild(script);
}
document.addEventListener('DOMContentLoaded', loadScript);
