Meteor.publish('MascoFive', function() {
	return MascoFive.find({});
});

Meteor.publish('MascoFour', function() {
	return MascoFour.find({});
});

Meteor.publish('MascoKey', function() {
	return MascoKey.find({});
});
