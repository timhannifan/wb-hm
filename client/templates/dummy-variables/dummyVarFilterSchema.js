dummyVarFilterSchema = new SimpleSchema({
  startDate: {
    type: Date,
    optional: false,
    label: 'Starting',
    autoform: {
      afFieldInput: {
        type: "date"
      }
    },
    custom: function () {
      if (!!this.value && (this.value > this.field('endDate').value)) {
        return "daterangeMismatch";
      }
    },
    defaultValue: new Date() - 1000*3600*24*30
  },
  endDate: {
    type: Date,
    optional: false,
    label: 'Ending',
    autoform: {
      afFieldInput: {
        type: "date"
      }
    },
    defaultValue: new Date(),
    custom: function () {
      if (!!this.value && (this.value <= this.field('startDate').value)) {
        return "daterangeMismatch";
      }
    },    
  }
});

AutoForm.hooks({
  exportOptionsForm: {
  	// onSubmit: function(insertDoc, updateDoc, currentDoc) {
  	  // You must call this.done()!
  	  //this.done(); // submitted successfully, call onSuccess
  	  //this.done(new Error('foo')); // failed to submit, call onError with the provided error
  	  //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
  	// },
    onSuccess: function(formType, post) {
		// console.log(); 
    },
    onError: function(formType, error) {
		console.log(error);
    },
    beginSubmit: function() {},
  }
});
