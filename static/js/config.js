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

  var mymap = L.map('map', {
    center: [0, 0],
    zoom: 3,
    worldCopyJump: true,
  });
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      tileSize: 512,
      maxZoom: 10,
      zoomOffset: -1,
      id: 'streets-v11',
      accessToken: API_KEY,
    }
  ).addTo(mymap);

  //function for creating legend
  function mapLegend(map) {
    colors = ['#459E22', '#7FB20E', '#BEBE02', '#B19A0F', '#B54C0B', '#C00000'];

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend'),
        categories = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'],
        labels = [];
      div.style.backgroundColor = '#fff';
      div.style.padding = '20px';

      div.innerHTML += '<strong> Depth </strong> <br>';
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
          '<div style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background-color:' +
          colors[i] +
          '"></div> ' +
          categories[i] +
          '<br>';
      }
      return div;
    };
    legend.addTo(mymap);
  }
  mapLegend();
  for (let feature of features) {
    let [long, lat, depth] = feature.geometry.coordinates;
    let { url, place, title, mag } = feature.properties;
    var circle = L.circle([long, lat], {
      color: 'black',
      weight: 1,
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 11000 * mag,
    }).addTo(mymap);
    circle.bindPopup(`<b>${title}</b><br>Magnitude:${mag}<br>Place:${place}`);
  }
};

main();
