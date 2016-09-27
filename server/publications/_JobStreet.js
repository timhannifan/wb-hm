Meteor.publish('jobStreetQuery', function (query,limit) {
  Meteor._sleepForMs(2000);
  // console.log(query)
  return JobStreetItems.find(query, 
  	{
  		limit: limit,
  		sort: {
  			createdAt: -1
  		}, 
  		fields: {
				title: 1,
	      company: 1,
	      experience: 1,
	      companySnapIndustry: 1,
	      parentCategory: 1,
	      subSpecialization: 1,
	      listedSpec: 1,
	      listedRole: 1,
	      listedIndustry: 1,
	      createdAt: 1
	    }
	  }
  );
});