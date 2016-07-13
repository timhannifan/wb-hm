function _runJSNewTagAggregations(){

  var groups = [
    { 
      _id: {
        newDescriptionTags: '$newDescriptionTags'
      },
      count: { $sum: 1 }
    }
  ];


  for (var i = 0; i < groups.length; i++) {
    _aggregateOut(groups[i], 'JSNewTagsFrequency');

  }
};

function _aggregateOut(group, out) {
  var date = new Date();
  var pipeline = [
    { $unwind: '$newDescriptionTags'},
    { $group: group },
    { $project: {
        _id: 0, 
        word: '$_id.newDescriptionTags',
        count: 1,
        lemmas: { $literal: null},
        lastUpdate: { $literal: date } 
      }
    },
    { $out: out}
  ];

  
  return JSNewTags.aggregate(pipeline, {allowDiskUse: true});
}; 

Meteor.startup(function () {
   _runJSNewTagAggregations();
 }); 

Meteor.methods({
  runJSNewTagAggregations(){
    this.unblock();

    if (this.userId) {
      return _runJSNewTagAggregations();
    }
  }
});
