Meteor.publish('Sources', function() {
	return Sources.find({});
});

Meteor.publish('JobStreetSources', function() {
	return JobStreetSources.find({});
});

Meteor.publish('SourceItems', function() {
	return SourceItems.find({});
});


Meteor.publish('Categories', function() {
	return Categories.find({});
});

Meteor.publish('JobStreetItems', function() {
	return JobStreetItems.find({});
});
