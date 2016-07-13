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
  resetAggregations(){
    if (this.userId) {
      return SkillsAggregations.remove({}, function (err,res){if(res){console.log('Completed resetting SkillsAggregations')}});
    }
  }
});