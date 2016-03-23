
Template.newJobstreetSource.helpers({
  JobStreetSources: function(){
    return JobStreetSources.find({});
  },
  sourcesArray: function(){
    return JobStreetSources.find({}).fetch();
  },
  jsonArray: function () {
    var sources = JobStreetSources.find({});
    return EJSON.toJSONValue(sources);
  }
});

AutoForm.hooks({
  insertJobstreetSourceForm: {
    onSuccess: function(formType, post) {
      console.log('new insertJobstreetSourceForm created sucessfully.')
    },
    onError: function(formType, error) {
      console.log(error);
    }
  }
});