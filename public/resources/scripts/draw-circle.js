city = "sf";

CITY_CENTER = {
  sf : new google.maps.LatLng(37.7750, -122.4183),
  geneva : new google.maps.LatLng(46.2000, 6.1500),
  zurich : new google.maps.LatLng(47.3690, 8.5380)
}

pink = "#E07C94";
orange = "#E48E3B";
green = "#B8CF81";
blue = "#9EC5D9";

var circleOptions = {
    strokeColor: pink,
    strokeOpacity: 0.8,
    strokeWeight: .8,
    fillColor: "#FFFFFF",
    fillOpacity: 0.0,
    map: map,
    center: CITY_CENTER[city],
    radius: 100
};

var circle = new google.maps.Circle(circleOptions);

circleOptions.strokeColor = blue
circleOptions.radius= 150
var circle = new google.maps.Circle(circleOptions);

circleOptions.strokeColor = green
circleOptions.radius= 200
var circle = new google.maps.Circle(circleOptions);

circleOptions.strokeColor = orange
circleOptions.radius= 250
var circle = new google.maps.Circle(circleOptions);
