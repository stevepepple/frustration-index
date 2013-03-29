/*
var arrivals;
    
d3.csv("sf-route-1-schedule-real.csv", function(data) {

  //console.log(routes)
  arrivals = data;
      
  // TODO: Update to match arrival and schedule column
  var formatNumber = d3.format(",d"),
      formatChange = d3.format("+,d"),
      formatDate = d3.time.format("%B %d, %Y"),
      formatTime = d3.time.format("%I:%M %p");
      
  arrivals.forEach(function(d, i) {
    d.index = i;
    console.log(d.date)
    //d.date = parseDate(d.date);
    //d.delay = +d.delay;
    //d.distance = +d.distance;
  });
                  
});
*/

//var current_stop = by_stop.groupAll().value()

var current_stop = by_stop.filterExact(p.stop_id).groupAll().reduce(reduceAdd, reduceRemove, reduceInitial);
console.log(by_stop)
console.log(current_stop.value())

function reduceAdd(p, v, c) {
  ++p.count;
  console.log(p.time, p.count)
  
  //p.capacity += p.capacity;
  return p;
}

function reduceRemove(p, v) {
  --p.count;
  p.total -= v.total;
  return p;
}

function reduceInitial() {
  return {stop_id : p.stop_id, time : p.time, capacity: p.capacity, count: 0 };
}

//current_stop.group().reduceCount()

/*
current_stop.group(function(p) {
  console.log(p)
});
*/


function showRoute(route) {
  if (city == "sf") { var routeName = window.sf.abbr[0][route]; }
  
  //map.clearMarkers();

  /* Check the Depth of the geoJSON 
     TODO: Move to reusable func.
     TODO: SANJU to Add his d3 geoJSON, which is colored by route. 
     TODO: Add or remove route based upon the route select box. 
  */
  var path = new Array();
  var length = 0;
            
	for (var i = 0; i < window.paths.length; i++){
            
    var color = "#FFFFFF";

		if(window.paths[i].length){
                
			for(var j = 0; j < window.paths[i].length; j++){
        var line = window.paths[i][j].geojsonProperties.LINEABBR;
        $("#paths").append()
        
        //console.log(window.paths[0][0])
          
        if (city == "sf") {
          
          try {
            
            if (routeName[name] == line || routeName.indexOf(line) > -1) {
              window.paths[i][j].strokeColor = "#" + color;
              window.paths[i][j].strokeWeight = 1;
              window.paths[i][j].setMap(map);
              length += google.maps.geometry.spherical.computeLength(window.paths[i][j].getPath()) / 1000;
            } else {
              window.paths[i][j].setMap(null);
            }
          }
          catch(err) {
            console.log(err, route)
          }          
        } else if (city == "geneva") {
          window.paths[i][j].strokeColor = "#" + color;
          window.paths[i][j].strokeWeight = 1;
					window.paths[i][j].setMap(map);
          length += google.maps.geometry.spherical.computeLength(window.paths[i][j].getPath()) / 1000;
          
          if (window.paths[i][j].geojsonProperties.routeCode == route || window.paths[i][j].geojsonProperties.route_id == route) {
          
          } else {
            window.paths[i][j];
            window.paths[i][j].setMap(null);
          }
          
        }  
			}
		} else{
      //console.log(window.paths[i])
      //console.log(window.paths[i])
      window.paths[i].strokeColor = "#" + color;
			window.paths[i].setMap(map);
                
      //length = google.maps.geometry.spherical.computeLength(window.paths[i].getPath()) / 1000;
                
		}
	
  }

  /*
  $.getJSON('http://localhost:8080/urban-data-challenge/rest/stop-service/sf/' + window.sf.routes[route] + '/null/4015', function(data) {
 
    var first, last = null;
    
    $.each(data, function(key, val) {
      //  (key, val)
      if (key == "coordinates") {
        $.each(data.coordinates, function(key2, val2){
          val.split("\,");
          var lat = val[0];
          var lon = val[1];
          var latLon = val2.split(",");
          
          var coord = new google.maps.LatLng(latLon[0], latLon[1]);
          
          if (key2 == 0) { first = coord; }
          if (key2 == data.length) { last = coord; }
          
          map.addMultipleMarkers(coord);
                
        });
      }
    });
    */
    
    /*
    google.maps.event.trigger(map, 'resize');
    
    map.setCenter(first);
    map.setZoom(14);
    if (city == "sf") { 
      map.setZoom(15);
    }
    
    var bounds = new google.maps.LatLngBounds(first, last);
    map.panToBounds(bounds)        
  });
  */       

}