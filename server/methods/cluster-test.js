function _runSkillsFrequency(){
  var all = 'all';
  var date = new Date();

  var pipeline = [
    // { $match: filter },
    { $unwind: '$descriptionTags'},
    { $group: { 
        _id: {tag: '$descriptionTags'}, 
        tagName: {$first: '$descriptionTags'},
        total: { $sum: 1 }
      }
    },
    { 
      $project: {
        _id: 0,
        tagName: "$tagName",
        idTag: '$_id.tag',
        // parentCategory: { $literal: 'all' },
        // subSpecialization: { $literal: 'all' },
        total: 1,
        lastUpdate: { $literal: date } 
      }
    },
    { $out: 'SkillsFrequency'}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});

}  
  

Meteor.methods({
  runSkillsFrequency(){
    if (this.userId) {
      return _runSkillsFrequency();
    }
  }
});