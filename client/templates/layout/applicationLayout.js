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
	'click [data-action=job_street_sources]': function () {
	  Router.go('job_street_sources');
	},
	'click [data-action=data]': function () {
	  Router.go('data');
	},
	'click [data-action=job_street_data]': function () {
	  Router.go('job_street_data');
	},
	// 'click [data-action=graph]': function () {
	//   Router.go('graph');
	// },
	'click [data-action=export]': function () {
	  Router.go('export');
	},
	'click [data-action=upload]': function () {
	  Router.go('upload');
	},
	'click [data-action=new_monster_source]': function () {
	  Router.go('new_monster_source');
	},
	'click [data-action=newJobstreetSource]': function () {
	  Router.go('newJobstreetSource');
	}
});