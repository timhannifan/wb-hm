Meteor.publish('MonsterSources', function() {
	return MonsterSources.find({});
});

Meteor.publish('JobStreetSources', function() {
	return JobStreetSources.find({});
});

Meteor.publish('MonsterItems', function() {
	return MonsterItems.find({});
});

Meteor.publish('Categories', function() {
	return Categories.find({});
});

Meteor.publish('JobStreetItems', function() {
	return JobStreetItems.find({});
});

Meteor.publish('MascoFive', function() {
	return MascoFive.find({});
});

Meteor.publish('MascoFour', function() {
	return MascoFour.find({});
});


Meteor.publish('MascoKey', function() {
	return MascoKey.find({});
});