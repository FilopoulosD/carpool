// Initialize and add the map
function initMap() {
    const doiranis = { 
        lat: 38.257823, 
        lng: 21.744899 
    };
    //Map 
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: doiranis,
    });
    //Pointer
    const pointer = new google.maps.Marker({
      position: doiranis,
      map: map,
    });
}
  