
Meteor.publish('jobStreetQuery', function (query,mod) {
	console.log(query);
	// console.log(mod);

	if (query && this.userId) {
		let data = JobStreetItems.find({query});

		return data;
	} else {
		return [];
	}
});