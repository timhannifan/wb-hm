Meteor.publish('JobStreetSources', function() {
  return JobStreetSources.find({}, {sort: {sourceCategory: 1}});
});

Meteor.publish('JobStreetItems', function() {
  return JobStreetItems.find( {title: {$ne: null} }, {sort: {createdAt: -1}}  );
});

Meteor.publish('JobStreetItemsLimited', function() {
  return JobStreetItems.find( {
    title: {$ne: null} 
  }, {
    sort: {
      createdAt: -1
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

Meteor.publish('JobStreetTitlesAndDates', function() {
  return JobStreetItems.find({}, {
    fields: {
      title: 1,
      createdAt: 1  
    }
  });
});

Meteor.publish('JobStreetTrackedSkills', function(id) {
  
  return JobStreetItems.find({"trackedSkills.skillId": {$eq: id}}, {
    fields: {
      title: 1,
      parentCategory: 1,
      subSpecialization: 1,
      listedSpec: 1,
      listedRole: 1,
      listedIndustry: 1,
      createdAt: 1
    },
    limit: 100
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

Meteor.publish( 'jobstreetItemIds', function() {
  return [
  	JobStreetItems.find( 
  		{
  			title: {$ne: null} 
  		}, 
  		{
  			sort: {createdAt: -1},
  			fields: {
  				createdAt: 1
  			}
  		},	
	)
  ];
});