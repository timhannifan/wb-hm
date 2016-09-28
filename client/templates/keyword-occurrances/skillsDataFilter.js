
skillsDataFilter = new SimpleSchema({
  startDate: {
    type: Date,
    optional: true,
    label: 'Starting',
    autoform: {
      afFieldInput: {
        type: "date",
      },
      defaultValue: function() {
        let current = new Date();
        let daysAgo = new Date() - 1000*3600*24*2;

        let rVal = moment.utc(daysAgo).format("YYYY-MM-DD");
        return rVal;
      }
    },
    custom: function () {
      if (!!this.value && (this.value > this.field('endDate').value)) {
        return "daterangeMismatch";
      }
    }
  },
  endDate: {
    type: Date,
    optional: true,
    label: 'Ending',
    autoform: {
      afFieldInput: {
        type: "date"
      },
      defaultValue: new Date()
    },
    custom: function () {
      if (!!this.value && (this.value < this.field('startDate').value)) {
        return "daterangeMismatch";
      }
    }
  },
  jsParentCategory: {
    type: [String],
    optional: true,
    label: "Parent Category",
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
    label: "Specialization",
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
  // jsListedSpec: {
  //   type: [String],
  //   optional: true,
  //   label: "Industry Specialization",
  //   autoform: {
  //     type: "select-multiple",
  //     options: function () {
  //       let data = JobStreetMeta.find( {type: "listedSpec"}, { fields: { name: 1 }, sort: { name: 1 }} );
  //       if ( data ) {
  //         var uniques = _.uniq( data.map( ( item ) => {
  //           return item.name;
  //         }), true );

  //         var res = [];
  //         for (var i = 0; i < uniques.length; i++) {
  //           res.push({label: uniques[i], value: uniques[i]});
  //         }
  //         return res;
  //       }
  //     }
  //   }   
  // },
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

// AutoForm.hooks({
//   exportOptionsForm: {
//   	// onSubmit: function(insertDoc, updateDoc, currentDoc) {
//   	  // You must call this.done()!
//   	  //this.done(); // submitted successfully, call onSuccess
//   	  //this.done(new Error('foo')); // failed to submit, call onError with the provided error
//   	  //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
//   	// },
//     onSuccess: function(formType, post) {
// 		// console.log(); 
//     },
//     onError: function(formType, error) {
// 		console.log(error);
//     },
//     beginSubmit: function() {},
//   }
// });
