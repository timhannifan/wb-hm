Meteor.publish('JobStreetMeta', function() {
	// console.dir(filter);
	return JobStreetMeta.find();
});
