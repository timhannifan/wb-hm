Meteor.startup(function () {
  Template.job_street_sources.helpers({
    sources: function(){
      return JobStreetSources.find({});
    },
    sourcesArray: function(){
      return JobStreetSources.find({}).fetch();
    },
    jsonArray: function () {
      var data = JobStreetSources.find({});
      return EJSON.toJSONValue(data);
    }
  });

  Template.job_street_sources.events({
    'click #js-add-jobstreet-source': function () {
      console.log('clicked add jobstreet source');
      GlobalUI.showDialog({heading: "Add a new JobStreet Query", template:"new_jobstreet_source"});
    }
  });


});

AutoForm.hooks({
  insertSourceForm: {
    docToForm: function(doc) {
      if (_.isArray(doc.categories)) {
        doc.categories = doc.categories.join(", ");
      }
      return doc;
    },
    formToDoc: function(doc) {
      if (typeof doc.categories === "string") {
        doc.categories = doc.categories.split(",");
      }
      return doc;
    },
    onSuccess: function(formType, post) {
      console.log('new post created sucessfully.')
    },
    onError: function(formType, error) {
      console.log(error);
    }
  }
});