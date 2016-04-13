Template.monster_sources.helpers({
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