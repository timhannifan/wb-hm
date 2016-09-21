Template.skillsDb.onCreated( () => {
  var self = this;
  self.ready = new ReactiveVar();

  const skillsHandle = Meteor.subscribe('skills');
  
  Tracker.autorun(() => {
    const isReady = skillsHandle.ready();
    self.ready.set(isReady);
  });
});

Template.skillsDb.helpers({
	tableItems() {
	  let tableItems = Skills.find({},{sort: {
	  	count: -1
	  }}).fetch();

	  if ( tableItems ) {
		  return tableItems;
	  } else {
	  	return [];
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
	}
});

Template.skillsDb.events({
	'click #js-delete-skill': function(event, template){
		event.preventDefault();

		let keyword = this.parsed_keyword;

		if (confirm('Are you sure you want to delete "'+ keyword+ '" from the Skills DB?' )) {
		    
		    Meteor.call('deleteSkill', this._id,  function(error, response) {
		    	if (error) {
		    		GlobalUI.toast('Error' + error.reason);
		    		// console.log(error.reason);
		    	} else {
		    		GlobalUI.toast('"' + keyword +'" has been removed.');

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

	'click #js-upload-skills-csv': function (event, template) {
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
	// }
});