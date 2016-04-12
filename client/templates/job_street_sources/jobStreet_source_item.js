Meteor.startup(function () {
  Template.jobStreet_source_item.helpers({
    // formId: function () {
    //   return 'updateSource-'+ this._id;
    // }
  });

  Template.jobStreet_source_item.events({
    'click .delete-link': function(e, instance){
      e.preventDefault();
      if (confirm("Delete source?")) {
        job_street_sources.remove(instance.data._id);
      }
    }
  });
});