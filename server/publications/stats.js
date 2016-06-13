Meteor.publish('stats', function (id) {
	return Counts.find({});
});
