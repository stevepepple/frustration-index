// Like d3.time.format, but faster.
function parseDate(d) {
  return new Date(2001,
      d.substring(0, 2) - 1,
      d.substring(2, 4),
      d.substring(4, 6),
      d.substring(6, 8));
}
    
function filterJSON(json, key, value) {
  var result = {};
  for (var explosionIndex in json) {
    if (json[explosionIndex][key] === value) {
      result[explosionIndex] = json[explosionIndex];
    }
  }
  return result;
}

function chartJSON() {
  color = "#EEEEEE"

  var path = new Array();
  var length = 0;
            
  for (var i = 0; i < window.paths.length; i++){
            
    if(window.paths[i].length){
      for(var j = 0; j < window.paths[i].length; j++){
        var line = window.paths[i][j].geojsonProperties.LINEABBR;
        $("#paths").append()
          
        if (city == "geneva" || city == "sf") {
          window.paths[i][j].strokeColor = color;
          window.paths[i][j].strokeWeight = .5;
          window.paths[i][j].setMap(map);
          

          window.paths[i][j].setMap(map);

          
        }  
      }
    } else{
      window.paths[i].strokeColor = "#" + color;
      window.paths[i].setMap(map);
    }
  }
}
    
/* Extend Google Maps */
var markersArray = [];
var overlays = [];

google.maps.Map.prototype.addMarker = function(location) {
  map.clearMarkers();
      
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
      
  markersArray.push(marker);
};

google.maps.Map.prototype.addMultipleMarkers = function(location) {
      
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
      
  markersArray.push(marker);
};
    
google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i < markersArray.length; i++){
        markersArray[i].setMap(null);
    }
    this.markers = new Array();
};

google.maps.Map.prototype.clearOverlays = function() {
  for (var i = 0; i < overlays.length; i++ ) {
    overlays[i].setMap(null);
  }
}

google.maps.Map.prototype.addOverlay = function(lat, lon, size) {
  var coord = new google.maps.LatLng(lat, lon)

  var circleOptions = {
    strokeColor: yellow,
    strokeOpacity: 0.8,
    strokeWeight: .8,
    fillColor: yellow,
    fillOpacity: 0.2,
    map: map,
    center: coord,
    radius: size
  };

  var circle = new google.maps.Circle(circleOptions);
      
  overlays.push(circle);
};