// model. Hardcoded list of locations
var locations = [
    'Berdyansk, The Village',
    'Berdyansk, Skiba',
    'Berdyansk, 999',
    'Berdyansk, Sun Resort',
    'Berdyansk, Primorkaya sq.',
    'Berdyansk, Celentano',
    'Berdyansk, AkvaPark',
];

// init function which runs the app
function init() {
	var map, locationsListViewModel;

	map = initMap();

	locationsListViewModel = new LocationsListClass(locations, map);
	ko.applyBindings(locationsListViewModel);
}

var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
  	init();
  }
}, 10);