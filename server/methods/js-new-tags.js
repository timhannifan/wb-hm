function _runNewTagsFrequency(){
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
    { $out: 'NewTagsFrequency'}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});

}  

function _rerunTags(){
  var date = new Date();
  function _getNewTags(str) {
    return ["IT WORKS", "really", "well"];
  }

  var pipeline = [
    { 
      $match: {
        title: {$ne: null},
        description: {$ne: null}
      }
    },
    { 
      $project: {
        _id: 0,
        ref_id: "$_id",
        rawDescription: '$description',
        newDescriptionTags: { $literal: null } ,
        createdAt: { $literal: date } 
      }
    },
    { $out: 'JSNewTags'}
  ];

  
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});

}  

function strToKeywords(string) {
  var cleanString = string.replace(/[a-z.]+(?=[A-Z.]+)/g, function(x){return x+" ";})   // regex to convert camelCase
                          .replace(/_/g, " ")                               // regex for underscores
                          .replace(/\W/g, " ")                               // regex for 
                          .replace(/\d/g, " ")      //remove all digits
                          .replace(/\s{2,}/g," ")  //replace 2 or more whitespaces
                          .trim()
                          .toLowerCase();

  // console.log(cleanString);

  return cleanString.split(" ");

};

function _updateDescTags(){
  console.log('STARTED _updateDescTags');
  var data = JSNewTags.find({newDescriptionTags: null});

  data.forEach(function (post) {
    var stringDescription = strToKeywords(post.rawDescription);
    console.log(stringDescription);
    JSNewTags.update(
      { 
        _id: post._id
      },
      { 
        $set: {
          newDescriptionTags: stringDescription
        }
      },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          // console.log('update JSNewTags completed');
        }
      }
    );
  });

  console.log('COMPLETED _updateDescTags');
}

Meteor.startup(function () {
//   _rerunTags();
  _updateDescTags();
});
  

Meteor.methods({
  runNewTagsFrequency(){
    if (this.userId) {

      return [_rerunTags(),_updateDescTags()]//;_runSkillsFrequency(),;
    }
  }
});