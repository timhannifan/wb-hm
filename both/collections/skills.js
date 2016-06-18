Skills = new Mongo.Collection('skills');
Counts = new Mongo.Collection('counts');

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

Counts.allow({
  remove: function (userId, doc) {
    if (!userId) {
      // must be logged in
      return false;
    }

    return true;
  }
});