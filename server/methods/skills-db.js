Meteor.methods({
	resetSkillsDb: function() {
		if (this.userId){
			Skills.remove({}, function (err,res){if(res){console.log('Completed resetting skillsDb.')}});
			SkillsKeywordInstances.remove({}, function (err,res){if(res){console.log('Completed resetting skillsDb.')}});
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
		let data = JobStreetItems.find( 
				{ $text: { $search: match, $language: 'en' }},
			  { sort: { textScore: 1 } }
		);
		return data;
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
						var instances = SkillsKeywordInstances.remove({keywordId: id});
						console.log('skill ' + id + ' deleted sucessfully by user ' + user + 'and deleted ' + instances + 'KeywordInstances');
					}
				});
			} catch ( exception ) {
				return exception;
			}	
		}
	}
});
