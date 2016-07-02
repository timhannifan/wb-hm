// function _runJobStreetSummary(){

//   var argArray = [
//     { 
//       _id: {find: '$parentCategory'},
//       sumOf: {$first: '$parentCategory'},
//       total: { $sum: 1 }
//     },
//     // { 
//     //   _id: {find: '$subSpecialization'},
//     //   sumOf: {$first: '$subSpecialization'},
//     //   total: { $sum: 1 }
//     // }    
//   ];

//   for (var i = 0; i < argArray.length; i++) {
//     if(argArray[i]._id.find = '$parentCategory') {
//       _aggregateOut(argArray[i], 'JobStreetCounts.parentCategories');      
//     }

//   }
// };

// function _aggregateOut(group, out) {
//   var date = new Date();
//   var pipeline = [
//     { $group: group },
//     { $project: {
//         _id: 0,
//         sumOf: "$sumOf",
//         total: 1,
//         lastUpdate: { $literal: date } 
//       }
//     },
//     { $out: out}
//   ];

  
//   JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
// };

// Meteor.startup(function () {
//   _runJobStreetSummary();
// });
  

// Meteor.methods({
//   runJobStreetSummary(){
//     if (this.userId) {
//       return _runJobStreetSummary();
//     }
//   },
//   resetJobStreetSummaryAggregations(){
//     if (this.userId) {
//       return SkillsAggregations.remove({}, function (err,res){if(res){console.log('Completed resetting SkillsAggregations')}});
//     }
//   }
// });
