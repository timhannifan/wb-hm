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
    },
    limit: 100
  };

  console.log(query);

  var passedMod = extend(modifier, modifierMods);
  var jobstreetItems = collection.find( query, passedMod ).fetch();

  var jsonResult = [];
  var skillsArray = Skills.find({},{sort: {parsed_keyword: 1} }).fetch();

  function getSkills(arr) {
    return arr.map(function(doc){return doc.parsed_keyword});
  }

  for (var i = 0, len=jobstreetItems.length; i<len; i++) {
    // var earlyTest =  SkillsKeywordInstances.findOne({id: jobstreetItems[i]._id});

    // if (earlyTest) {
      var mappedItem = {};
      mappedItem["_id"] = jobstreetItems[i]._id;

      var skillsKeywords = getSkills(skillsArray);
      
      for (var n = 0; n < skillsKeywords.length; n++) {
        var cleaned = skillsKeywords[n].replace("'","");


        var test = SkillsKeywordInstances.findOne({$and: [{id: jobstreetItems[i]._id},{keywordMatch: skillsKeywords[n]}]});

        if (test) {
          mappedItem[skillsKeywords[n]] = 1;
        } else {
          mappedItem[skillsKeywords[n]] = 0;
        }
      }

      jsonResult.push(mappedItem);
    // }
  }

  return jsonResult;
};

Modules.server.exportDummyVars = exportDummyVars;