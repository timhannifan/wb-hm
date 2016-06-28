ExportSchema = new SimpleSchema({
  collection: {
  	type: String,
  	optional: false,
  	label: 'Select a collection',
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
  	label: 'Select available fields',
  	autoform: {
  	  type: "select-checkbox",
  	  options: function () {
        var fieldsArray = Object.keys(JobStreetItems.publicFields);
        console.log(fieldsArray);

        var result = fieldsArray.map(function(el){ 
           var rObj = {};
           rObj['label'] = el;
           rObj['value'] = el;
           return rObj;
        });

  	    return result;
  	  }
  	}
  },
  monsterFields: {
  	type: [String],
  	optional: true,
  	label: 'Select fields to be exported',
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
      if (this.value > this.field('endDate').value) {
        return "daterangeMismatch";
      }
    }
  },
  endDate: {
    type: Date,
    optional: false,
    label: 'End Date',
    autoform: {
      afFieldInput: {
        type: "date"
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
  		doc = form.insertDoc,
      query = {},
      modifier = {};

      query.collection = doc.collection;
      if (doc.startDate){
        query.startDate = doc.startDate;
      }
      if (doc.endDate){
        query.endDate = doc.endDate;
      }
      if (doc.jobStreetFields){
        modifier.fields = doc.jobStreetFields.map(function(el){
          var rObj = {};
          rObj[el] = 1;

          return rObj;
        });
      }

      console.log(query);
  		console.log(modifier);
  		Meteor.call('exportOptionsQuery',query,modifier, function(error, response) {
  		    if (error) {
  		        GlobalUI.toast( 'Error: ' + error.reason, 'danger' );
  		    } else {
              AutoForm.resetForm('exportOptionsForm');
              GlobalUI.toast( 'Success! Downloading your query...', 'success' );

  		        let blob = Modules.client.convertBase64ToBlob( response );
  		        let filename = 'exports.zip';
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