document.querySelector('.map').classList.add('map--hidden');
var map;
var marker;

var img = {
  small: "img/map/map__marker--small.png",
  medium: "img/map/map__marker--medium.png"
}

var coords = {
  map: {
    mobile: {
      lat: 59.938870,
      lng: 30.323238
    },
    tablet: {
      lat: 59.938980,
      lng: 30.323238
    },
    desktop: {
      lat: 59.939115,
      lng: 30.319322
    }
  },
  marker: {
    lat: 59.938780,
    lng: 30.323238
  }
};


function generateOpt()
{
  var width = document.body.scrollWidth;
  var opt;

  if(width < 768)
  {
    opt = {
      center: new google.maps.LatLng(coords.map.mobile.lat, coords.map.mobile.lng),
      zoom: 16.65
    };
  }
  else if(width >= 768 && width < 1440)
  {
    opt = {
      center: new google.maps.LatLng(coords.map.tablet.lat, coords.map.tablet.lng),
      zoom: 17.40
    };
  }
  else if(width > 1440)
  {
    opt = {
      center: new google.maps.LatLng(coords.map.desktop.lat, coords.map.desktop.lng),
      zoom: 16.9454
    };
  }

  return opt;
}

function generateIcon()
{
  var width = document.body.scrollWidth;
  var icon;

  if(width < 768)
  {
    icon = img.small;
  }
  else
  {
    icon = img.medium;
  }

  return icon;
}

function initMap() 
{
  var posMarker = new google.maps.LatLng(coords.marker.lat, coords.marker.lng);

  marker = new google.maps.Marker({
    position: posMarker,
    map: map,
    title: "Санкт-Петербург, ул Большая Конюшенная 19/8",
  });



  map = new google.maps.Map(document.getElementById('map'), generateOpt());

  marker.setMap(map);
  marker.setIcon( generateIcon() );
}

function resize()
{
  map.setOptions( generateOpt() );
  marker.setIcon( generateIcon() );
}


window.addEventListener('resize', resize);
