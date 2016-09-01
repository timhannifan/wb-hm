SkillSchema = new SimpleSchema({
  type: {
    type: String,
    label: "Skill Type",
    optional: false
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
    console.log(post); 
		GlobalUI.toast('Skill created successfully!');
    },
    onError: function(formType, error) {
		console.log(error);
    }
  }
});