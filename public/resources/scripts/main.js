/* Constants */
CITY_CENTER = {
  sf : new google.maps.LatLng(37.7670, -122.4383),
  geneva : new google.maps.LatLng(46.2000, 6.1500),
  zurich : new google.maps.LatLng(47.3690, 8.5380)
}

pink = "#E07C94";
orange = "#E48E3B";
green = "#D0E7A2";
blue = "#58D3D6";
yellow = "#FBF500"

DATE_FORMAT = d3.time.format("%b %Y");
/* TODO: Allow any Day */
DAY = "10/01/2012"

/* Globals */
window.sf = new Object;
window.sf.abbr = [{"1":["001","01EXTRA"],"2":"002","3":"002-WKY","4":"002-WKY","5":"005","6":"006","7":"006","71":"006","71L":"006","8X":"008X","9":"009","9L":"009","12":["012-WKY","012"],"88":"038","14":"014","16X":"016X","17":"017","18":"018","19":["019","019-WKY"],"21":"021","22":"022","23":"023","24":"024","27":"027","28":["028","028 SAT","028-WKY"],"29":"029","30":"030","30X":"130X","31":"031","33":"033","35":"035","36":"036","37":"037","38":"038","39":"039","41":"041","43":["043","043-WKY"],"44":"044","45":"030","47":["047-WKY","047"],"48":"048","49":"049","52":"052","54":"054","56":"056","59":"059","61":"61","66":"66","67":"67","80":"080","80X":"080","81X":"080","82X":"080","90":"090","91":"091","14L":"114XL","14X":"114XL","95":"095SD","38AX":"138L","38BX":"138L","1X":"101X","31X":"101X","38X":"101X", "L-OWL": "094 MC L-N OWL", "M-OWL": "094 MC L-N OWL", "N-OWL": "094 MC L-N OWL", "38L":"138L", "J":"093", "M":"093", "N":"093"}];
window.sf.routes = new Array();
    
// more styles: http://mapsys.info/34436/styled-maps-using-google-maps-api-version-3/ 
// https://gist.github.com/41latitude
var styles = [{"featureType":"administrative.country","elementType":"labels","stylers":[{"saturation":60},{"hue":"#ff00bb"},{"lightness":0}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"hue":"#ff00bb"},{"saturation":60},{"lightness":0}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry","stylers":[{"hue":"#ff00b2"},{"saturation":50},{"lightness":-20},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"gamma":0.8},{"hue":"#0099ff"},{"saturation":-80},{"lightness":10}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffd500"},{"visibility":"simplified"},{"saturation":-10},{"lightness":-10}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"saturation":-20},{"lightness":40}]}]
var randMcNally = [{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":-46},{"saturation":100},{"hue":"#ffee00"},{"gamma":0.94}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#2a00ff"},{"visibility":"simplified"},{"lightness":-10},{"saturation":-60}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"lightness":20},{"hue":"#ff0066"},{"saturation":20}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":40}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"lightness":20}]}]
var simple = [{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}]
var simple2 = [{"featureType":"road","elementType":"geometry","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]}]
var buildings = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}]

var white = [ { "featureType": "administrative", "stylers": [ { "visibility": "off" } ] },{ "featureType": "landscape", "stylers": [ { "visibility": "simplified" }, { "color": "#fafafa" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "elementType": "geometry", "stylers": [ { "visibility": "on" }, { "lightness": 30 } ] },{ "featureType": "administrative", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "color": "#dcdcdc" } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "weight": NaN }, { "color": "#ebebeb" } ] },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#fafafa" } ] }, { "featureType": "road.highway", "stylers": [ { "visibility": "off" }, { "featureType": "water", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "weight": 1 } ] }] } ]
var open = [
  {
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#DDDDDD" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "on" },
      { "color": "#999999" },
      { "weight": 0.2 }
    ]
  },{
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#646464" }
    ]
  },{
  }
]
/* Setup the Google Map Enviornment */
var map, city;

window.stops = null;
window.routes = null;
window.paths = null;
window.circleOptions = {};
    
function initialize() {
	
	city = $("#city").val();
  
	var mapOptions = {
		center: CITY_CENTER[city],
		zoom: 13,
		disableDefaultUI: true,
		zoomControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	// http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	map.setOptions({styles: open});
  google.maps.event.addDomListener(window, 'load', initialize);
  
  
	loadRoutes(citySelect.val());    
  
}    
    
/* Populate the List of Routes */
var routeSelect = $("#route");
var googleOptions = { strokeColor: '#00746b', strokeWeight: 2 };
var colors = ["00308F", "A32638", "841B2D", "3D0C02", "004225", "00563F", "232B2B", "013220", "004B49"]
        
/* Routes.csv is just a list of routes, not the shape files */
function loadRoutes(city) {
  var path = "resources/data/";

  d3.csv(path + city + "/routes/routes.csv", function(data) {
        
    window.routes = data;
    /* Don't show routes selector
    routeSelect.empty().append("<option>Select a route ...</option>");
    data.forEach(function(d, i){
      if (city == "sf") {
        var value = d.route_short_name + " -- " + d.route_long_name + "  " + d.route_id;
        routeSelect.append($("<option></option>").attr("value",d.route_short_name).text(value)); 
        var name = d.route_short_name.toString()
        window.sf.routes[name] = d.route_id;
      } else if (city == "geneva") {
        var value = d.route_short_name + " -- " + d.route_long_name + " " + d.direction;
        routeSelect.append($("<option></option>").attr("value",d.route_short_name).text(value)); 
      } else { 
        var value = d.route_id + " -- " + d.route_long_name;
        routeSelect.append($("<option></option>").attr("value",d.route_short_name).text(value)); 
      }
    });
    */

    /* Routes.csv is the geoJSON files */
    $.getJSON(path + city + '/routes/routes.json', function(data) {
              
      var myGoogleVector = new GeoJSON(data, googleOptions);
      window.paths = myGoogleVector;

      /* For now, chart everything */
      chartJSON()      
    });
  });      
}

/* Typical run is .408 ms: */
function loadData(city) {
    var bus, stop, path;
    
    if(city == "sf") {
      path = "resources/data/" + city + "/bus-capacity.csv"
    } else {
      path = "resources/data/" + city + "/trip_stats.csv"
    }
    
    /* Clean up */
    $("#range").find(".segment").remove()
    
    
    d3.csv("resources/data/" + city + "/stops/stops.csv", function(stops){
      all_stops = crossfilter(stops);
      
      stop = all_stops.dimension(function(d) { return d.stop_id });
    });
    
    /* TODO: Reduce size before downloading */
    d3.csv(path, function(buses) {

      var formatNumber = d3.format(",d");
        formatChange = d3.format("+,d");
        formatDate = d3.time.format("%B %d, %Y");
        formatTime = d3.time.format("H:%M:%S");

      //var nestByDate = d3.nest().key(function(d) { return d3.time.day(d.date); });

      /* ~ 60ms; 16ms w/o time func */
      buses.forEach(function(d, i) {
        d.index = i;
        /* Native JS date actually seems to be faster 
        d.time = d3.time.format(d.time); */
        d.time = new Date(DAY + " " + d.time);
      });

      bus = crossfilter(buses)
    
      var all = bus.groupAll();

      // dim by trip
      //var trip = bus.dimension(function(d) { return d.trip_id });
      //var trips = trip.group();      
      var time = bus.dimension(function(d) { return d.time });
      var by_stop = bus.dimension(function(d) { return d.stop_id });
      
      var total_stops = by_stop.groupAll().reduceCount().value();
      
      console.log(total_stops)
      
      var times = time.group();
      
      function reduceInitial(p, v) {
        console.log("reducing...")
        console.log(p, v)
        return 0;
      };

      var min = new Date(DAY + " 06:00:00");
      var max = new Date(DAY + " 22:00:00");

      var date_range = Math.abs(min - max);
      var minutes = date_range / 1000 / 60;
      
      /* Add date segments to the slider */
      var segments = minutes / 60;
      
      for (var i=0; i < segments; i++) {
        var increment = (i * 60) + 30;
        
        var label = new Date(min.getTime() + (increment * 1000 * 60));
        
        var width = $("#slider").innerWidth();
        var labelWidth = (100 / segments)
        
        var segment = $("<div class='segment'</div>");
        
        segment.append("<div class='tick center'></div><span class='label'>" + getDateLabel(label) + "</span>");
        segment.css("width", labelWidth + "%");
        
        
        $("#range").append(segment);
      };
      
      /* Trigger first Filter */
      filterByTime(min, new Date(min.getTime() + (1 * (60 + 5))));
      $("#currentTime").html( getDateTicker(min, true) );

      $("#slider").slider({
        value: 5,
        min: 0,
        max: minutes,
        step: 5,
        slide: function(event, ui) {

          var val = ui.value;
          
          $("#currentTime").html( getDateTicker(new Date(min.getTime() + (val * 1000 * 60)), true));
        },
        change: function( event, ui ) {

          map.clearOverlays();

          var val = ui.value;
          
          var start = new Date(min.getTime() + (val * 1000 * 60));
          /* add 30 minutes */
          var end = new Date(start.getTime() + (5  * 1000 * 60));
          
          filterByTime(start, end)

        }
      });
      
      $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );

      function filterByTime(start, end) {
        
        var lat, lon;
        var capacity, delay, speed; 
        time.filterRange([start, end]);
        /* 622.5 MS */
        //console.log(time)
        var num_stops = by_stop.groupAll().reduceCount().value();
        console.log("Number of stops at this time: " + num_stops)
        
        /* TODO: Important! show all */
        var bottom = num_stops - 200;
        
        by_stop.top(200).forEach(function(p, i){
          plotFrustration(p, i)
        });
        
        /*
        by_stop.bottom(bottom).forEach(function(p, i){
          plotFrustration(p, i)
        });
        */
        
        function plotFrustration(p, i) {
          //by_stop.filterExact(p.stop_id);
          //unique_stops = by_stop.top(Infinity).length
          
          if (city == "sf") {
            lat = p.stop_lat;
            lon = p.stop_lon;
          } else {
            
            var current = stop.filterExact(p.stop_id)
            lat = current.top(1)[0].stop_lat;
            lon = current.top(1)[0].stop_lon;
          }
          
          capacity = p.capacity * 60;
          delay = p.delay;
          speed = (1 - p.speedFromPrevStop / 30) * 100;
          
          map.addOverlay(lat, lon, capacity, yellow)
          map.addOverlay(lat, lon, speed, blue)
        }
        
      }
      
      /*
      trip.filter("4116537-05");

      trip.top(10).forEach(function(p, i){
        console.log(p, i)
      })
      */

    });
}
  
