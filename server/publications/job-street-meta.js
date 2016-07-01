Meteor.publish('JobStreetMeta', function() {
	// console.dir(filter);
	return JobStreetMeta.find({
		type: {$in: ['parentCategory','subSpecialization','listedIndustry','listedSpec', 'listedRole', 'companySnapIndustry', 'experience']}
	}, {
		fields: {
			name: 1,
			type: 1
		}
	});
});
