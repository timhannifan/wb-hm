
Template.newJobstreetSource.helpers({
  job_street_sources: function(){
    return job_street_sources.find({});
  },
  sourcesArray: function(){
    return job_street_sources.find({}).fetch();
  },
  jsonArray: function () {
    var sources = job_street_sources.find({});
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