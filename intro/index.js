let map = L.map('map').setView([7.06772, -73.74603], 17);

var options = { timeout: 5000 }
var box = L.control.messagebox(options).addTo(map);
//Agregar tilelAyer mapa base desde openstreetmap

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


document.getElementById('select-location').addEventListener('change', function (e) {
  let coords = e.target.value.split(",");
  
  var combo = document.getElementById("select-location");
  var selected = combo.options[combo.selectedIndex].text;
  
  if(selected == "Edificio de aulas"){

    L.geoJson(c,{
      style:style,
        onEachFeature: onEachFeature
      }).addTo(map);
      
      function style(feature) {
        return {
          
          fillColor: getColor(feature.properties.name),
          weight: 2,
          opacity: 1.0,
          color: 'black',
          
        }
      } 
      map.flyTo(coords, 18);
      console.log("asdad");
    }


});

/* AGREGA LAS CAPAS */


Unipaz = L.geoJson(MyGeoJson, {
  style: style,
  onEachFeature: onEachFeature
 
}).addTo(map);





/* Agregar capa en formato GeoJson
L.geoJson(MyGeoJson).addTo(map); */

/* Agregar Legend */

const legend = L.control.Legend({
  position: "bottomright",
  collapsed: false,
  symbolWidth: 24,
  opacity: 1,
  column: 1,
  legends: [
    {
      label: "Edifio de aulas",
      type: "rectangle",
      radius: 6,
      color: "red",
      fillColor: "#33FF6B",
      fillOpacity: 0.6,
      weight: 2,
      layers: Unipaz,
      inactive: false,
    },
    {
      label: "Edifio de addmin",
      type: "rectangle",
      radius: 6,
      color: "red",
      fillColor: "#33FF6B",
      fillOpacity: 0.6,
      weight: 2,
      layers: c,
      inactive: true,
    }
  ]
}).addTo(map);

/* AGRETGAR INFO HOVER */

let info = L.control();

/* CREA EL DIV DE INFO */
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
}

/* ACTUALIZA EL CONTROL HOVER */

info.update = function (props) {
  this._div.innerHTML = "" + (props ? '<bold>Nombre: </bold>' + props.name + '<br>' : 'Pase el puntero por un edificio');
}
info.addTo(map);

/* GENERAL EL COLOR */

function getColor(color) {
  return color = "Edificio de aulas" ? "#10e009 " : '';

}

function style(feature) {
  return {

    fillColor: getColor(feature.properties.name),
    weight: 2,
    opacity: 1.0,
    color: 'white ',

  }
}


/* INTERACCION DEL PUNTERO  */

function borderbox(event) {
  let layer = event.target;

  layer.setStyle({
    weight: 1,
    color: '#17202A',
    dashArray: '',
    fillOpacity: 0.7,
    id: "jhan"
  });
  info.update(layer.feature.properties);
}


function resetBorderBox(event) {
  Unipaz.resetStyle(event.target);
  info.update();
}

function zoomToFeature(event) {
  map.fitBounds(event.target.getBounds());
  
  
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: borderbox,
    mouseout: resetBorderBox,
    click: zoomToFeature,
  });
  layer.bindPopup("<strong>Edificio: </strong>" + feature.properties.name + "<br/>");
}


/* ALERTA */

var options = { timeout: 3000 }
var box = L.control.messagebox(options).addTo(map);
box.show('Mapa interactivo de UNIPAZ');

/* apas */




