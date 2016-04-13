Meteor.startup(function () {
  Template.source_item.helpers({
    formId: function () {
      return 'updateSource-'+ this._id;
    }
  });

  Template.source_item.events({
    'click .delete-link': function(e, instance){
      e.preventDefault();
      if (confirm("Delete source?")) {
        MonsterSources.remove(instance.data._id);
      }
    }
  });
});
