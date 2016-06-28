ExportSchema = new SimpleSchema({
  collection: {
  	type: String,
  	optional: false,
  	label: 'Collection',
  	autoform: {
  	  type: "select",
  	  options: function () {
  	    return [
  	      {label: "JobStreet.com Data", value: "JobStreetItems"},
  	      {label: "Monster.com Data", value: "MonsterItems"},
  	      // {label: "JobStreetSources", value: "JobStreetSources"},
  	      // {label: "MonsterItems", value: "MonsterItems"}
  	    ];
  	  }
  	},
  	// defaultValue: "JobStreetItems"

  },
  jobStreetFields: {
  	type: [String],
  	optional: true,
  	label: 'Collection fields',
  	autoform: {
  	  type: "select-checkbox",
  	  options: function () {
  	    return [
  	      {label: "field1", value: "field1"},
  	      {label: "field2", value: "field2"},
  	      {label: "field3", value: "field3"}
  	    ];
  	  }
  	}
  },
  monsterFields: {
  	type: [String],
  	optional: true,
  	label: 'Collection fields',
  	autoform: {
  	  type: "select-checkbox",
  	  options: function () {
  	    return [
  	      {label: "field4", value: "field4"},
  	      {label: "field5", value: "field5"},
  	      {label: "field6", value: "field6"}
  	    ];
  	  }
  	}
  },
  startDate: {
    type: Date,
    optional: false,
    label: 'Start Date',
    autoform: {
      afFieldInput: {
        type: "date"
      }
    },
    custom: function () {
      if (this.value >= this.field('endDate').value) {
        return "daterangeMismatch";
      }
    }
  },
  endDate: {
    type: Date,
    optional: false,
    label: 'End Date',
    defaultValue: function(){
    	return new Date();
    },
    autoform: {
      afFieldInput: {
        type: "date"
      }
    },
    // max: function(){
    // 	return new Date();
    // },
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
	endSubmit: function() {}
  }
});

Template.export.onCreated( () => {
});

Template.export.onRendered( () => {
});
Template.export.helpers({
	foo: function () {
		// ...
	}
});

Template.export.events({
	'click #js-download-query': function () {
    if (!AutoForm.validateForm('exportOptionsForm')) {
      GlobalUI.toast( 'Your request could not be processed. Please check for missing fields.', 'danger' );
    } else {
  		var form = AutoForm.getFormValues('exportOptionsForm'),
  		query = form.insertDoc,
      modifier = {};

  		console.log(query);
  		Meteor.call('exportOptionsQuery',query,modifier, function(error, response) {
  		    if (error) {
  		        GlobalUI.toast( 'Error: ' + error.reason, 'danger' );
  		    } else {
              AutoForm.resetForm('exportOptionsForm');
              GlobalUI.toast( 'Success! Downloading your query...', 'success' );

  		        let blob = Modules.client.convertBase64ToBlob( response );
  		        let filename = 'skills-download.zip';
  		        saveAs( blob, filename );

  		    }
  		});
    }
	}
	// 'click .export-data-sync-limit': function ( event, template ) {
	//   var el = $(event.target);
	//   console.log(el);
	//   // console.log(el[0].attributes['data-start'].value);
	//   // console.log(el[0].attributes['data-end'].value);

	//   var start = el[0].attributes['data-start'].value;
	//   var end = el[0].attributes['data-end'].value;

	//   // console.log(event.target);
	//   let options = {
	//     limit: 5000,
	//     skip: Number(start)
	//   };


	//   Meteor.call( 'exportDataSync', options , ( error, response ) => {
	//     if ( error ) {
	//       GlobalUI.toast.alert( error.reason, 'warning' );
	//     } else {
	//       if ( response ) {
	//         console.log('received a resonse');
	//         let blob = Modules.client.convertBase64ToBlob( response );
	//         saveAs( blob, 'archiveSynch.zip' );
	//       }
	//     }
	//   });
	// }
});