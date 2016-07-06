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
  return archive.generate( { type: 'base64' } );
};
let extend = ( obj, src ) => {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};

// --- export dummy variables from skills collection
let dummyData = function (query, modifier, callback) {

  let archive = _initializeZipArchive();
  _compileDummyZip( archive, query, modifier );

  return _generateZipArchive( archive );
};
let dummyDataTest = function (query, modifier, callback) {
  return _prepareDummyDataTest(JSAggs,{},{});
};
let _compileDummyZip = ( archive, query, modifier) => {
  _prepareDummyDataForArchive( archive, JobStreetItems, 'csv', 'dummyVariables.csv', query, modifier );
};
let _prepareDummyDataForArchive = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getDummyDataFromCollection( collection, query, modifier ) : collection;
  if (data) {
    console.log(data);
  }
      // formattedData = _formatData[ type ]( data );
  // _addFileToZipArchive( archive, fileName, formattedData );
};
let _prepareDummyDataTest = (collection, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getDummyDataFromCollection( collection, query, modifier ) : collection;
  if (data) {
    console.log(data);
    return data;
  }
      // formattedData = _formatData[ type ]( data );
  // _addFileToZipArchive( archive, fileName, formattedData );
};
let _getDummyDataFromCollection = ( collection, query, modifier ) => {
  var queryMods = {
    // trackedSkills: {
    //   $ne: []
    // }
  };
  var modifierMods = {
    // fields: {
    //   trackedSkills: 1
    // }
  };

  var passedQuery = extend(query, queryMods);
  var passedMod = extend(modifier, modifierMods);
  var data = collection.find( passedQuery, passedMod ).fetch();

  var jsonResult = [];
  var skillsArray = Skills.find({},{sort: {parsed_keyword: 1} }).fetch();
  var bigSkills = skillsArray.map(function(doc) {
    return doc.parsed_keyword;
  });


  for (var i = 0, len=data.length; i<len; i++) {
    var mappedItem = {};
    mappedItem["_id"] = data[i]._id;
    mappedItem["parentCategory"] = data[i].parentCategory;
    mappedItem["subSpecialization"] = data[i].subSpecialization;
    mappedItem["listedIndustry"] = data[i].listedIndustry;
    mappedItem["listedSpec"] = data[i].listedSpec;
    mappedItem["listedRole"] = data[i].listedRole;
    mappedItem["companySnapIndustry"] = data[i].companySnapIndustry;
    mappedItem["experience"] = data[i].experience;
    
    for (var n = 0; n < bigSkills.length; n++) {
      var thisOneKeyword = bigSkills[n];
      // console.log(thisOneKeyword);
      //console.log(data[i].skillKeyword == thisOneKeyword);

      if (data[i].skillKeyword == thisOneKeyword) {
        mappedItem[thisOneKeyword] = data[i].total;
      } else {
        mappedItem[thisOneKeyword] = 0;
      }

    }

    // if(data[i].)

    // if (data[i].trackedSkills) {
    //   var keywords = data[i].trackedSkills.map(function(doc) {
    //     return doc.skillKeyword;
    //   });

    //   for (var j = 0; j < keywords.length; j++) {
    //     mappedItem[keywords[j]] = 1;
    //   }

    //   
    // }
    jsonResult.push(mappedItem);

  }

  return jsonResult;
};

Modules.server.dummyData = dummyData;
Modules.server.dummyDataTest = dummyDataTest;