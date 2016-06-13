Template.keywordMatchList.onCreated( () => {
});

Template.keywordMatchList.onRendered( () => {
});

Template.keywordMatchList.helpers({
	skill: function () {
		// skill context is set in router
		return Skills.findOne({});
	},
	resultSetEmpty: function () {
		var item = Skills.findOne({});

		if (item) {
			return item.count == 0;
		}
	},
	child: function (_id) {
		var child = JobStreetItems.findOne({_id: _id});
		if (child) {
			return child;
		}
	},
	matches: function (_id) {
		return JobStreetItems.find({});	
	}
});