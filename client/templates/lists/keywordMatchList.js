Template.keywordMatchList.onCreated( () => {
	this.templateLimit = new ReactiveVar(50);
	this.templateSkip = new ReactiveVar(0);
	this.increaseLimit = function(current, num) {
		const newVal = current + num;
		console.log(newVal)

		this.templateLimit.set(newVal);
	}
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
		console.log({limit:templateLimit.get(), skip: templateSkip.get()});
		return SkillsKeywordInstances.find({keywordId: Router.current().params._id}, {limit:templateLimit.get(),sort: {createdAt: -1}}).fetch();
	},
});
Template.keywordMatchList.events({
	'click .js-load-more': function (event, template) {
		const current = templateLimit.get();
		console.log(current);

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