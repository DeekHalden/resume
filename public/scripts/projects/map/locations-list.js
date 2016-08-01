var LocationsListClass = function ( locations, map ) {
  this.map = map;
  this.addInfoWindowToMap();
  this.locations = ko.observable(locations.map(this.getLocationItem.bind(this)));
  this.currentFilter = ko.observable('');

  this.filteredLocations = ko.computed(function() {
    var filterString = this.currentFilter(),
        locations = this.locations(),
        filteredArray = [];

    if(filterString) {
      filteredArray = locations.filter(function(item) {
        if (item.location.toLowerCase().indexOf(filterString.toLowerCase()) >= 0) {
          item.makeMarkersVisible();
          return true;
        } else {
          item.makeMarkersHidden();
          return false;
        }
      });
    } else {
      filteredArray = locations.filter(function(item) {
        item.makeMarkersVisible();
        return true;
      });
    }
    return filteredArray;
  }.bind(this)).extend({ throttle: 500 });
};

LocationsListClass.prototype.getLocationItem = function(item) {
  return new LocationItemClass(item, this);
};

LocationsListClass.prototype.addInfoWindowToMap = function() {
  this.infoWindow = new google.maps.InfoWindow({content: 'Loading...'});
};

LocationsListClass.prototype.stopAllMarkersAnimation = function() {
  this.filteredLocations().forEach(function(location) {
    location.markers.forEach(function(marker) {
      marker.setAnimation(null);
    });
  });
};
