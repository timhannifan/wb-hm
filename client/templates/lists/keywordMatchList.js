Template.keywordMatchList.onCreated( () => {
});

Template.keywordMatchList.onRendered( () => {
});

Template.keywordMatchList.helpers({
	resultSetEmpty: function () {
		var item = Skills.findOne({});

		if (item) {
			return item.count == 0;
		}
	},
	skill: function (_id) {
		console.log(Router.current().params._id);
		return Skills.findOne({_id: Router.current().params._id})
	},
	items: function (_id) {
		return SkillsKeywordInstances.find({keywordId: Router.current().params._id}).fetch();
	},
});

Template.jobStreetRow.onCreated(function() {	
	Meteor.subscribe('JobStreetOne', this.data._id);
})
Template.jobStreetRow.helpers({
	jsItem: function (_id) {
		return JobStreetItems.findOne({_id: _id});
	}
})