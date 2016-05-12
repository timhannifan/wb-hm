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
	resetJobStreetSources: function () {
	  JobStreetSources.remove({});
	},
});