JobStreetQueryFilter = new SimpleSchema({
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
