// API key
const API_KEY =
  'pk.eyJ1IjoiYmlsYWx0YWhzZWVuIiwiYSI6ImNrdTdla2V2MjBxeHoyeXBhaXk4dnRlajUifQ.ktpsbQbAbWr9a7_roGbBXw';

// GEOJson Api

const main = async () => {
  const response = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  );
  const { features } = await response.json();

  //   Map Logic here

  var mymap = L.map('map').setView([51.505, -0.09], 13);
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
    let { url, place, title, mag } = feature.properties;
    var circle = L.circle([long, lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 13000 * mag,
    }).addTo(mymap);
    circle.bindPopup(`<b>${title}</b><br>Magnitude:${mag}<br>Place:${place}`);
  }
};

main();
