Meteor.methods({
	// resetMonsterSources: function () {
	//   MonsterSources.remove({});
	// },
	// resetJobStreetSources: function () {
	//   JobStreetSources.remove({});
	// },
	// resetJobStreetItems: function () {
	//   JobStreetItems.remove({});
	// },
	// resetMonsterItems: function () {
	//   MonsterItems.remove({});
	// },
	// jobStreetItemsByCategoryOneOff: function (str) {
	//   JobStreetItems.remove({parentCategory: str});
	// },
	// jobStreetItemsBySourceOneOff: function (str) {
	//   JobStreetItems.remove({subSpecialization: str});
	// },
	// jobStreetSourceByCategoryOneOff: function (str) {
	//   JobStreetSources.remove({sourceCategory: str});
	// },
	// jobStreetSourceBySpecializationOneOff: function (str) {
	//   JobStreetSources.remove({sourceSpecialization: str});
	// },
	resetTrackedSkills: function () {
		if (this.userId){
			var data = JobStreetItems.find({});

			data.forEach(function (post) {

				JobStreetItems.update({_id: post._id},{
					$set: {
						trackedSkills: [],
						skillsClassified: []
					}
				});
			});

			console.log('TrackedSkills affected items: ' + data.count());			
		}
	},
	resetSkillsDb: function() {
		if (this.userId){
			var rem1 = Skills.remove({});
			var rem2 = Counts.remove({});
			console.log('skills removed: ' + rem1);
			console.log('counts removed: ' + rem2);
		}
	}
});