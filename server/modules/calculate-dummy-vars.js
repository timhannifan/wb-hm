let jsZip    = Meteor.npmRequire( 'jszip' );

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
  return archive.generateAsync( { type: 'base64' } );
};
let extend = ( obj, src ) => {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};

// --- export dummy variables from skills collection
let exportDummyVars = function (query, modifier, callback) {
  console.log('exporting dummy vars');

  let archive = _initializeZipArchive();
  _compileDummyZip( archive, query, modifier );

  return _generateZipArchive( archive );
};
let _compileDummyZip = ( archive, query, modifier) => {
  _prepareDummyDataForArchive( archive, JobStreetItems, 'csv', 'dummyVariables.csv', query, modifier );
};
let _prepareDummyDataForArchive = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getDummyDataFromCollection( collection, query, modifier ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _getDummyDataFromCollection = ( collection, query, modifier ) => {

  var modifierMods = {
    fields: {
      _id: 1
    }
  };

  var passedMod = extend(modifier, modifierMods);
  var jobStreetData = collection.find( query, passedMod );
  var currentKeywords = Skills.find({},{sort: {parsed_keyword: 1} });
  var jsonResult = [];
  var defaultItem = {};

  currentKeywords.forEach(function (doc) {
    defaultItem[doc.parsed_keyword] = 0;
  });

  jobStreetData.forEach(function (doc) {
    var newObject = JSON.parse(JSON.stringify(defaultItem));
    var matchingDocs = SkillsKeywordInstances.find({id: doc._id});  
    newObject["_id"] = doc._id;

    matchingDocs.forEach(function(doc) {
      newObject[doc.keywordMatch] = 1;
    });

    jsonResult.push(newObject);
  });

  return jsonResult;
};

Modules.server.exportDummyVars = exportDummyVars;