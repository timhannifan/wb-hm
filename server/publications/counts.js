Meteor.publish('countsBySkillId', function (id) {
	return Counts.find({skillId: id});
});

