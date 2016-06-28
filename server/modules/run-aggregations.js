let run = () => {
  console.log('Running Modules.server.runAggregations!');
  return _runAggregations()
};

let _runAggregations = () => {
  let pipeline = [
    // { $match: filter },
    { $unwind: '$trackedSkills'},
    { $group: { 
        _id: {skillKeyword: '$trackedSkills.skillKeyword'}, 
        skillId: {$first: '$trackedSkills.skillId'},
        total: { $sum: 1 }
      }
    },
    { $project: {
      _id: 0,
      skillId: "$skillId",
      skillKeyword: '$_id.skillKeyword',
      // skillId: '$_id.skillId',
      total: 1
    }},
    { $out: 'SkillsAggregations'}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
};

Modules.server.runAggregations = run;