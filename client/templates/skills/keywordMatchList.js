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