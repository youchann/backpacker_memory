function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.4239163, lng: -122.0947209 },
    zoom: 14,
    mapId: "xxx",
  });

  // A marker with a with a URL pointing to a PNG.
  const beachFlagImg = document.createElement('img');
  beachFlagImg.src = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  const beachFlagMarkerView = new google.maps.marker.AdvancedMarkerView({
      map,
      position: { lat: 37.434, lng: -122.082 },
      content: beachFlagImg,
      title: 'A marker using a custom PNG Image',
  });
  // Add a click listener for each marker, and set up the info window.
  beachFlagMarkerView.addListener("click", ({ domEvent, latLng }) => {
    console.log("hoge")
  });
}

window.initMap = initMap;