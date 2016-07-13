let jsZip    = Meteor.npmRequire( 'jszip' );
let tm = Meteor.npmRequire( 'text-miner' );
let Lemmatizer = Meteor.npmRequire('javascript-lemmatizer');
// ----- generic utilities
let _formatData = {
  csv( data )  { return Papa.unparse( data, {quotes: true, header: true} )}
};
let _initializeZipArchive = () => {
  return new jsZip();
};
let _addFileToZipArchive = ( archive, name, contents ) => {
  archive.file( name, contents );
};
let _generateZipArchive = ( archive ) => {
  return archive.generate( { type: 'base64' } );
};
let extend = ( obj, src ) => {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};

// --- export dummy variables from skills collection
let jsBulkDescriptionExport = function (query, modifier, callback) {

  let archive = _initializeZipArchive();
  _jsBulkDescriptionExport( archive, query, modifier );

  return _generateZipArchive( archive );
};
let jsLemmaExport = function (query, modifier, callback) {

  let archive = _initializeZipArchive();
  _jsLemmaExportExport( archive, query, modifier );

  return _generateZipArchive( archive );
};
let _jsBulkDescriptionExport = ( archive, query, modifier) => {
  _prepareTagFrequencyData( archive, JSNewTagsFrequency, 'csv', 'jsBulkDescriptionExport.csv', query, modifier );
};
let _jsLemmaExportExport = ( archive, query, modifier) => {
  _prepareLemmaDataForArchive( archive, JobStreetItems, 'csv', 'jsLemmaExport.csv', query, modifier );
};
let _prepareTagFrequencyData = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getJSNewTagsData( collection, query, modifier ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _prepareLemmaDataForArchive = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getLemmaDataFromCollection( collection, query, modifier ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _getJSNewTagsData = ( collection, query, modifier ) => {
	// console.log('started _getJSNewTagsData ' + new Date());
	var queryMods = {
  	// title: {
  	//   $ne: null
  	// }
	};
	var modifierMods = {
		sort: {
		  count: -1
		}
	};

	var passedQuery = extend(query, queryMods);
	var passedMod = extend(modifier, modifierMods);
	var data = collection.find( passedQuery, passedMod );
	// var data = collection.find( passedQuery, passedMod );

  if (data) {
    return data.map(function(doc){return {word: doc.word, count: doc.count, lemmas: doc.lemmas};});
  }

};
let _getLemmaDataFromCollection = ( collection, query, modifier ) => {
	console.log('started _getLemmaDataFromCollection ' + new Date());
	var queryMods = {
	// trackedSkills: {
	//   $ne: []
	// }
	};
	var modifierMods = {
		fields: {
		  description: 1
		}
	};

	var passedQuery = extend(query, queryMods);
	var passedMod = extend(modifier, modifierMods);
	// var data = collection.find( passedQuery, passedMod ).fetch();
	var data = collection.find( passedQuery, passedMod ).fetch();

  	var jsonResult = [];

    var my_corpus = new tm.Corpus([]);
    
    data.forEach(function (post) {
      var str = post.description;
      if (typeof str === 'string'){
        my_corpus.addDoc(str);
      }
    });

    my_corpus.trim()
        .map(function(doc) {
          return doc.replace(/[a-z.]+(?=[A-Z.]+)/g, function(x){return x+" ";})   // regex to convert camelCase
          .replace(/_/g, " ")                               // regex for underscores
          .replace(/\W/g, " ");                       // regex for non-word characters
        })      
        .toLower()                                
        .removeDigits()                             
        .removeWords(tm.STOPWORDS.EN)
        .clean();

    var terms = new tm.Terms(my_corpus);
    // console.log(terms.nTerms);
    // console.log(terms.vocabulary);
    // console.log(terms.findFreqTerms(2));

    var vocab = terms.vocabulary || null;
    var freq = terms.findFreqTerms(0) || null;

    if (freq) {
    	var wordsOnly = freq.map(function(doc) {
    		return doc.word;
    	});

    	var lemmatizer = new Lemmatizer();
    	var result = [];
    	wordsOnly.forEach(function(doc){
    		console.log(lemmatizer.only_lemmas(doc));
    		result.push(lemmatizer.only_lemmas(doc));
    	});

    	console.log('ended _getLemmaDataFromCollection ' + new Date());

    	return result;
    }
	// return jsonResult;
};

Modules.server.jsBulkDescriptionExport = jsBulkDescriptionExport;
Modules.server.jsLemmaExport = jsLemmaExport;


  // var jsonResult = [];

 //  var my_corpus = new tm.Corpus([]);

 //  if (data) {
 //    console.log('cursor is defined ',data.count());
 //    data.forEach(function (post) {
 //      var str = post.description;
 //      if (typeof str === 'string'){
 //        my_corpus.addDoc(str);
 //      }
 //    });

 //    my_corpus.trim()
 //        .map(function(doc) {
 //          function cleanWord (string) {
 //            return string.replace(/[a-z.]+(?=[A-Z.]+)/g, function(x){return x+" ";})   // regex to convert camelCase
 //                              .replace(/_/g, " ")                               // regex for underscores
 //                              .replace(/\W/g, " ");                       // regex for non-word characters

 //          };
 //          // console.log(cleanWord(doc));
 //          return cleanWord(doc);
 //        })
 //        .toLower()                                
 //        .removeDigits()                             
 //        .removeWords(tm.STOPWORDS.EN)
 //        .clean();
    
 //    //terms.nTerms, terms.vocabulary, terms.findFreqTerms(2)
 //    var terms = new tm.Terms(my_corpus);
 //    var freq = terms.findFreqTerms(0) || [];

 //    if (freq) {
 //      freq.forEach(function (doc) {
 //        DescriptionStrings.upsert({word: doc.word}, {$set: {word: doc.word, count: +doc.count}});
 //        // console.log(doc, ups);
 //      });
 //      console.log('ended _getJSNewTagsData ' + new Date());
 //      return DescriptionStrings.find().fetch();
 //    }

 //  }
  
