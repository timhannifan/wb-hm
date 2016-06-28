function _runAggregations(){
  var all = 'all';
  var date = new Date();

  var pipeline = [
    // { $match: filter },
    { $unwind: '$trackedSkills'},
    { $group: { 
        _id: {skillKeyword: '$trackedSkills.skillKeyword'}, 
        skillId: {$first: '$trackedSkills.skillId'},
        total: { $sum: 1 }
      }
    },
    { 
      $project: {
        _id: 0,
        skillId: "$skillId",
        skillKeyword: '$_id.skillKeyword',
        parentCategory: { $literal: 'all' },
        subSpecialization: { $literal: 'all' },
        total: 1,
        lastUpdate: { $literal: date } 
      }
    },
    { $out: 'SkillsAggregations'}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});

}  
  

Meteor.methods({
  runAggregations(){
    if (this.userId) {
      return _runAggregations();
    }
  },
  fetchSkillData( filter ) {
    check( filter, Object );

    let group = { 
      _id: {skill: '$trackedSkills.skillKeyword'}, 
      total: { $sum: 1 }
    };

    if ( filter.parentCategory !== 'all' ) {
      group._id.parentCategory = '$parentCategory';// var idLookup = JobStreetSources.findOne({_id: filter.parentCategory}) 
      if (filter.subSpecialization !== 'all') {
        group._id.subSpecialization = '$subSpecialization';
      }
       
    }
    if ( filter.parentCategory === 'all' ) { delete filter.parentCategory; }
    if ( filter.subSpecialization === 'all'  ) { delete filter.subSpecialization;  }

    var pipeline = [
      { $match: filter },
      { $unwind: '$trackedSkills'},
      { $group: group },
    ];

    // var result = JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
    // console.log("Explain Report:", JSON.stringify(result[0]), null, 2);
    
    return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
  },
  resetAggregations(){
    if (this.userId) {
      return SkillsAggregations.remove({}, function (err,res){if(res){console.log('Completed resetting SkillsAggregations')}});
    }
  }
});


// SyncedCron.add({
//   name: 'Updating SkillsAggregations',
//   schedule: function(parser) {
//     // parser is a later.parse object
//     return parser.text('every 1 minutes');
//   }, 
//   job: function(intendedAt) {

//     console.log('running SkillsAggregations SyncedCron event');
//     console.log('job should be running at:');
//     console.log(intendedAt);
//     _runAggregations();
//   }
// });


// fetchSkillData( filter ) {
//   check( filter, Object );

//   let group = { 
//     _id: {skill: '$skillName'}, 
//     total: { $sum: '$count'}
//   };

//   if ( filter.parentCategory !== 'all' ) {
//     group._id.parentCategory = '$parentCategory';// var idLookup = JobStreetSources.findOne({_id: filter.parentCategory}) 
    
//     if (filter.subSpecialization !== 'all') {
//       group._id.subSpecialization = '$subSpecialization';
//     }
     
//   }
//   if ( filter.parentCategory === 'all' ) { delete filter.parentCategory; }
//   if ( filter.subSpecialization === 'all'  ) { delete filter.subSpecialization;  }

//   console.log(filter);
//   console.log(group);

//   return Counts.aggregate(
//     { $match: filter },
//     // { $project: }
//     { $group: group }
//   );
// }