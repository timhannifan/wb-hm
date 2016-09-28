Template.insertSkillCsvForm.events({
  'change [name=upload]': function( event, template ) {

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        GlobalUI.closeDialog();
        
        var insertArray = results.data;
        for (var i = 0; i < insertArray.length; i++) {
          Meteor.call('insertSkill',insertArray[i]);
        }
      }
    });

    GlobalUI.toast('Uploading Skills CSV data and updating aggregations...');

  },
});