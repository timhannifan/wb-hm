let Lemmatizer = Meteor.npmRequire('javascript-lemmatizer');
let lemmatizer = new Lemmatizer();

let natural = MeteorNatural;
let wordTokenizer = new natural.WordTokenizer();
// console.log(tokenizer.tokenize("your dog has fleas."));
// let PorterStemmer = new natural.PorterStemmer();
// let bayesClassifier = new natural.BayesClassifier();
// let nounInflector = new natural.NounInflector();
// let presentVerbInflector = new natural.PresentVerbInflector();

function _runJobStreetAggregation(){
  console.log('STARTED _runJobStreetAggregation');
  var date = new Date();

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
        rawTitle: '$title',
        rawDescription: '$description',
        newTitleTags: { $literal: null } ,
        newDescriptionTags: { $literal: null } ,
        createdAt: { $literal: date } 
      }
    },
    { $out: 'JSNewTags'}
  ];

  console.log('COMPLETED _runJobStreetAggregation');
  return JobStreetItems.aggregate(pipeline, {allowDiskUse: true});
}; 

function strToKeywords(string) {
  if (string) {
    return string.replace(/[a-z.]+(?=[A-Z.]+)/g, function(x){return x+" ";})   // regex to convert camelCase
                  .replace(/_/g, " ")                               // regex for underscores
                  .replace(/\W/g, " ")                               // regex for 
                  .replace(/\d/g, " ")      //remove all digits
                  .replace(/\s{2,}/g," ")  //replace 2 or more whitespaces
                  .trim()
                  .toLowerCase()
                  .split(" ");
  }
};

function _updateDescTags(){
  console.log('STARTED _updateDescTags');
  var emptySet = JSNewTags.find({newDescriptionTags: null});

  emptySet.forEach(function (item) {
    var tagArray = strToKeywords(item.rawDescription);
    // console.log(tagArray);
    JSNewTags.update(
      { 
        _id: item._id
      },
      { 
        $set: {
          newDescriptionTags: tagArray
        }
      },
      function(err, res) {
        if (err) {
          console.log(err);
        }
      }
    );
  });
  console.log('COMPLETED _updateDescTags');
};
function _updateTitleTags(){
  console.log('STARTED _updateTitleTags');
  var emptySet = JSNewTags.find({newTitleTags: null});

  emptySet.forEach(function (item) {
    var tagArray = strToKeywords(item.rawTitle);
    JSNewTags.update(
      { 
        _id: item._id
      },
      { 
        $set: {
          newTitleTags: tagArray
        }
      },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
  });
  console.log('COMPLETED _updateTitleTags');
};

function _runJSNewDescTagLemmas(){
  var data = JSNewDescTagsFrequency.find({lemmas: null});
  console.log('STARTED running runJSNewDescTagLemmas for new item.count() ' + data.count());

  data.forEach(function (post) {
    var lemmas = lemmatizer.only_lemmas(post.word);

    // LemmaIndex.upsert({word: post.word}, {$set: {word: post.word, lemmas: lemmas}});

    JSNewDescTagsFrequency.update(
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
  console.log('COMPLETED running runJSNewDescTagLemmas');
};
function _runJSNewTitleTagLemmas(){
  var data = JSNewTitleTagsFrequency.find({lemmas: null});
  console.log('STARTED running runJSNewTitleTagLemmas for new item.count() ' + data.count());

  data.forEach(function (post) {
    var lemmas = lemmatizer.only_lemmas(post.word);

    // LemmaIndex.upsert({word: post.word}, {$set: {word: post.word, lemmas: lemmas}});

    JSNewTitleTagsFrequency.update(
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
  console.log('COMPLETED running runJSNewTitleTagLemmas');
};

function _runJSNewDescTagStems(){
  var data = JSNewDescTagsFrequency.find({stem: null});
  console.log('STARTED running runJSNewDescStems');

  data.forEach(function (post) {


    var stem = natural.PorterStemmer.stem(post.word);

    JSNewDescTagsFrequency.update(
      { 
        _id: post._id
      },
      { 
        $set: {
          stem: stem
        }
      }
    );
  });
  console.log('COMPLETED running runJSNewDescStems');
};
function _runJSNewTitleTagStems(){
  var data = JSNewTitleTagsFrequency.find({stem: null});
  console.log('STARTED running runJSNewTitleStems');

  data.forEach(function (post) {


    var stem = natural.PorterStemmer.stem(post.word);

    JSNewTitleTagsFrequency.update(
      { 
        _id: post._id
      },
      { 
        $set: {
          stem: stem
        }
      }
    );
  });
  console.log('COMPLETED running runJSNewTitleStems');
};

function _runJSNewDescTagAggregations(){
  _aggregateDescTagsOut({ _id: {newDescriptionTags: '$newDescriptionTags'}, count: { $sum: 1 } }, 'JSNewDescTagsFrequency');
};
function _runJSNewTitleTagAggregations(){
    console.log('STARTED running _runJSNewTitleTagAggregations');
    _aggregateTitleTagsOut({ 
      _id: {
        newTitleTags: '$newTitleTags'
      },
      count: { $sum: 1 }
    }, 'JSNewTitleTagsFrequency');
};
function _aggregateDescTagsOut(group, out) {
  var date = new Date();
  var pipeline = [
    { $unwind: '$newDescriptionTags'},
    { $group: group },
    { $project: {
        _id: 0, 
        word: '$_id.newDescriptionTags',
        count: 1,
        lemmas: { $literal: null},
        stem: { $literal: null},        
        lastUpdate: { $literal: date } 
      }
    },
    { $out: out}
  ];

  return JSNewTags.aggregate(pipeline, {allowDiskUse: true});
}; 
function _aggregateTitleTagsOut(group, out) {
  var date = new Date();
  var pipeline = [
    { $unwind: '$newTitleTags'},
    { $group: group },
    { $project: {
        _id: 0, 
        word: '$_id.newTitleTags',
        count: 1,
        lemmas: { $literal: null},
        stem: { $literal: null},
        lastUpdate: { $literal: date } 
      }
    },
    { $out: out}
  ];

  
  return JSNewTags.aggregate(pipeline, {allowDiskUse: true});
}; 

Meteor.methods({
  runFullTagSuite(){
    if (this.userId) {
      return [
        _runJobStreetAggregation(),
        _updateDescTags(),
        _updateTitleTags(),
        _runJSNewDescTagAggregations(),
        _runJSNewTitleTagAggregations(),
        _runJSNewDescTagLemmas(),
        _runJSNewTitleTagLemmas(),
        _runJSNewDescTagStems(),
        _runJSNewTitleTagStems()
      ];
    }
  }
});
