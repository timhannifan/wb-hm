Template.data.helpers({
	monsteritems: function () {
		return MonsterItems.find({}, {sort: {createdAt: -1, sourceCategory: 1}});
	},

	tableSettings : function () {
	  return {
	      fields: [
	        { 
	        	key: 'createdAt', 
	        	label: 'Created', 
	        	sortByValue: true, 
	        	fn: function (date) { return moment(date).format("dddd, MMMM Do YYYY"); }
	        },
	        { 
	        	key: 'title', 
	        	label: 'Title', 
	        	tmpl: Template.titleTmpl 
	        },
	        { key: 'sourceCategory', label: 'Category' },
	        { key: 'company', label: 'Company' },
	        { key: 'location', label: 'Location' }
	      ],
	      filters: [
	        'text-search', 
	        'select-filter',
	        'date-filter'
	      ]
	  };
	},

	fields: function () {
		return [
			'title',
			'titleTags',
			'cleanDescription',
			'descriptionTags',
			'sourceCategory',
			'company',
			'experience',
			'qualification',
			'location',
			'createdAt'
		];
	}
});

Template.data.onCreated( () => {
  let template = Template.instance();

  template.subscribe('MonsterItems');
});

Template.sourceSelectFilter.onCreated( () => {
	let template = Template.instance();
	template.subscribe('MonsterSources');

	template.filter = new ReactiveTable.Filter('select-filter', ['sourceCategory']);  
});

Template.sourceSelectFilter.helpers({
	monsterSources: function() {
		return MonsterSources.find().fetch();
	}
});

Template.sourceSelectFilter.events({
 "change .select-filter": function (event, template) {
   template.filter.set($(event.target).val());
 } 
});
