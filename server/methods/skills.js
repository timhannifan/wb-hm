
Meteor.methods({
	uploadSkills: function (data) {
		check( data, Array );

		for ( i = 0; i < data.length; i++ ) {
			console.log(data[ i ]);
		  var item   = data[ i ],
		  exists = Skills.findOne( { skill_keyword: item.skill_keyword } );

		  if ( exists ) { 
		    console.warn( 'Rejected. This item already exists.' );  
		  } else {
		    Skills.insert(item);
		    
		  }
		}
		
	},
	runSkillClassification: function () {
		var skills = Skills.find({});
		// var data = JobStreetItems.find({},{limit: 50, fields: {descriptionTags: 1, classificationComplete: 1}});

		skills.forEach(function (item) {
			// console.log(skill);
			console.log(item.skill_keyword);
			
			var data = JobStreetItems.find({
					descriptionTags: { $in:[ item.skill_keyword ] }
				},{
					fields: {descriptionTags: 1}
			});

			if (data){
				var resultarray = [];
				data.forEach(function (item) {
					resultarray.push(item._id);
				});

				console.log(resultarray);

				Skills.update({
					_id: item._id
				}, { 
					$push: {
						associatedItems: { $each: resultarray } 
					}
				});
			}

		});	

	}
});