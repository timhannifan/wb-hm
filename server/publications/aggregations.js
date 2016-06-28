Meteor.publish('skillsAggregations', function(filter) {
	console.dir(filter);
	return SkillsAggregations.find();
});
