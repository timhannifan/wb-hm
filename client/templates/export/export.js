Template.export.onCreated( () => {
  // console.log(this);
  var self = this;
  self.ready = new ReactiveVar();

  const handle = Meteor.subscribe('JobStreetMeta');
  
  Tracker.autorun(() => {
    // const isReady = handle.ready();
    // console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);  
    self.ready.set(handle.ready());
  });
});
Template.export.onRendered( () => {
});
Template.export.helpers({
	stillLoadingData: function () {
    console.log(Template.instance());
    return false;
	}
});

Template.export.events({
	'click #js-download-query': function (event) {
    if (!AutoForm.validateForm('exportOptionsForm')) {
      GlobalUI.toast( 'There was an error processing your query. Please check for missing fields.', 'danger' );
    } else {
  		var form = AutoForm.getFormValues('exportOptionsForm'),
  		doc = form.insertDoc,
      query = {},
      modifier = {};

      query.collection = doc.collection;
      if (doc.startDate){
        query.startDate = doc.startDate;
      }
      if (doc.endDate){
        query.endDate = doc.endDate;
      }
      if (doc.jsParentCategory){
        query.jsParentCategory = doc.jsParentCategory;
      }
      if (doc.jsSubSpecialization){
        query.jsSubSpecialization = doc.jsSubSpecialization;
      }
      if (doc.jsListedIndustry){
        query.jsListedIndustry = doc.jsListedIndustry;
      }
      if (doc.jsListedSpec){
        query.jsListedSpec = doc.jsListedSpec;
      }
      if (doc.jsListedRole){
        query.jsListedRole = doc.jsListedRole;
      }
      if (doc.jsAltIndustry){
        query.jsAltIndustry = doc.jsAltIndustry;
      }
      if (doc.jsExperience){
        query.jsExperience = doc.jsExperience;
      }
      if (doc.jsLocation){
        query.jsLocation = doc.jsLocation;
      }
      if (doc.jobStreetFields){
        modifier.fields = {};

        doc.jobStreetFields.forEach(function(el){
          modifier.fields[el] = 1;
        });
      }

      event.currentTarget.disabled = true;

      GlobalUI.toast( 'Query submitted, retrieving results. Download will start automatically when file is ready.');

  		Meteor.call('exportQuery',query,modifier, function(error, response) {
  		    if (error) {
  		        GlobalUI.toast( 'Error: ' + error.reason, 'danger' );
              event.currentTarget.disabled = false;
  		    } else {
              AutoForm.resetForm('exportOptionsForm');
              GlobalUI.toast( 'Success! Downloading your query...', 'success' );

  		        let blob = Modules.client.convertBase64ToBlob( response );
  		        let filename = 'exports.zip';
  		        saveAs( blob, filename );

  		    }
  		});
    }
	}
});