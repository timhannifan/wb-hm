Meteor.methods({
	updateAllSourceDepth: function (newDepth) {
		JobStreetSources.update( { },
							    { $set: {sourceSearchDepth: newDepth }},
							    { multi: true});
	},
	updateOneSourceDepthById: function (id, newDepth) {
		JobStreetSources.update({_id: id},
							    { $set: {sourceSearchDepth: newDepth }},
							    { multi: true});
	},
});