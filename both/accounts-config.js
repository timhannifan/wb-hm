var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      GlobalUI.closeDialog();
    }
    if (state === "signUp") {
      GlobalUI.closeDialog();
    }
  }
};

AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
