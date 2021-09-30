// GEOJson Api
url =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
const main = async () => {
  const response = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
  );
  const { features } = await d3.json(url).then((data) => {
    return data;
  });
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
    colors = ['#A3F600', '#DCF400', '#F7DB11', '#FDB72A', '#FCA35D', '#FF5F65'];

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend'),
        categories = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
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

  function markerStyle(mag, depth) {
    return {
      fillColor: markerColor(depth),
      radius: 8000 * mag,
      weight: 2,
      opacity: 1,
      color: markerColor(depth),
      fillOpacity: 0.8,
    };
  }

  // Function determining the color of marker based on magnitude
  function markerColor(depth) {
    if (depth >= -10 && depth < 10) {
      return '#A3F600';
    } else if (depth >= 10 && depth < 30) {
      return '#DCF400';
    } else if (depth >= 30 && depth < 50) {
      return '#F7DB11';
    } else if (depth >= 50 && depth < 70) {
      return '#FDB72A';
    } else if (depth >= 70 && depth < 90) {
      return '#FCA35D';
    } else if (depth >= 90) {
      return '#FF5F65';
    } else {
      return 'black';
    }
  }

  for (let feature of features) {
    let [long, lat, depth] = feature.geometry.coordinates;
    let { url, place, title, mag } = feature.properties;

    var circle = L.circle([long, lat], markerStyle(mag, depth)).addTo(mymap);
    circle.bindPopup(
      `<b>${title}</b><br>Magnitude:${mag}<br>Place:${place}<br>Depth:${depth}`
    );
  }
};

main();
