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

let _jsBulkDescriptionExport = ( archive, query, modifier) => {
  _prepareFrequencyData( archive, JSNewDescTagsFrequency, 'csv', 'descriptionTags.csv', query, modifier );
  _prepareFrequencyData( archive, JSNewTitleTagsFrequency, 'csv', 'titleTags.csv', query, modifier );
  // _prepareTitleTagFrequencyData( archive, JSNewTitleTagsFrequency, 'csv', 'titleTags.csv', query, modifier );
};

let _prepareFrequencyData = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getFrequencyData( collection, query, modifier ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _getFrequencyData = ( collection, query, modifier ) => {
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
    return data.map(function(doc){return {word: doc.word, count: doc.count, lemmas: doc.lemmas, stem: doc.stem};});
  }

};

Modules.server.jsBulkDescriptionExport = jsBulkDescriptionExport;