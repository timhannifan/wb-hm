Meteor.publish('Sources', function() {
	return Sources.find({});
});

Meteor.publish('SourceItems', function() {
	return SourceItems.find({});
});


Meteor.publish('Categories', function() {
	return Categories.find({});
});
