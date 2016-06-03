Skills = new Mongo.Collection('skills');

// Skills.schema = new SimpleSchema({
//   skill_keyword: {
//     type: String,
//     optional: false
//   }
// });

// Skills.attachSchema(Skills.schema);

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
  }
});