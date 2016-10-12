
Template.dummyVars.onCreated( () => {
  this.startDate=new ReactiveVar({});
  this.endDate=new ReactiveVar({});

  Tracker.autorun(function () {
    Meteor.subscribe('DummyQueries');
  });

});
Template.dummyVars.events({
	'click #js-create-dummy-var-file': function (event,template) {
    event.currentTarget.disabled = true;
    if (!AutoForm.validateForm('dummyVarsForm')) {
	      GlobalUI.toast( 'There was an error processing your request. Check for field errors.', 'danger' );
    } else {

	  		var form = AutoForm.getFormValues('dummyVarsForm'),
	  		doc = form.insertDoc,
	      modifier = {};

	      let startDate = doc.startDate ? doc.startDate : new Date() - 1000*3600*24*30;
	      let endDate = doc.endDate ? doc.endDate : new Date();


	      GlobalUI.toast( 'Creating CSV and uploading your request to AWS. File will appear as a new link in the table below.', 'success');

	  		Meteor.call('exportDummyVars',startDate,endDate, function(error, response) {
	  		    if (error) {
	  		        GlobalUI.toast( 'Error: ' + error.reason, 'danger' );
	  		    }
	  		    
	  		    AutoForm.resetForm('dummyVarsForm');
	  		    

	  		});
    }
    event.currentTarget.disabled = false;
	}	
});