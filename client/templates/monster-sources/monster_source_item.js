Meteor.startup(function () {
  Template.monster_source_item.helpers({
    formId: function () {
      return 'updateSource-'+ this._id;
    },
    formatDate: function (date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
  });

  Template.monster_source_item.events({
    'click .delete-link': function(e, instance){
      e.preventDefault();
      if (confirm("Delete source?")) {
        MonsterSources.remove(instance.data._id);
      }
    }
  });
});
