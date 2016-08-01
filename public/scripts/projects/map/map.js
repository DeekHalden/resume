function initMap() {
    // Create a map object and specify the DOM element for display.
    var mapOptions = {
        zoom: 14,
        minZoom: 4
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    return map;
}