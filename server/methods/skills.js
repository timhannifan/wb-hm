
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
			nObj.associatedItems = [];
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
	runSkillClassification: function () {
		var skills = Skills.find({});

		skills.forEach(function (item) {
			// console.log(skill);
			console.log(item.skill_keyword);
			
			var data = JobStreetItems.find({
					descriptionTags: { $in:[ item.skill_keyword ] }
				},{
					fields: {
						descriptionTags: 1,
						parentId: 1,
						companySnapIndustry: 1,
						listedSpec: 1,
						listedRole: 1,
						listedIndustry: 1
					}
				}
			);

			if (data){
				var resultarray = [];
				data.forEach(function (jsItem) {
					resultarray.push({
						jobStreetParentId: jsItem.parentId,
						itemId: jsItem._id,
						industry: jsItem.listedIndustry,
						specialization: jsItem.listedSpec,
						role: jsItem.listedRole,
						industryAlt: jsItem.companySnapIndustry
					});
				});

				Skills.update({
					_id: item._id
				}, { 
					$push: {
						associatedItems: { $each: resultarray } 
					},
					$inc: {
						count: resultarray.length
					},
					$set: {
						lastUpdated: new Date()
					}
				});
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
						descriptionTags: 1,
						parentId: 1,
						companySnapIndustry: 1,
						listedSpec: 1,
						listedRole: 1,
						listedIndustry: 1
					}
				}
	);

	return _classifyThis(data, id);
};

let _classifyThis = (data, id) => {
	var resultarray = [];
	data.forEach(function (jsItem) {
		resultarray.push({
			jobStreetParentId: jsItem.parentId,
			itemId: jsItem._id,
			industry: jsItem.listedIndustry,
			specialization: jsItem.listedSpec,
			role: jsItem.listedRole,
			industryAlt: jsItem.companySnapIndustry
		});
	});

	return Skills.update({
		_id: id
	}, { 
		$push: {
			associatedItems: { $each: resultarray } 
		},
		$inc: {
			count: resultarray.length
		},
		$set: {
			lastUpdated: new Date()
		}
	});
}


Meteor.startup(function() {
  Skills.after.insert(function (userId, doc) {
  	console.log('running classification on' + doc._id);

  	_runClassificationOnNewSkill(doc._id, doc.parsed_keyword);
  
  });
});