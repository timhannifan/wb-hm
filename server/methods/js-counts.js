function _runJobStreetCounts(){

  var argArray = [
    { 
      _id: {find: '$parentCategory'},
      // sumOf: {$first: '$parentCategory'},
      total: { $sum: 1 }
    },
    { 
      _id: {find: '$subSpecialization'},
    //   sumOf: {$first: '$subSpecialization'},
      total: { $sum: 1 }
    }    
  ];

  for (var i = 0; i < argArray.length; i++) {
    if(argArray[i]._id.find = '$parentCategory') {
      _aggregateOut(argArray[i], 'JobStreetParentCategoryCounts');      
    }    
    if(argArray[i]._id.find = '$subSpecialization') {
      _aggregateOut(argArray[i], 'JobStreetSubSpecializationCounts');      
    }

  }
};

function _aggregateOut(group, out) {
  var date = new Date();
  var pipeline = [
    { $group: group },
    { $project: {
        _id: 0,
        sumOf: "$_id.find",
        total: 1,
        lastUpdate: { $literal: date } 
      }
    },
    { $out: out}
  ];

  
  JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
};

function _resetJobStreetCounts() {
	return [
  JobStreetParentCategoryCounts.remove({}, function (err,res){if(res){console.log('Completed resetting JobStreetParentCategoryCounts')}}),
  JobStreetSubSpecializationCounts.remove({}, function (err,res){if(res){console.log('Completed resetting JobStreetSubSpecializationCounts')}})
  ];

}

Meteor.startup(function () {
	// _resetJobStreetCounts();
	// _runJobStreetCounts();

});
  

Meteor.methods({
  runJobStreetCounts(){
    if (this.userId) {
      return _runJobStreetCounts();
    }
  },
  resetJobStreetCounts(){
    if (this.userId) {
      return _resetJobStreetCounts();
    }
  }
});
