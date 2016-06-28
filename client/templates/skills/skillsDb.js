Template.skillsDb.onCreated( () => {
    var self = this;
    self.ready = new ReactiveVar();



    Tracker.autorun(function() {
      var template = Template.instance();
      // template.parentCategory = new ReactiveVar( 'all' );
      // template.subSpecialization  = new ReactiveVar( 'all' );
      // template.listedSpecialization  = new ReactiveVar( 'all' );
      // template.listedRole  = new ReactiveVar( 'all' );
      // template.listedIndustry  = new ReactiveVar( 'all' );
      // template.experience  = new ReactiveVar( 'all' );
      // template.location  = new ReactiveVar( 'all' );
      // template.totalCount  = new ReactiveVar();
      // template.filters = {};

      var jss = SubManager.subscribe( 'JobStreetSources' );
      var stats = SubManager.subscribe( 'skillsAggregations',{} );
      var skills = SubManager.subscribe( 'skills' );
      self.ready.set(jss.ready() && stats.ready() && skills.ready());
    });
});

Template.skillsDb.helpers({
	skills: function () {
		var data = Skills.find({},{sort: {parsed_keyword: 1}});

		var reformattedArray = data.map(function(obj, index, cursor){ 
		   var rObj = {};
		   rObj._id = obj._id;
		   rObj.rank = index + 1;
		   rObj.skill_keyword = obj.skill_keyword;
		   rObj.parsed_keyword = obj.parsed_keyword;
		   rObj.type = obj.type;
		   rObj.count = function(){
		   	return JobStreetItems.find({ 'trackedSkills.skillId': obj._id}).count();
		   };
		   return rObj;
		});

		return reformattedArray;
	},
	tableItems() {
	  let tableItems = SkillsAggregations.find().fetch();

	  if ( tableItems ) {
	  
	  var mapped = tableItems.map( ( item, index, cursor ) => {
	  	// console.log(item);
	    return {
	      index: index,
	      skillKeyword: item.skillKeyword,
	      skillId: item.skillId,
	      total: +`${ item.total }`
	    };
	  });  
	  
	  return mapped.sort(function(a, b) {
	    return b.total-a.total;
	  });

	  } 
	},
	findSkillType(string) {
		var data = Skills.findOne({parsed_keyword: string});

		if(data){
			return data.type;
		}
	},
	findSkillUpdate(string) {
		var data = Skills.findOne({parsed_keyword: string});

		if(data){
			return data.lastUpdated;
		}
	},
	skillContext(_id){
		return Skills.findOne({_id: _id});
	}
});

Template.skillsDb.onRendered( () => {

});

Template.skillsDb.events({
	'click #js-delete-skill': function(event, template){
		event.preventDefault();

		if (confirm('Are you sure you want to delete '+ this.skillKeyword+ '?' )) {
		    
		    Meteor.call('deleteSkill', this.skillId,  function(error, response) {
		    	if (error) {
		    		GlobalUI.toast('Error' + error.reason);
		    		// console.log(error.reason);
		    	} else {
		    		GlobalUI.toast('Skill deleted');

		    	}
		    });
		} 
	},
	'click #js-add-skill': function(event,template) {
		event.preventDefault();

		GlobalUI.showDialog({
			heading: "Add a new skill",
			template: "insertSkillForm",
			fullOnMobile: true
		})
	},
	'click #js-download-skills': function () {
		event.preventDefault();

		Meteor.call('exportDummyVars',{},{}, function(error, response) {
		    if (error) {
		        console.log(error);
		    } else {
		        console.log('received a resonse');
		        let blob = Modules.client.convertBase64ToBlob( response );
		        let filename = 'skills-download.zip';
		        saveAs( blob, filename );
		    }
		});
	},
	'click #js-upload-skills-csv': function () {
		event.preventDefault();

		GlobalUI.showDialog({
			heading: "Upload Skill CSV data",
			template: "insertSkillCsvForm",
			fullOnMobile: true
		})
	},

	// 'change [name=upload]': function( event, template ) {

	//   Papa.parse( event.target.files[0], {
	//     header: true,
	//     complete: function( results, file ) {
	//       var insertArray = results.data;
	//       for (var i = 0; i < insertArray.length; i++) {
	//         Meteor.call('insertSkill',insertArray[i], function(err,res) {
	//           if (res) {
	//             console.log('inserted skill' + insertArray[i].type + insertArray[i].skill_keyword);
	//           }
	//         });
	//       }
	//     }
	//   });

	// },
});