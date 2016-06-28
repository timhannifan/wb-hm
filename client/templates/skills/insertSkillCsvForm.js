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

// // // {
// // //   typeTest: {
// // //     type: String,
// // //     optional: true,
// // //     autoform: {
// // //       afFieldInput: {
// // //         type: "file"
// // //       }
// // //     }
// // //   }
// // // }

// SkillCsvSchema = new SimpleSchema({
// 	fileInput: {
// 	  type: String,
// 	  optional: true,
// 	  // label: "Upload a CSV file ",
// 	  autoform: {
// 	    afFieldInput: {
// 	      type: "file"
// 	    }
// 	  }
// 	}
// });

// //   type: {
// //     type: String,
// //     label: "Skill Type",
// //     optional: false
// //     // autoform: {
// //       // afFieldInput: {
// //       //   options: function () {
// //       //     //return options object
// //       //   }
// //       // }
// //     // }
// //   },
// //   skill_keyword: {
// //     type: String,
// //     label: "Keyword",
// //     optional: false
// //   }
// // });

// AutoForm.hooks({
//   insertSkillCsvForm: {
//     onSubmit: function(insertDoc, updateDoc, currentDoc) {
//       // You must call this.done()!
//       console.log(this.insertDoc);
//         Papa.parse( this.insertDoc, {
//           header: true,
//           complete: function( results, file ) {
//             var insertArray = results.data;
//             for (var i = 0; i < insertArray.length; i++) {
//               Meteor.call('insertSkill',insertArray[i], function(err,res) {
//                 if (res) {
//                   console.log('inserted skill' + insertArray[i].type + insertArray[i].skill_keyword);
//                 }
//               });
//             }
//           }
//         });

//         this.done();
//       //this.done(); // submitted successfully, call onSuccess
//       //this.done(new Error('foo')); // failed to submit, call onError with the provided error
//       //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
//     },

//     onSuccess: function(formType, post) {
// 		GlobalUI.closeDialog();
// 	    // console.log(post); 
// 		GlobalUI.toast('Skill CSV uploaded successfully. Running aggregations on new skills...');
//     },
//     onError: function(formType, error) {
// 		console.log(error);
//     }
//   }
// });