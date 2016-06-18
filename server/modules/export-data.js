let jsZip    = Meteor.npmRequire( 'jszip' );

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

let exportData = ( options ) => {

  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
};

let exportDataSync = function (options,callback) {

  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
};

let exportDummyVars = function (query, modifier, callback) {

  let archive = _initializeZipArchive();
  _compileDummyZip( archive, query, modifier );

  return _generateZipArchive( archive );
};


let _compileZip = ( archive, limit, skip) => {
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'data.csv', limit, skip );
};

let _compileDummyZip = ( archive, query, modifier) => {
  _prepareDummyDataForArchive( archive, JobStreetItems, 'csv', 'dummyVariables.csv', query, modifier );
};

let _prepareDataForArchive = ( archive, collection, type, fileName, limit, skip ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, limit, skip ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

var _prepareDummyDataForArchive = ( archive, collection, type, fileName, query, modifier ) => {
  var data          = collection instanceof Mongo.Collection ? _getDummyDataFromCollection( collection, query, modifier ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _getDataFromCollection = ( collection, limit, skip ) => {
  let data = collection.find( {}, { sort: {createdAt: -1}, limit: limit, skip: skip} ).fetch();
  if ( data ) {
    return data;
  }
};

var _getDummyDataFromCollection = ( collection, query, modifier ) => {
  var queryMods = {
    trackedSkills: {
      $ne: []
    }
  };
  var modifierMods = {
    fields: {
      trackedSkills: 1
    }
    // limit: 10
  };

  var passedQuery = extend(query, queryMods);
  var passedMod = extend(modifier, modifierMods);
  var data = collection.find( passedQuery, passedMod ).fetch();

  var jsonResult = [];
  var skillsArray = Skills.find({},{sort: {parsed_keyword: 1} }).fetch();
  var allSkills = skillsArray.map(function(doc){return doc.parsed_keyword});
  function getSkills(arr) {
    return arr.map(function(doc){return doc.parsed_keyword});
  }

  for (var i = 0, len=data.length; i<len; i++) {
    var mappedItem = {};
    mappedItem["_id"] = data[i]._id;
    var bigSkills = getSkills(skillsArray);
    
    for (var n = 0; n < bigSkills.length; n++) {
      mappedItem[bigSkills[n]] = 0;
    }


    function theseKeywords(arr) {
      return arr.map(function(doc){return doc.skillKeyword});
    };

    var keywords = theseKeywords(data[i].trackedSkills);

    for (var j = 0; j < keywords.length; j++) {
      mappedItem[keywords[j]] = 1;
    }

    jsonResult.push(mappedItem);
  }

  return jsonResult;
}


let _formatData = {
  csv( data )  { return Papa.unparse( data, {quotes: true, header: true} ); }
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

Modules.server.exportData = exportData;
Modules.server.exportDataSync = exportDataSync;
Modules.server.exportDummyVars = exportDummyVars;