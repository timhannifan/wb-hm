Template.keywordMatchList.onCreated( () => {
	this.templateLimit = new ReactiveVar(50);
	this.templateSkip = new ReactiveVar(0);
	this.increaseLimit = function(current, num) {
		const newVal = current + num;
		this.templateLimit.set(newVal);
	}
});

Template.keywordMatchList.onRendered( () => {
});

Template.keywordMatchList.helpers({
	skill: function (_id) {
		// console.log(Router.current().params._id);
		return Skills.findOne({_id: Router.current().params._id})
	},
	items: function (_id) {
		let data = SkillsKeywordInstances.find(
			{keywordId: Router.current().params._id}, 
			{limit:templateLimit.get(),sort: {createdAt: -1}}
		);

		if (data && (data.count() != 0)) {
			return data.fetch();
		} else {
			return null;
		}
	},
	isMoreData: function() {
		let test = function() {
			return templateLimit.get() < SkillsKeywordInstances.find({keywordId: Router.current().params._id},{fields: {_id: 1}}).count();
		}

		return test();
	}
});
Template.keywordMatchList.events({
	'click .js-load-more': function (event, template) {
		const current = templateLimit.get();
		increaseLimit(current,50);
	}
});
Template.jobStreetRow.onCreated(function() {	
	Meteor.subscribe('JobStreetOne', this.data._id);
})
Template.jobStreetRow.helpers({
	jsItem: function (_id) {
		return JobStreetItems.findOne({_id: _id});
	}
})