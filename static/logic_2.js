var count = ('static/country_count.csv')

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY,
});

var myMap = L.map("mapid", {
  center: [40.7, -94.5],
  zoom: 2,
});

lightmap.addTo(myMap);



d3.csv(count).then(function (data) {
  console.log(data)
// function createMarkers(data) {
  var Markers = []
  for (var i = 0; i < data.length; i++) {
    var arrivals = data[i];
    // var arrivalMarker = L.marker([arrivals.Lat, arrivals.Long], {icon: icons});
    var arrivalMarker = L.marker([arrivals.Lat, arrivals.Long]);
    arrivalMarker.bindPopup("<h1>Country: "+ arrivals.Country+ "<h1> Airport: " + arrivals.Arrive + "<h1>Number of Flights: " + arrivals.Count).addTo(myMap);
    Markers.push(arrivalMarker);
  };
});