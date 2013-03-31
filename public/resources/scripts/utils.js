// Like d3.time.format, but faster.
function parseDate(d) {
  return new Date(2001,
      d.substring(0, 2) - 1,
      d.substring(2, 4),
      d.substring(4, 6),
      d.substring(6, 8));
}

function getDateTicker(date, useHTML) {
          
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  /* Pad Values */
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  
  var string;
  if (useHTML) {
    string = $("<div class='hours'>" + hours + "</div><div>:</div><div class='minutes'>" + minutes + "</div><div>:</div><div class='seconds'>" + seconds + "</div>")
  } else {
    string = hours + ":" + minutes + ":" + seconds;
  }
  return string;
}

function getDateLabel(date) {
          
  var hours = date.getHours();
  var minutes = date.getMinutes();

  /* Pad Values */
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  
  string = hours + ":" + minutes;
  return string;
}


/* JSON */    
function filterJSON(json, key, value) {
  var result = {};
  for (var explosionIndex in json) {
    if (json[explosionIndex][key] === value) {
      result[explosionIndex] = json[explosionIndex];
    }
  }
  return result;
}

function get_grade(factor) {
  var num = parseInt(factor);
  if (isNaN(num) == false ) {
    return num;
  } else {
    return 0;
  }
}

function sum_factor(factor, size) {
  if (factor == null || factor == "undefined" || isNaN(factor)) {
    return 0;
  } else {
    return (Math.round(factor / size))
  }
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }
  return false;
}

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
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
          window.paths[i][j].strokeWeight = .4;
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

google.maps.Map.prototype.addOverlay = function(lat, lon, size, color, key) {
  var coord = new google.maps.LatLng(lat, lon)

  var circleOptions = {
    clickable:true,
    strokeColor: color,
    strokeOpacity: 0.0,
    strokeWeight: 0.0,
    fillColor: color,
    fillOpacity: 0.8,
    map: map,
    center: coord,
    radius: size,
    title: key
  };

  var circle = new google.maps.Circle(circleOptions);
  
  //var infowindow = new google.maps.InfoWindow();
  
  /*
  google.maps.event.addListener(map, 'center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 3000);
  }); */
  google.maps.event.addListener(circle, 'click', function(event){
    window.event = event;
    
    $(".mapTooltip").remove();
    
    var x = event.Ra.clientX;
    var y = event.Ra.clientY;
    var stop_id = circle.title;
    
    var capacity = chart[stop_id].grade.capacity;
    var delay = chart[stop_id].grade.delay;
    var speed = chart[stop_id].grade.speed;
    
    var total = Math.round((capacity + delay + speed) / 3); 
    
    var tooltip = $("<div class='mapTooltip'>" +
      "Stop: " + circle.title + "</br>" +
      "Frustration distribution: </br>" +
      "<div class='totalLevel tile'><div class='label'>" + FACTORS[city].factors + "</div><div class='icon grade" + dotGrade[total] + "'></div><div class='grade'> LOS " + dotGrade[total] + "</div></div>" + 
      "<div class='delay tile grade'><div class='label'>" + FACTORS[city].delay + "</div><div class='icon grade" + dotGrade[delay] + "'></div><div class='grade'> LOS " + dotGrade[delay] + "</div></div>" + 
      "<div class='capacity tile grade'><div class='label'>" + FACTORS[city].capacity + "</div><div class='icon grade" + dotGrade[capacity] + "'></div><div class='grade'> LOS " + dotGrade[capacity] + "</div></div>" + 
      "<div class='speed tile grade'><div class='label'>" + FACTORS[city].speed + "</div><div class='icon grade" + dotGrade[speed] + "'></div><div class='grade'> LOS " + dotGrade[speed] + "</div></div>" + 
    "</div>");
    
    $("#map_canvas").before(tooltip)
    tooltip.css("left", (x + 8) + "px");
    tooltip.css("top", (y + 6) + "px");    
    //map.setZoom(14);
    //map.setCenter(circle.getPosition());
    
    //infowindow.setPosition(circle.getCenter());
    //infowindow.open(map);
  });
  
  overlays.push(circle);
};

String.prototype.toTitleCase = function () {
  var string = "";
  var words = this.split(" ");
  for(keyvar in words) {
    string += ' ' + words[keyvar].substr(0,1).toUpperCase() + words[keyvar].substr(1,words[keyvar].length);
  }
  return string;
}
