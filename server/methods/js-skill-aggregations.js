function _runJobStreetSkillAggregations(){

  var groups = [
    { 
      _id: {type: '$parentCategory', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$parentCategory'},
      total: { $sum: 1 }
    },
    { 
      _id: {type: '$subSpecialization', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$subSpecialization'},
      total: { $sum: 1 }
    }, 
    { 
      _id: {type: '$listedIndustry', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$listedIndustry'},
      total: { $sum: 1 }
    }, 
    { 
      _id: {type: '$listedSpec', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$listedSpec'},
      total: { $sum: 1 }
    }, 
    { 
      _id: {type: '$listedRole', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$listedRole'},
      total: { $sum: 1 }
    }, 
    { 
      _id: {type: '$companySnapIndustry', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$companySnapIndustry'},
      total: { $sum: 1 }
    }, 
    { 
      _id: {type: '$experience', skillKeyword: '$trackedSkills.skillKeyword'},
      typeName: {$first: '$experience'},
      total: { $sum: 1 }
    } 
  ];

  for (var i = 0; i < groups.length; i++) {

    if (groups[i]._id.type = '$parentCategory'){
      _aggregateOut(groups[i], 'parentCategory', 'JSAggs_parentCategory');
    }
    if (groups[i]._id.type = '$subSpecialization'){
      _aggregateOut(groups[i], 'subSpecialization', 'JSAggs_subSpecialization');
    }
    if (groups[i]._id.type = '$listedIndustry'){
      _aggregateOut(groups[i], 'listedIndustry', 'JSAggs_listedIndustry');
    }
    if (groups[i]._id.type = '$listedSpec'){
      _aggregateOut(groups[i], 'listedSpec', 'JSAggs_listedSpec');
    }
    if (groups[i]._id.type = '$listedRole'){
      _aggregateOut(groups[i], 'listedRole', 'JSAggs_listedRole');
    }
    if (groups[i]._id.type = '$companySnapIndustry'){
      _aggregateOut(groups[i], 'companySnapIndustry', 'JSAggs_companySnapIndustry');
    }
    if (groups[i]._id.type = '$experience'){
      _aggregateOut(groups[i], 'experience', 'JSAggs_experience');
    }

  }
};

function _aggregateOut(group, type, out) {
  var date = new Date();
  var pipeline = [
    { $unwind: '$trackedSkills'},
    { $group: group },
    { $project: {
        _id: 0, 
        // type: { $literal: type },
        typeString: '$_id.type',
        skillKeyword: '$_id.skillKeyword',
        total: 1,
        lastUpdate: { $literal: date } 
      }
    },
    { $out: out}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
};  

Meteor.methods({
  runJobStreetSkillAggregations(){
    this.unblock();

    if (this.userId) {
      return _runJobStreetSkillAggregations();
    }
  }
});
