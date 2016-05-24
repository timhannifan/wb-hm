function trueFunc(userId) {
  if (!userId) {
    // must be logged in
    return false;
  }

  return true;
}
function falseFunc() {return false;}

Collections.Files.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});

Collections.Files.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});