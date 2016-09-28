
Template.dummyVars.onCreated( () => {
  this.startDate=new ReactiveVar({});
  this.endDate=new ReactiveVar({});
  this.jsParentCategory=new ReactiveVar({});
  this.jsSubSpecialization=new ReactiveVar({});
  this.jsListedIndustry=new ReactiveVar({});
  this.jsListedSpec=new ReactiveVar({});
  this.jsListedRole=new ReactiveVar({});
  this.jsAltIndustry=new ReactiveVar({});
  this.jsExperience=new ReactiveVar({});


  Tracker.autorun(function () {
    Meteor.subscribe('JobStreetMeta');
  });

});
Template.dummyVars.events({
	'click #js-download-skills-matrix': function (event,template) {
    if (!AutoForm.validateForm('dummyVarsForm')) {
	      GlobalUI.toast( 'There was an error processing your query. Please check for missing fields.', 'danger' );
	    } else {
	  		var form = AutoForm.getFormValues('dummyVarsForm'),
	  		doc = form.insertDoc,
	      modifier = {};

	      if (doc.startDate){
	        startDate.set({createdAt: {$gte: doc.startDate}});
	      }    
	      if (doc.endDate){
	        endDate.set({createdAt: {$lte: doc.endDate}});
	      }    
	      if (doc.jsParentCategory){
	        jsParentCategory.set({parentCategory: {$in: doc.jsParentCategory}});
	      }    
	      if (doc.jsSubSpecialization){
	        jsSubSpecialization.set({subSpecialization: {$in: doc.jsSubSpecialization}});
	      }
	      
	      if (doc.jsListedIndustry){
	        jsListedIndustry.set({listedIndustry: {$in: doc.jsListedIndustry}});
	      }
	      
	      if (doc.jsListedSpec){
	        jsListedSpec.set({listedSpec: {$in: doc.jsListedSpec}});
	      }
	      
	      if (doc.jsListedRole){
	        jsListedRole.set({listedRole: {$in: doc.jsListedRole}});
	      }
	      
	      if (doc.jsAltIndustry){
	        jsAltIndustry.set({companySnapIndustry: {$in: doc.jsAltIndustry}});
	      }    
	      if (doc.jsExperience){
	        jsExperience.set({experience: {$in: doc.jsExperience}});
	      }

	      event.currentTarget.disabled = true;

	      let query = { 
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
	      GlobalUI.toast( 'Query submitted, retrieving results. Download will start automatically when file is ready.');

	  		Meteor.call('exportDummyVars',query,modifier, function(error, response) {
	  		    if (error) {
	  		        GlobalUI.toast( 'Error: ' + error.reason, 'danger' );
	              event.currentTarget.disabled = false;
	  		    } else {
              AutoForm.resetForm('dummyVarsForm');
              GlobalUI.toast( 'Success! Downloading your query...', 'success' );

  		        let blob = Modules.client.convertBase64ToBlob( response );
  		        let filename = 'dummyVariables.zip';
  		        saveAs( blob, filename );
	  		    }
	  		});
	    }
	}	
});