
Template.newMonsterSources.helpers({
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

AutoForm.hooks({
  insertSourceForm: {
    onSuccess: function(formType, post) {
      console.log('new post created sucessfully.')
    },
    onError: function(formType, error) {
      console.log(error);
    }
  }
});