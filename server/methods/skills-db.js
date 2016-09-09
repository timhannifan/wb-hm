Meteor.methods({
	resetSkillsAndCounts: function() {
		if (this.userId){
			// var rem1 = Skills.remove({}, function (err,res){if(res){console.log('Completed resetting skillsDb.')}});
			return Skills.remove({}, function (err,res){if(res){console.log('Completed resetting skillsDb.')}});
		}
	},	
	insertSkill: function (data) {
		check( data.skill_keyword, String );
		check( data.type, String );
		console.log(data);

		var item   = data,
		exists = Skills.findOne( { skill_keyword: item.skill_keyword } );

		if ( exists ) { 
		  console.warn( 'Rejected. This item already exists.' );  
		} else {
			nObj = {};
			nObj.type = item.type;
			nObj.skill_keyword = item.skill_keyword;
			nObj.parsed_keyword = item.skill_keyword.toLowerCase();
			nObj.createdAt = new Date();
			nObj.lastUpdated = new Date();
			nObj.count = 0;
		  
		  Skills.insert(nObj);
		}
		
	},
	mongoTextSearch: function (match) {
		check( match, String );
		// 
		let data = JobStreetItems.find( 
				{ $text: { $search: match, $language: 'en' }},
			  { sort: { textScore: 1 } }
			  // {sort: {score:}}
		);
		// console.log(data.sort( { score: { $meta: "textScore" } } ).limit(2));
		console.log(data.fetch()[0]);
		return data;
	},
	runSkillClassification: function () {
		var skills = Skills.find({});
		
		skills.forEach(function (skillsItem) {

			var keyword = skillsItem.skill_keyword;

			var data = JobStreetItems.find(
				{ descriptionTags: { $in:[ skillsItem.skill_keyword ] }	}
				,{
					fields: {
						parentCategory: 1,
						subSpecialization: 1,
						listedSpec: 1,
						listedRole: 1,
						listedIndustry: 1,
						companySnapIndustry: 1
					}
				}
			);			

			if (data){
				
				data.forEach(function (jsItem) {

					JobStreetItems.update({_id: jsItem._id}, {
						$push: {
							trackedSkills: {skillId: skillsItem._id, dummyvar: 1}
						}
					});


					// parentCategory: 1,
					// subSpecialization: 1,
					// listedSpec: 1,
					// listedRole: 1,
					// listedIndustry: 1,
					// companySnapIndustry: 1

					Counts.upsert({
						parentCategory:  jsItem.parentCategory,
						subSpecialization: jsItem.subSpecialization,
						skillId: skillsItem._id,
						skillName: skillsItem.parsed_keyword,
						industry: jsItem.listedIndustry,
						specialization: jsItem.listedSpec,
						role: jsItem.listedRole,
						companySnapIndustry: jsItem.companySnapIndustry
						},{
							$inc: {
							count: 1
						},
					});
				});

				Skills.update({_id: skillsItem._id},
					{
						$inc: {
							count: data.count()
						},
						$set: {
							lastUpdated: new Date()
						}						
					}
				);

				JobStreetItems.update({},
					{
						$addToSet: {
							skillsClassified: skillsItem._id
						}
					}
				);
			}

		});	
	},
	deleteSkill: function (_id) {
		check( _id, String );
		var id = _id;
		var user = this.userId;
		// console.log(_id);
		if (this.userId) {
			try {
				return Skills.remove({_id: id}, function(err, res){
					if (err) {
						console.log(err);
					} else {
						console.log('skill ' + id + ' deleted sucessfully by user ' + user);
					}
				});
			} catch ( exception ) {
				return exception;
			}	
		}
	}
});

let _runClassificationOnNewSkill = ( id, keyword, callback ) => {
	let data = JobStreetItems.find({
					descriptionTags: { $in:[ keyword ] }
				},{
					fields: {
						parentCategory: 1,
						subSpecialization: 1,
						listedSpec: 1,
						listedRole: 1,
						listedIndustry: 1,
						companySnapIndustry: 1
					}
				}
	);

	return _classifyThis(data, id, keyword);
};

let _upsertCountInstance = (data, id, keyword) => {
}
