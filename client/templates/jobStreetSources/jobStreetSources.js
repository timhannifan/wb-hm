Meteor.startup(function () {
  Template.jobStreetSources.helpers({
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