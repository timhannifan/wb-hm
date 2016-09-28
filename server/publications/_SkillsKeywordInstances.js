Meteor.publish('keywordMatchList', function(_id,limit) {
  return SkillsKeywordInstances.find(
	 	{ keywordId: _id }, 
  	{
  		limit: limit,
  		sort: {
  			createdAt: -1
  		}, 
  		fields: {
  			keywordId : 1,
  			keywordMatch : 1,
  			keywordType : 1,
  			source : 1,
  			id : 1,
  			parentCategory : 1,
  			subSpecialization : 1,
  			listedIndustry : 1,
  			listedSpec : 1,
  			listedRole : 1,
  			companySnapIndustry : 1,
  			experience : 1,
  			createdAt : 1
	    }
	  }
  )
});