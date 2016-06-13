Meteor.startup(function () {
	
	// var  data = Skills.aggregate([
	// 		{ $unwind : "$associatedItems" },
	// 		{ $project: {_id: 0, industry: "$associatedItems.industry", specialization: "$associatedItems.specialization", role: "$associatedItems.role",  industryAlt: "$associatedItems.industryAlt", parsedKeyword: "$parsed_keyword"}},
	// 		{ $group: {_id: "$industry", count: { $sum: 1 }}},

	// 	]);

	// if (data) {
	// 	console.log(data.length);
	// 	console.log(data);
	// };
});	
	