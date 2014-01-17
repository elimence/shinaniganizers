function init() {
  function getCoordsData() {
    var coordsData = [];
    $('.coord').each(function (index, item) {
      var coordObj = {};
      coordObj.lat = parseFloat($(item).attr('data-location-lat'));
      coordObj.lng = parseFloat($(item).attr('data-location-lng'));
      coordObj.name = $(item).attr('data-location-name');
      coordObj.status = $(item).attr('data-location-status');
      coordsData.push(coordObj);
    });
    return coordsData;
  }

  // LatLongs
  // var coords = [{
  //   lat: 7.409452289977754,
  //   lng: 0.465545654296875,
  //   name: 'Place A'
  // }, {
  //   lat: 10.113541941247412,
  //   lng: -2.38677978515625,
  //   name: 'Place B'
  // }, {
  //   lat: 10.759449196015233,
  //   lng: -0.84320068359375,
  //   name: 'Place C'
  // }];
  var coords = getCoordsData();
  var map, marker;
  var infoWindow = new google.maps.InfoWindow({content: "placeholder"});

  console.log(coords);

  function showInfoWindow(marker) {
    var infowindowOptions = {
      content: marker.title
    };
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
  }

  function addMarkerClickListener(marker, handler) {
    google.maps.event.addListener(marker, 'click', handler);
  }

  function attachListener(val) {
    addMarkerClickListener(val, function(e) {
        showInfoWindow(val);
    });
  }

  function addMarker(latlongObj) {
    var markerOpts = {
      position: new google.maps.LatLng(latlongObj.lat, latlongObj.lng),
      title: latlongObj.name + ', Status ' + latlongObj.status,
      icon: "https://s3-us-west-2.amazonaws.com/playfield/broken-pipe.png"
    };
    marker = new google.maps.Marker(markerOpts);
    marker.setMap(map);
    bounce(marker);
    attachListener(marker);

  }

  function plotLocations(latLngs) {
    for (var i=0; i < latLngs.length; i++) {
      // console.log(latLngs[i]);
      addMarker(latLngs[i]);
    }
  }
  
  // Map Options
  var myOptions = {
    zoom: 7,
    center: new google.maps.LatLng(8.018435736309621, -1.2799072265625),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Load Map
  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

  // Plot Location Markers
  plotLocations(coords);

  function bounce(marker) {
    // Is the marker already animating?
    if (marker.getAnimation()) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        bounce(marker);
      }, 7000);
    }
  }
}