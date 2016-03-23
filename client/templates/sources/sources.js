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