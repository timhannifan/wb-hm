Template.app_layout.events({
	// 'click #js-fetch-rss': function () {
	//   Meteor.call('fetchMonsterSources');
	//   toast('Refreshing data...');
	// },
	// 'click [data-action=home]': function () {
	//   Router.go('home');
	// },
	// 'click [data-action=monster_sources]': function () {
	// 	Meteor.setTimeout(function() {}, 250);
	//   Router.go('monster_sources');
	// },
	// 'click [data-action=job_street_sources]': function () {
	//   Router.go('job_street_sources');
	// },
	// 'click [data-action=data]': function () {
	// 	Meteor.setTimeout(function() {}, 250);
	//   Router.go('data');
	// },
	// 'click [data-action=job_street_data]': function () {
	//   Router.go('job_street_data');
	// },
	// 'click [data-action=combined_data]': function () {
	//   Router.go('combined_data');
	// },
	// 'click [data-action=export]': function () {
	//   Router.go('export');
	// },
	// 'click [data-action=new_monster_source]': function () {
	//   Router.go('new_monster_source');
	// },
	// 'click [data-action=new_jobstreet_source]': function () {
	//   Router.go('new_jobstreet_source');
	// }
	'click .nav-menu-item': function () {
		var pdp = document.getElementById('drawerPanel');
		pdp.closeDrawer();
	}
});