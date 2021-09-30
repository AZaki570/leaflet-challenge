// API key
const API_KEY =
  'pk.eyJ1IjoiYmlsYWx0YWhzZWVuIiwiYSI6ImNrdTdkNHA4azM2NG4yb3FoOW55MzZlaDkifQ.dOmHYECQZlLrtmZq4cBncA';

// GEOJson Api

const main = async () => {
  const response = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
  );
  const { features } = await response.json();

  //   Map Logic here
  let [Ilong, Ilat, Idepth] = features[0].geometry.coordinates;
  var mymap = L.map('map').setView([Ilong, Ilat], 13);
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${API_KEY}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: API_KEY,
    }
  ).addTo(mymap);
  for (let feature of features) {
    let [long, lat, depth] = feature.geometry.coordinates;
    var circle = L.circle([long, lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(mymap);
  }
};

main();
