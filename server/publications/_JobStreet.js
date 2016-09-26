let extend = ( obj, src ) => {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};
Meteor.publish('jobStreetQuery', function (query,mod) {
	

	if (query && this.userId) {
		let data = JobStreetItems.find({query});

		return data;
	} else {
		return [];
	}
});