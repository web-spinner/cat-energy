document.querySelector('.map').classList.add('map--hidden');

var map;
var marker;

var img = {
    small: {
      path: "img/map/map__marker--small.png",
      size: [55, 53],
    },
    medium: {
      path: "img/map/map__marker--medium.png",
      size: [113, 106],
    },
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
    mobile: {
      lat: 59.938980,
      lng: 30.323038
    },
    tablet: {
      lat: 59.939280,
      lng: 30.322838
    }, 
    desktop: {
      lat: 59.939280,
      lng: 30.322838
    }
  }
};

function generateOpt()
{
  var width = document.body.scrollWidth;
  var opt;

  if(width < 768)
  {
    opt = {
      center: [coords.map.mobile.lat , coords.map.mobile.lng],
      marker: [coords.marker.mobile.lat, coords.marker.mobile.lng],
      zoom: 16.65
    };
  }
  else if(width >= 768 && width < 1440)
  {
    opt = {
      center: [coords.map.tablet.lat, coords.map.tablet.lng],
      marker: [coords.marker.tablet.lat, coords.marker.tablet.lng],
      zoom: 17.40
    };
  }
  else if(width > 1440)
  {
    opt = {
      center: [coords.map.desktop.lat, coords.map.desktop.lng],
      marker: [coords.marker.desktop.lat, coords.marker.desktop.lng],
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
    icon = {
      path: img.small.path,
      size : img.small.size,
    }
  }
  else
  {
    icon = {
      path: img.medium.path,
      size : img.medium.size,
    }
  }

  return icon;
}

function init(){
  var opt = generateOpt();
  var icon = generateIcon();
  map = new ymaps.Map("map", {
    center: opt.center,
    zoom: opt.zoom,
    controls: ['zoomControl']

  })

  marker = new ymaps.Placemark(opt.marker, {
    hintContent: '191186, Санкт-Петербург, ул. Б. Конюшенная, д. 19/8',

  }, {
    iconLayout: 'default#image',
    iconImageHref: icon.path,
    iconImageSize: icon.size,
    iconImageOffset: [0, 0]
  });

  map.geoObjects.add(marker);

}

function rersize()
{
  var opt = generateOpt();
  var icon = generateIcon();

  map.setCenter(opt.center, opt.zoom);
  marker.options.set('iconImageHref', icon.path);
  marker.options.set('iconImageSize', icon.size);
}

ymaps.ready(init);

window.addEventListener('resize', rersize);
