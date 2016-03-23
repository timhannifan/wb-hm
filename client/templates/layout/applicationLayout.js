Template.applicationLayout.events({
	'click #js-fetch-rss': function () {
	  Meteor.call('fetchSources');
	  toast('Refreshing data...');
	},
	'click [data-action=home]': function () {
	  Router.go('home');
	},
	'click [data-action=sources]': function () {
	  Router.go('sources');
	},
	'click [data-action=jobStreetSources]': function () {
	  Router.go('jobStreetSources');
	},
	'click [data-action=data]': function () {
	  Router.go('data');
	},
	'click [data-action=jobStreetData]': function () {
	  Router.go('jobStreetData');
	},
	'click [data-action=graph]': function () {
	  Router.go('graph');
	},
	'click [data-action=export]': function () {
	  Router.go('export');
	},
	'click [data-action=import]': function () {
	  Router.go('import');
	},
	'click [data-action=newMonsterSource]': function () {
	  Router.go('newMonsterSource');
	},
	'click [data-action=newJobstreetSource]': function () {
	  Router.go('newJobstreetSource');
	}
});