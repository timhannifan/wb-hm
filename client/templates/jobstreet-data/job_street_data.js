
Template.job_street_data.onCreated( () => {

  let initialStart=moment().subtract(1000*3600*24*14).toDate();
  let today = new Date();
  
  this.startDate=new ReactiveVar({createdAt: {$gte: initialStart}});
  this.endDate=new ReactiveVar({createdAt: {$lte: today}});
  this.jsParentCategory=new ReactiveVar({});
  this.jsSubSpecialization=new ReactiveVar({});
  this.jsListedIndustry=new ReactiveVar({});
  this.jsListedSpec=new ReactiveVar({});
  this.jsListedRole=new ReactiveVar({});
  this.jsAltIndustry=new ReactiveVar({});
  this.jsExperience=new ReactiveVar({});

	this.templateLimit = new ReactiveVar(50);
	this.increaseLimit = function(current, num) {
		const newVal = current + num;
		console.log(newVal)

		this.templateLimit.set(newVal);
	}	

  let passedQ = { 
    $and : [
          startDate.get(),
          endDate.get(),
          jsParentCategory.get(),
          jsSubSpecialization.get(),
          jsListedIndustry.get(),
          jsListedSpec.get(),
          jsListedRole.get(),
          jsAltIndustry.get(),
          jsExperience.get()
        ] 
  };
  let passedM = { 
		limit: this.templateLimit.get()
  };

  console.log(passedQ);
  console.log(passedM);


  Tracker.autorun(function () {
    Meteor.subscribe('JobStreetMeta');
    Meteor.subscribe('jobStreetQuery', passedQ);
  });

});

Template.job_street_data.helpers({
  tableItems() {
    let data = JobStreetItems.find(
      { $and : [
          startDate.get(),
          endDate.get(),
          jsParentCategory.get(),
          jsSubSpecialization.get(),
          jsListedIndustry.get(),
          jsListedSpec.get(),
          jsListedRole.get(),
          jsAltIndustry.get(),
          jsExperience.get()
        ] 
      },
      {
      	limit: templateLimit.get(),
      	sort: {createdAt: -1}
      }
    );

    if (data) {
    	return data.fetch();
    } else {
    	return []
    };
  }
});

Template.job_street_data.events({
  // 'change #jsFilterForm': function (event, template) {
  //   GlobalUI.toast( 'Updating table....');
  //   var form = AutoForm.getFormValues('jsFilterForm'),
  //   doc = form.insertDoc;

  //   if (doc.startDate){
  //     startDate.set({createdAt: {$gte: moment().subtract(1000*3600*24*14).toDate()}});
  //   }else {
  //     startDate.set({createdAt: {$gte: new Date()}});
  //   }     
  //   if (doc.endDate){
  //     endDate.set({createdAt: {$lte: doc.endDate}});
  //   }else {
  //     endDate.set({createdAt: {$lte: new Date()}});
  //   }    
  //   if (doc.jsParentCategory){
  //     jsParentCategory.set({parentCategory: {$in: doc.jsParentCategory}});
  //   } else {
  //     jsParentCategory.set({});
  //   }    
  //   if (doc.jsSubSpecialization){
  //     jsSubSpecialization.set({subSpecialization: {$in: doc.jsSubSpecialization}});
  //   } else {
  //     jsSubSpecialization.set({});
  //   } 
    
  //   if (doc.jsListedIndustry){
  //     jsListedIndustry.set({listedIndustry: {$in: doc.jsListedIndustry}});
  //   } else {
  //     jsListedIndustry.set({});
  //   } 
    
  //   if (doc.jsListedSpec){
  //     jsListedSpec.set({listedSpec: {$in: doc.jsListedSpec}});
  //   } else {
  //     jsListedSpec.set({});
  //   } 
    
  //   if (doc.jsListedRole){
  //     jsListedRole.set({listedRole: {$in: doc.jsListedRole}});
  //   } else {
  //     jsListedRole.set({});
  //   } 
    
  //   if (doc.jsAltIndustry){
  //     jsAltIndustry.set({companySnapIndustry: {$in: doc.jsAltIndustry}});
  //   }  else {
  //     jsAltIndustry.set({});
  //   }    
  //   if (doc.jsExperience){
  //     jsExperience.set({experience: {$in: doc.jsExperience}});
  //   } else {
  //     jsExperience.set({});
  //   } 
  // },
  'click .js-load-more': function (event, template) {
  	const current = templateLimit.get();
  	increaseLimit(current,50);
  }  
});



// Template.job_street_data.helpers({
// 	// ready: function () {
// 	// 	return this.ready();
// 	// },
// 	collection: function () {
// 		return JobStreetItems.find({});
// 	},

// 	tableSettings : function () {
// 	  return {
// 	      fields: [
// 	        { 
// 	        	key: 'createdAt', 
// 	        	label: 'Created',
// 	        	fn: function (date) { return moment(date).format("dddd, MMMM Do YYYY"); },
// 	        	// sortOrder: 0, 
// 	        	sortDirection: 'descending'
// 	        },
// 	        { 
// 	        	key: 'title', 
// 	        	label: 'Title', 
// 	        	tmpl: Template.jsTitleTmpl 
// 	        },
// 	        { key: 'parentCategory', label: 'Category' },
// 	        { key: 'subSpecialization', label: 'Specialization' },
// 	        { key: 'company', label: 'Company' },
// 	        { key: 'location', label: 'Location', sortable: false  }
// 	      ],
// 	      filters: [
// 	      	'js-text-search',
// 	        'js-specialization-filter',
// 	        'jobstreet-category-select-filter'
// 	      ]
// 	  };
// 	},

// 	fields: function () {
// 		return [
// 			// 'title',
// 			// 'titleTags',
// 			// 'company',
// 			// 'location',
// 			// 'experience',
// 			// 'description',
// 			// 'descriptionTags',
// 			// // 'companyRegistrationNumber',
// 			// // 'companySize',
// 			// // 'benefits',
// 			// // 'languagesSpoken',
// 			// // 'companyAddress',
// 			// 'companySnapIndustry',
// 			// // 'companySnapDressCode',
// 			// // 'companyOverview',
// 			// // 'companyOverviewTags',
// 			// // 'companyRecruitBool',
// 			// 'url',
// 			// 'parentCategory',
// 			// 'subSpecialization',
// 			// 'listedSpec',
// 			// 'listedRole',
// 			// 'listedIndustry',
// 			// 'datePosted',
// 			// 'dateClosing',
// 			// 'createdAt'
// 		];
// 	}
// });
// Template.job_street_data.onCreated( () => {
//   let template = Template.instance();
//   // template.subscribe('jobstreet-items');
//   // template.subscribe('JobStreetItemsLimited');
// });

// Template.jssourceSelectFilter.onCreated( () => {
// 	let template = Template.instance();
// 	template.subscribe('JobStreetSources');

// 	template.filter = new ReactiveTable.Filter('jobstreet-category-select-filter', ['parentCategory']);  
// });

// Template.jssourceSelectFilter.helpers({
// 	sources: function() {
// 		let data = JobStreetSources.find( {}, { fields: { sourceCategory: 1 }, sort: { sourceCategory: 1 }, limit: 1000 } );
// 		if ( data ) {
// 		  return _.uniq( data.map( ( item ) => {
// 		    return item.sourceCategory;
// 		  }), true );
// 		}
// 	}
// });

// Template.jssourceSelectFilter.events({
//  "change .jobstreet-category-select-filter": function (event, template) {
//    template.filter.set($(event.target).val());
//  } 
// });


// Template.jsSpecializationFilter.onCreated( () => {
// 	let template = Template.instance();
// 	template.subscribe('JobStreetSources');
 
// 	template.filter = new ReactiveTable.Filter('js-specialization-filter', ['subSpecialization']);  
// });

// Template.jsSpecializationFilter.helpers({
// 	sources: function() {
// 		let data = JobStreetSources.find( {}, { fields: { sourceSpecialization: 1 }, sort: { sourceSpecialization: 1 } } );
// 		if ( data ) {
// 		  return _.uniq( data.map( ( item ) => {
// 		    return item.sourceSpecialization;
// 		  }), true );
// 		}
// 	}
// });

// Template.jsSpecializationFilter.events({
//  "change .js-specialization-filter": function (event, template) {
//    template.filter.set($(event.target).val());
//  } 
// });



