var count = ('country_count.csv')
var icons = {
  ATL: L.ExtraMarkers.icon({
    icon: "ion-android-airplane",
    iconColor: "white",
    markerColor: "red",
    shape: "star"
  }),
  LAX: L.ExtraMarkers.icon({
    icon: "ion-android-airplane",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  }),
  BOTH: L.ExtraMarkers.icon({
    icon: "ion-android-airplane",
    iconColor: "white",
    markerColor: "purple",
    shape: "penta"
  })

};
var layers_airport = {
  ATL: new L.LayerGroup(),
  LAX: new L.LayerGroup(),
  BOTH: new L.LayerGroup(),
};
// function createMap(arrival) {
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
  layers: [
    layers_airport.ATL,
    layers_airport.LAX,
    layers_airport.BOTH,
  ]
});

lightmap.addTo(myMap);

var overlays = {
  "Atlanta": layers_airport.ATL,
  "Los Angeles": layers_airport.LAX,
  "Both": layers_airport.BOTH,
};
L.control.layers(layers_airport, overlays).addTo(myMap);


console.log(icons)

var legend = L.control({
  position: "bottomright"
});
function getColorGrades(Airport) {
  if (Airport === "LAX") {
    return 'blue'
  } else if (Airport ==="ATL") {
    return 'red'
  } else if (Airport === "BOTH") {
    return 'purple'
  }
};

legend.onAdd = function (myMap) {
  var div = L.DomUtil.create("div", "info legend"),
    Airport = ["LAX", "ATL", "BOTH"]
  div.innerHTML += "<h3 style='text-align: center'>Airport</h3>"

  for (var i = 0; i < Airport.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColorGrades(Airport[i]) + '"></i> ' +"<br>"+ Airport[i] +
       '<br>';
  }
  return div;
}
legend.addTo(myMap);

d3.csv(count).then(function (data) {
  console.log(data)
// function createMarkers(data) {
  var Markers = []
  for (var i = 0; i < data.length; i++) {
    var arrivals = data[i];
    var arrivalMarker = L.marker([arrivals.Lat, arrivals.Long], {icon: icons});
    arrivalMarker.bindPopup("<h1> Airport: " + data.Arrive + "<h1>Number of Flights: " + data.Count);
    Markers.push(arrivalMarker);

    // if (data.Arrive === "LAX") {
    //   countryStatusCode = "LAX"
    // }
    // else if (data.Arrive === "ATL") {
    //   countryStatusCode = "ATL"
    // }
    // else if (data.Arrive === "BOTH") {
    //   countryStatusCode = "BOTH"
    // }
    // var Markers = L.marker([data[i].Lat, data[i].Long], { icon: icons });
    // // .addTo(myMap)
    // Markers.addTo(layers_airport);
    // Markers.bindPopup("<h1>Airport: " + data.Arrive +
    //   "<h1>Number of Flights:  " + data.Count)
  };
  // createMap(L.LayerGroup(bikeMarkers));
});
// }
// // d3.csv(count).then(createMarkers);


// var myMap = L.map("mapid", {
//   center: [45.52, -122.67],
//   zoom: 13
// });

// // Adding a tile layer (the background map image) to our map
// // We use the addTo method to add objects to our map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);