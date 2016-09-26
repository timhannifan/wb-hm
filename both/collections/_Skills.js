Skills = new Mongo.Collection('skills');
SkillsKeywordInstances = new Mongo.Collection('SkillsKeywordInstances');
if ( Meteor.isServer ) {
  SkillsKeywordInstances._ensureIndex( { createdAt: -1 } );
  Skills._ensureIndex( { parsed_keyword: "text" } );
}


function trueFunc(userId) {
  if (!userId) {
    // must be logged in
    return false;
  }

  return true;
}
function falseFunc() {return false;}

Skills.allow({
  insert: function (userId, doc) {
    if (!userId) {
      // must be logged in
      return false;
    }

    return true;
  },
  update: function (userId, doec) {
    if (!userId) {
      // must be logged in
      return false;
    }

    return true;    
  }
});

Skills.after.insert(function (userId, doc) {
  console.log('running classification on ' + doc.parsed_keyword);

  var exactMatch ='\"' + doc.parsed_keyword + '\"';
  var cursor =    JobStreetItems.find(
      { $text: { $search: exactMatch, $language: 'en' }}
  );

  cursor.forEach(function (el) {
    var nObj = {};
    nObj.keywordId = doc._id;
    nObj.keywordMatch = doc.parsed_keyword;
    nObj.keywordType = doc.type;
    nObj.source = 'JobStreet';
    nObj.id = el._id;
    nObj.parentCategory = el.parentCategory;
    nObj.subSpecialization = el.subSpecialization;
    nObj.listedIndustry = el.listedIndustry;
    nObj.listedSpec = el.listedSpec;
    nObj.listedRole = el.listedRole;
    nObj.companySnapIndustry = el.companySnapIndustry;
    nObj.experience = el.experience;
    nObj.createdAt = el.createdAt;      
    
    SkillsKeywordInstances.insert(nObj);
  });

  let uniqueJobStreetCount  = cursor.count();

  Skills.update({_id: doc._id}, {$set: {count: uniqueJobStreetCount}}, function (err, res) {
    console.log('completed inserting ' + doc.parsed_keyword);
  });
});