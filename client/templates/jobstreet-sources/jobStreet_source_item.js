Meteor.startup(function () {
  Template.jobStreet_source_item.helpers({
    formatDate: function (date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
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
