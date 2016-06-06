Meteor.publish('skills', function() {
	return Skills.find( {} );
});

Meteor.publish('skillsList', function() {
	return Skills.find( {} );
});