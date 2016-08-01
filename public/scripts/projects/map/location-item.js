var LocationItemClass = function ( location, list) {
  this.location = location;
  this.list = list;
  this.map = list.map;
  this.infoWindow = list.infoWindow;
  this.notFound = ko.observable(false);
  this.markers = [];

  this.searchByName( this.addMarkersToMap );
};

LocationItemClass.prototype.searchByName = function(callback) {
  // creates a Google place search service object. PlacesService does the work of
  // actually searching for location data
  var service = new google.maps.places.PlacesService(this.map);

  // Actually searches the Google Maps API for location data and runs the callback
  // function with the search results after each search
  service.textSearch(
    { query: this.location },
    this.searchByNameCallback.bind(this, callback)
  );
};

LocationItemClass.prototype.searchByNameCallback = function(callback, results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    callback.call(this, results);
  } else {
    this.notFound(true);
    console.log('Sorry , Can\'t Load Data');
  }
};

LocationItemClass.prototype.addMarkersToMap = function(results) {
  this.markers = results.map(this.addMarker.bind(this));
};

LocationItemClass.prototype.addMarker = function(item) {
  var lat, lon, bounds, marker;

  lat = item.geometry.location.lat(); // latitude from the place service
  lon = item.geometry.location.lng(); // longitude from the place service
  bounds = window.mapBounds; // current boundaries of the map window

  // marker is an object with additional data about the pin for a single location
  marker = new google.maps.Marker({
    map: this.map,
    position: item.geometry.location,
    animation: google.maps.Animation.DROP
  });

  // Add event listener to marker and animate it when it get clicked.
  google.maps.event.addListener(marker, 'click', this.showInfoWindow.bind(this, marker) );

  //marker.addListener('mouseover', this.showInfoWindow.bind(this, marker) );
  //marker.addListener('mouseout', this.hideInfoWindow.bind(this) );

  bounds.extend(new google.maps.LatLng(lat, lon));
  // center the map
  this.map.setCenter(bounds.getCenter());
  this.map.fitBounds(bounds);

  marker.searchResult = item;
  return marker;
};

// method chained to data-bind in index.html which is showin currently clicked markers
LocationItemClass.prototype.showMarkers = function() {

  this.list.stopAllMarkersAnimation();
  this.markers.forEach(function(marker) {
    google.maps.event.trigger(marker, 'click');
    marker.setAnimation(google.maps.Animation.BOUNCE);
  });
};

// this method opens infoWindow and adds tips during it loads
LocationItemClass.prototype.showInfoWindow = function(marker) {
  this.list.stopAllMarkersAnimation();
  this.map.setCenter(marker.getPosition());
  this.infoWindow.setContent("Loading...");
  this.infoWindow.open(this.map, marker);
  this.getInfoWindowContent(marker, function(content) {
    this.infoWindow.setContent(content);
  }.bind(this));
};

// this method closes infoWindow
LocationItemClass.prototype.hideInfoWindow = function() {
  this.infoWindow.close();
};

LocationItemClass.prototype.makeMarkersVisible = function() {    //
  this.markers.forEach(function(marker) {                        //
    marker.setVisible(true);                                     //
  });                                                            //
                                                                 //
};                                                               // methods made for filter work simplier  
LocationItemClass.prototype.makeMarkersHidden = function() {     //
  this.markers.forEach(function(marker) {                        //
    marker.setVisible(false);                                    //
  });                                                            //
};                                                               //

// method shows default info about locations if no other info found or if request fails
LocationItemClass.prototype.setDefaultInfo = function(marker, callback) {
  marker.storedResult = marker.searchResult.name;
  return callback(marker.storedResult);
};

LocationItemClass.prototype.getInfoWindowContent = function(marker, callback) {
  if(marker.storedResult) {
    callback(marker.storedResult);
  } else {
    this.getVenuesListFromFoursquare(marker, callback);
  }
};

// sends GET request to Foursquare api to get list of venues based on their latitude and longitude  
LocationItemClass.prototype.getVenuesListFromFoursquare = function(marker, callback) {
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: 'https://api.foursquare.com/v2/venues/search',
    data: {
      ll: marker.position.lat() + ',' + marker.position.lng(),
      client_id: 'BHTTXP2QZ1D3A1LDT1JJHOQH4Y3VGXP24SHMIPHOWTLO0DVA',
      client_secret: 'GUQA4EATBIAT4GEP5GIJJVZPCKLB3AOEI0PKT4C4DUTMCCKQ',
      v: '20151222',
      query: marker.searchResult.name
    }
  })
  .success( this.getVenueInfoFromFoursquare.bind(this, marker, callback) )
  .fail( this.setDefaultInfo.bind(this, marker, callback) );
};

// sends GET request to Foursquare api to get info about current venue
LocationItemClass.prototype.getVenueInfoFromFoursquare = function(marker, callback, result) {
  if (!result.response.venues.length) {
    return this.setDefaultInfo(marker, callback);
  }

  $.ajax({
    type: "GET",
    crossDomain: true,
    url: 'https://api.foursquare.com/v2/venues/' + result.response.venues[0].id,
    data: {
      client_id: 'BHTTXP2QZ1D3A1LDT1JJHOQH4Y3VGXP24SHMIPHOWTLO0DVA',
      client_secret: 'GUQA4EATBIAT4GEP5GIJJVZPCKLB3AOEI0PKT4C4DUTMCCKQ',
      v: '20151222'
    }
  }).success(function(result) {
    marker.storedResult = this.formatHTMLFromFoursquare(result.response.venue);
    callback(marker.storedResult);
  }.bind(this)).fail( this.setDefaultInfo.bind(this, marker, callback) );
};


// infoWindow content
LocationItemClass.prototype.formatHTMLFromFoursquare = function(venue) {
  var content = '<div id="iw-container">' +
      '<div class="iw-title">' + '<a href="'+ venue.shortUrl +'" target="_blank">' +venue.name+ ' </a>' + '<br>'+
      '<span> Rating: ' +
      (venue.rating || 'noone rated this place') + '</span>' + '</div>' +
      '<div class="iw-content">' +
        '<div class="iw-subTitle">Comment</div>' +
        '<p>' + (venue.tips.groups[0].items[0]?venue.tips.groups[0].items[0].text:'- - -') + '</p>'+
        '<div class="iw-subTitle">Contacts</div>' +
        '<p>' + venue.location.formattedAddress.join('<br>') +
      '</div>'+
    '</div>';
  return content;
};
