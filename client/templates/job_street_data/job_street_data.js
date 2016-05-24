Template.job_street_data.helpers({
	collection: function () {
		return JobStreetItems.find({}, {sort: {createdAt: -1}});
	},

	tableSettings : function () {
	  return {
	      fields: [
	        { 
	        	key: 'createdAt', 
	        	label: 'Created',
	        	fn: function (date) { return moment(date).format("dddd, MMMM Do YYYY"); }
	        },
	        { 
	        	key: 'title', 
	        	label: 'Title', 
	        	tmpl: Template.jsTitleTmpl 
	        },
	        { key: 'parentCategory', label: 'Category' },
	        { key: 'subSpecialization', label: 'Specialization' },
	        { key: 'company', label: 'Company' },
	        { key: 'location', label: 'Location' }
	      ],
	      filters: [
	      	'js-text-search',
	        'js-specialization-filter',
	        'jobstreet-category-select-filter'
	      ]
	  };
	},

	fields: function () {
		return [
			// 'title',
			// 'titleTags',
			// 'company',
			// 'location',
			// 'experience',
			// 'description',
			// 'descriptionTags',
			// // 'companyRegistrationNumber',
			// // 'companySize',
			// // 'benefits',
			// // 'languagesSpoken',
			// // 'companyAddress',
			// 'companySnapIndustry',
			// // 'companySnapDressCode',
			// // 'companyOverview',
			// // 'companyOverviewTags',
			// // 'companyRecruitBool',
			// 'url',
			// 'parentCategory',
			// 'subSpecialization',
			// 'listedSpec',
			// 'listedRole',
			// 'listedIndustry',
			// 'datePosted',
			// 'dateClosing',
			// 'createdAt'
		];
	}
});
Template.job_street_data.onCreated( () => {
  let template = Template.instance();
  // template.subscribe('jobstreet-items');
  template.subscribe('JobStreetItemsLimited');
});

Template.jssourceSelectFilter.onCreated( () => {
	let template = Template.instance();
	template.subscribe('JobStreetSources');

	template.filter = new ReactiveTable.Filter('jobstreet-category-select-filter', ['parentCategory']);  
});

Template.jssourceSelectFilter.helpers({
	sources: function() {
		return JobStreetSources.find().fetch();
	}
});

Template.jssourceSelectFilter.events({
 "change .jobstreet-category-select-filter": function (event, template) {
   template.filter.set($(event.target).val());
 } 
});


Template.jsSpecializationFilter.onCreated( () => {
	let template = Template.instance();
	template.subscribe('JobStreetSources');
 
	template.filter = new ReactiveTable.Filter('js-specialization-filter', ['subSpecialization']);  
});

Template.jsSpecializationFilter.helpers({
	sources: function() {
		return JobStreetSources.find().fetch();
	}
});

Template.jsSpecializationFilter.events({
 "change .js-specialization-filter": function (event, template) {
   template.filter.set($(event.target).val());
 } 
});



