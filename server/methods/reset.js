Meteor.methods({
	resetMonsterSources: function () {
	  MonsterSources.remove({});
	},
	resetJobStreetSources: function () {
	  JobStreetSources.remove({});
	},
	resetJobStreetItems: function () {
	  JobStreetItems.remove({});
	},
	resetMonsterItems: function () {
	  MonsterItems.remove({});
	},
	jobStreetItemsByCategoryOneOff: function (str) {
	  JobStreetItems.remove({parentCategory: str});
	},
	jobStreetItemsBySourceOneOff: function (str) {
	  JobStreetItems.remove({subSpecialization: str});
	},
	jobStreetSourceByCategoryOneOff: function (str) {
	  JobStreetSources.remove({sourceCategory: str});
	},
	jobStreetSourceBySpecializationOneOff: function (str) {
	  JobStreetSources.remove({sourceSpecialization: str});
	},
});