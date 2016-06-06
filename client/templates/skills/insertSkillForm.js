SkillSchema = new SimpleSchema({
  type: {
    type: String,
    label: "Skill Type",
    optional: false
    // autoform: {
      // afFieldInput: {
      //   options: function () {
      //     //return options object
      //   }
      // }
    // }
  },
  skill_keyword: {
    type: String,
    label: "Keyword",
    optional: false
  }
});

AutoForm.hooks({
  insertSkillForm: {
    onSuccess: function(formType, post) {
		GlobalUI.closeDialog();
		GlobalUI.toast('Skill added successfully to the DB');
    },
    onError: function(formType, error) {
		console.log(error);
    }
  }
});