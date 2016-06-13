
Meteor.methods({
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
		  
		  Skills.insert(nObj);
		}
		
	},
	uploadSkills: function (data) {
		check( data, Array );

		for ( i = 0; i < data.length; i++ ) {
			console.log(data[ i ]);
		  var item   = data[ i ],
		  exists = Skills.findOne( { skill_keyword: item.skill_keyword } );

		  if ( exists ) { 
		    console.warn( 'Rejected. This item already exists.' );  
		  } else {
		  	nObj = {};
		  	nObj.type = data [i].type;
		  	nObj.skill_keyword = data [i].skill_keyword;
		  	nObj.parsed_keyword = data [i].skill_keyword.toLowerCase();
		  	nObj.associatedItems = [];
		  	nObj.createdAt = new Date();
		    
		    Skills.insert(nObj);
		  }
		}
		
	},
	mongoTextSearch: function () {
		var data = JobStreetItems.find({
		  $text:
		    {
		      	
		      	$search: 'power point',
		      	$language: 'en'
		    }
		}).fetch();

		if (data){
			console.log(data[0]);
		}
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
		console.log(_id);
		if (this.userId) {
			try {
				return Skills.remove({_id: id}, function(err, res){
					if (err) {
						console.log(err);
					} else {
						console.log('skill ' + id + ' deleted sucessfully by user ' + user);
					}
				})
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

let _classifyThis = (data, id, keyword) => {

	
	data.forEach(function (data) {
		JobStreetItems.update({_id: data._id}, {
			$push: {
				trackedSkills: {skillId: id, dummyvar: 1}
			}
		});


		Counts.upsert({
			parentCategory:  data.parentCategory,
			subSpecialization: data.subSpecialization,
			skillId: id,
			skillName: keyword,
			industry: data.listedIndustry,
			specialization: data.listedSpec,
			role: data.listedRole,
			companySnapIndustry: data.companySnapIndustry
			},{
				$inc: {
				count: 1
			},
		});
	});


	Skills.update({_id: id},
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
				skillsClassified: id
			}
		}
	);
}


Meteor.startup(function() {
  Skills.after.insert(function (userId, doc) {
  	console.log('running classification on' + doc._id);

  	_runClassificationOnNewSkill(doc._id, doc.parsed_keyword);
  
  });
});