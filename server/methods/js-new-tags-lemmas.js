let Lemmatizer = Meteor.npmRequire('javascript-lemmatizer');

var lemmatizer = new Lemmatizer();

function _runJSNewTagLemmas(){
  var data = JSNewTagsFrequency.find({lemmas: null});
  console.log('STARTED running runJSNewTagLemmas for new item.count() ' + data.count());

  data.forEach(function (post) {
    var lemmas = lemmatizer.only_lemmas(post.word);

    // LemmaIndex.upsert({word: post.word}, {$set: {word: post.word, lemmas: lemmas}});

    JSNewTagsFrequency.update(
      { 
        _id: post._id
      },
      { 
        $set: {
          lemmas: lemmas
        }
      }
    );
  });
  console.log('COMPLETED running runJSNewTagLemmas');
}

Meteor.startup(function () {
  _runJSNewTagLemmas();
});

Meteor.methods({
  runJSNewTagLemmas(){
    if (this.userId) {

      return [_runJSNewTagLemmas()];
    }
  }
});