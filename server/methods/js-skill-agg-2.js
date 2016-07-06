function _runJobStreetSkillAggregations2(){

  var groups = [
    { 
      _id: {
        parentCategory: '$parentCategory',
        subSpecialization: '$subSpecialization',
        listedIndustry: '$listedIndustry',
        listedSpec: '$listedSpec',
        listedRole: '$listedRole',
        companySnapIndustry: '$companySnapIndustry',
        experience: '$experience',
        skillKeyword: '$trackedSkills.skillKeyword'
      },
      typeName: {$first: '$parentCategory'},
      total: { $sum: 1 }
    }
  ];


  for (var i = 0; i < groups.length; i++) {
    _aggregateOut(groups[i], 'JSAggs');

  }
};

function _aggregateOut(group, out) {
  var date = new Date();
  var pipeline = [
    { $unwind: '$trackedSkills'},
    { $group: group },
    { $project: {
        _id: 0, 
        parentCategory: '$_id.parentCategory',
        subSpecialization: '$_id.subSpecialization',
        listedIndustry: '$_id.listedIndustry',
        listedSpec: '$_id.listedSpec',
        listedRole: '$_id.listedRole',
        companySnapIndustry: '$_id.companySnapIndustry',
        experience: '$_id.experience',
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
  runJobStreetSkillAggregations2(){
    this.unblock();

    if (this.userId) {
      return _runJobStreetSkillAggregations2();
    }
  }
});
