Meteor.publish('MonsterSources', function() {
	return MonsterSources.find({}, {sort: {sourceCategory: 1}});
});

Meteor.publish('JobStreetSources', function() {
	return JobStreetSources.find({}, {sort: {sourceCategory: 1}});
});

Meteor.publish('MonsterItems', function() {
	return MonsterItems.find({});
});

Meteor.publish('Categories', function() {
	return Categories.find({});
});

Meteor.publish('JobStreetItems', function() {
	return JobStreetItems.find( {title: {$ne: null} }, {sort: {createdAt: -1}}  );
});
Meteor.publish('JobStreetItemsLimited', function() {
	return JobStreetItems.find( {
		title: {$ne: null} 
	}, {
		limit: 1000,
		sort: {
			createdAt: 1
		},
		fields: {
			title: 1,
			// titleTags: 1,
			company: 1,
			location: 1,
			// experience: 1,
			// description: 1,
			// descriptionTags: 1,
			companySnapIndustry: 1,
			// url: 1,
			parentCategory: 1,
			subSpecialization: 1,
			listedSpec: 1,
			listedRole: 1,
			listedIndustry: 1,
			// datePosted: 1,
			// dateClosing: 1,
			createdAt: 1
		}
	});
});
Meteor.publish('JobStreetItemsById', function(_id) {
	return JobStreetItems.find({_id:_id}, {
		fields: {
			title: 1,
			titleTags: 1,
			company: 1,
			location: 1,
			experience: 1,
			description: 1,
			descriptionTags: 1,
			companySnapIndustry: 1,
			url: 1,
			parentCategory: 1,
			subSpecialization: 1,
			listedSpec: 1,
			listedRole: 1,
			listedIndustry: 1,
			datePosted: 1,
			dateClosing: 1,
			createdAt: 1	
		}
	});
});

Meteor.publish('MascoFive', function() {
	return MascoFive.find({});
});

Meteor.publish('MascoFour', function() {
	return MascoFour.find({});
});


Meteor.publish('MascoKey', function() {
	return MascoKey.find({});
});
