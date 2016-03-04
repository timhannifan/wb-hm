Template.map.rendered = function () {
	
  // var mapsAPI = document.querySelector('google-maps-api');
  // mapsAPI.addEventListener('api-load', function(e) {
  // 	console.log('mapsAPI loaded!');
  //   // this.api === google.maps
  // });

	var map = document.querySelector('google-map');
	// map.latitude = 37.77493;
	// map.longitude = -122.41942;
	map.addEventListener('google-map-ready', function(e) {
	  console.log('Map loaded!');
	});


};