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

Template.monster_sources.events({
  'click #js-add-monster-source': function () {
    event.preventDefault();

    GlobalUI.showDialog({
      heading: "Add Monster RSS Feed",
      template: "new_monster_source",
      fullOnMobile: true
    });
  }
});
