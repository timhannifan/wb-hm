Meteor.startup(function () {
  Template.sources.helpers({
    sources: function(){
      return Sources.find({});
    },
    sourcesArray: function(){
      return Sources.find({}).fetch();
    },
    jsonArray: function () {
      var sources = Sources.find({});
      return EJSON.toJSONValue(sources);
    }
  });

  Template.sources.events({
    'click #call-fetch-sources': function () {
      Meteor.call('fetchSources');
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