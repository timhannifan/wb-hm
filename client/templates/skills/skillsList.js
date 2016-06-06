Template.skillsList.helpers({
	rankedSkills: function () {
		var data = Skills.find({},{sort: {type: 1}});

		var reformattedArray = data.map(function(obj, index, cursor){ 
		   var rObj = {};
		   rObj._id = obj._id;
		   rObj.rank = index + 1;
		   rObj.skill_keyword = obj.skill_keyword;
		   rObj.parsed_keyword = obj.parsed_keyword;
		   rObj.type = obj.type;
		   rObj.count = obj.count;
		   return rObj;
		});

		return reformattedArray;
	}
});

Template.skillsList.onRendered( () => {

});

Template.skillsList.events({
	'click #js-delete-skill': function(event, template){
		event.preventDefault();

		if (confirm('Are you sure you want to delete '+ this.skill_keyword+ '?' )) {
		    
		    Meteor.call('deleteSkill', this._id,  function(error, response) {
		    	if (error) {
		    		console.log(error.reason);
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
	}
});