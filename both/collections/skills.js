Counts = new Mongo.Collection('counts');
SkillsAggregations = new Mongo.Collection('SkillsAggregations');
SkillsFrequency = new Mongo.Collection('SkillsFrequency');

function trueFunc(userId) {
  if (!userId) {
    // must be logged in
    return false;
  }

  return true;
}
function falseFunc() {return false;}

SkillsAggregations.allow({
    update: function (userId, doec) {
    if (!userId) {
      // must be logged in
      return false;
    }

    return true;    
  },
  remove: function (userId, doc) {
    if (!userId) {
      // must be logged in
      return false;
    }

    return true;
  }
});