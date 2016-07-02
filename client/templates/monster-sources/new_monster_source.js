
Template.new_monster_source.helpers({
  sources: function(){
    return MonsterSources.find({});
  },
  sourcesArray: function(){
    return MonsterSources.find({}).fetch();
  },
  jsonArray: function () {
    var sources = MonsterSources.find({});
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