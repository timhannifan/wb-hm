Meteor.methods({
	updateAllSourceDepth: function (newDepth) {
		return JobStreetSources.update({},{
			$set: {
				sourceSearchDepth: newDepth
			}
		});
	},
	updateOneSourceDepthById: function (id, newDepth) {
		return JobStreetSources.update({_id: id},{
			$set: {
				sourceSearchDepth: newDepth
			}
		});
	},
});