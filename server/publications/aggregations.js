Meteor.publish('SkillsAggregations', function(filter) {
	return SkillsAggregations.find();
});
