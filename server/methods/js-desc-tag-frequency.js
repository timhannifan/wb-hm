function _runJobStreetDescTagFrequency(){

  var groups = [
    { 
      _id: {
        // parentCategory: '$parentCategory',
        // subSpecialization: '$subSpecialization',
        // listedIndustry: '$listedIndustry',
        // listedSpec: '$listedSpec',
        listedRole: '$listedRole',
        // companySnapIndustry: '$companySnapIndustry',
        // experience: '$experience',
        descriptionTag: '$descriptionTags'
      },
      total: { $sum: 1 }
    }
  ];


  for (var i = 0; i < groups.length; i++) {
    _aggregateOut(groups[i], 'JSFrequency_Role');

  }
};

function _aggregateOut(group, out) {
  var date = new Date();
  var pipeline = [
    { $unwind: '$descriptionTags'},
    { $group: group },
    { $project: {
        _id: 0, 
        // parentCategory: '$_id.parentCategory',
        // subSpecialization: '$_id.subSpecialization',
        // listedIndustry: '$_id.listedIndustry',
        // listedSpec: '$_id.listedSpec',
        listedRole: '$_id.listedRole',
        // companySnapIndustry: '$_id.companySnapIndustry',
        // experience: '$_id.experience',
        descriptionTag: '$_id.descriptionTag',
        total: 1,
        lastUpdate: { $literal: date } 
      }
    },
    { $out: out}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
};  

Meteor.methods({
  runJobStreetDescTagFrequency(){
    this.unblock();

    if (this.userId) {
      return _runJobStreetDescTagFrequency();
    }
  }
});
