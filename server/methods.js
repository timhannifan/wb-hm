
// function resetRptTitleInKeywords (col) {
//   var data = Rpt.find();
//   var removeData = function(_id) {
//     Rpt.update(
//       {_id: _id}, 
//       { 
//         $unset: { 
//           titleInKeywords: ""
//         }
//       }, function(err,res) {
//           if( err) {
//             console.log(err);
//           } else {
//             console.log('successfully completed resetting titleInKeywords. ' + res + 'items removed');
//           }
//       }
//     );  
//   }

//   data.forEach(function (el) {
//     var id = el._id;

//     if ( id ) {
//       removeData(id);
//     }
//   });
// };

Meteor.methods({
resetMonsterSources: function () {
  MonsterSources.remove({});
},
resetJobStreetSources: function () {
  JobStreetSources.remove({});
},

resetJobStreetItems: function () {
  JobStreetItems.remove({});
},

resetJobStreetSources: function () {
  JobStreetSources.remove({});
},


})