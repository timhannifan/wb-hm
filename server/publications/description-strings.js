Meteor.publish('DescriptionStrings', function(filter) {
	return DescriptionStrings.find();
});