ExportSchema = new SimpleSchema({
  collection: {
  	type: String,
  	optional: false,
  	label: "Collection",
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
  	label: 'Exportable Fields',
  	autoform: {
  	  type: "select-checkbox",
  	  options: function () {
        var fieldsArray = Object.keys(JobStreetItems.publicFields);
        // console.log(fieldsArray);

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
  	label: 'Select which columns to export:',
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
    optional: true,
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
    // defaultValue: null
  },
  endDate: {
    type: Date,
    optional: true,
    label: 'Ending',
    autoform: {
      afFieldInput: {
        type: "date"
      }
    },
    // defaultValue: null
  },
  jsParentCategory: {
    type: [String],
    optional: true,
    label: "JobStreet Parent Category",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "parentCategory"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          console.log(uniques);

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }
  },
  jsSubSpecialization: {
    type: [String],
    optional: true,
    label: "JobStreet Sub-Specialization",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "subSpecialization"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }
    // autoform: {
    //   type: "select-multiple",
    //   options: function () {
    //     let data = JobStreetSources.find( {}, { fields: { sourceSpecialization: 1 }, sort: { sourceSpecialization: 1 }} );
    //     if ( data ) {
    //       var uniques = _.uniq( data.map( ( item ) => {
    //         return item.sourceSpecialization;
    //       }), true );

    //       var res = [];
    //       for (var i = 0; i < uniques.length; i++) {
    //         res.push({label: uniques[i], value: uniques[i]});
    //       }
    //       return res;
    //     }
    //   }
    // }    
  },
  jsListedIndustry: {
    type: [String],
    optional: true,
    label: "Industry",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "listedIndustry"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }   
  },
  jsListedSpec: {
    type: [String],
    optional: true,
    label: "Industry Specialization",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "listedSpec"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }   
  },
  jsListedRole: {
    type: [String],
    optional: true,
    label: "Role",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "listedRole"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }    
  },
  jsExperience: {
    type: [String],
    optional: true,
    label: "Experience",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "experience"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }    
  },
  jsLocation: {
    type: [String],
    optional: true,
    label: "Location",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "location"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }    
  },
  jsAltIndustry: {
    type: [String],
    optional: true,
    label: "Alt. Industry",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = JobStreetMeta.find( {type: "companySnapIndustry"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }     
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

Template.export.onCreated( () => {
  var self = this;
  self.ready = new ReactiveVar();

  Tracker.autorun(function() {
    var template = Template.instance();
    var jss = SubManager.subscribe( 'JobStreetSources' );
    var ms = SubManager.subscribe( 'MonsterSources' );
    var jsmd = SubManager.subscribe( 'JobStreetMeta' );
    self.ready.set(jss.ready() && ms.ready() && jsmd.ready() );
  });
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
      GlobalUI.toast( 'There was an error processing your query. Please check for missing fields.', 'danger' );
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
      if (doc.jsParentCategory){
        query.jsParentCategory = doc.jsParentCategory;
      }
      if (doc.jsSubSpecialization){
        query.jsSubSpecialization = doc.jsSubSpecialization;
      }
      if (doc.jsListedIndustry){
        query.jsListedIndustry = doc.jsListedIndustry;
      }
      if (doc.jsListedRole){
        query.jsListedRole = doc.jsListedRole;
      }
      if (doc.jsAltIndustry){
        query.jsAltIndustry = doc.jsAltIndustry;
      }
      if (doc.jsExperience){
        query.jsExperience = doc.jsExperience;
      }
      if (doc.jsLocation){
        query.jsLocation = doc.jsLocation;
      }
      if (doc.jobStreetFields){
        modifier.fields = {};

        doc.jobStreetFields.forEach(function(el){
          modifier.fields[el] = 1;
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
});