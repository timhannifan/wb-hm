let _getDummyData = function (start, end, callback) {
  console.log('_getDummyData called', start, end);

  return _getFormattedData('csv', start, end );
};

let _getFormattedData = (type,start, end ) => {
  let data          = _prepRawData(start, end ),
      formattedData = _formatType[ type ]( data );

  console.log(formattedData);
  return formattedData;
};

let _prepRawData = function( start, end ) {
  let query = {
    $and: [
      {createdAt: {$gte: start}},
      {createdAt: {$lte: end }}
    ]
  };
  var modifier = {
    fields: {
      _id: 1
    }
  };
  // var passedMod = extend(modifier, modifierMods);
  var jobStreetData = JobStreetItems.find( query, modifier );
  var currentKeywords = Skills.find({},{sort: {parsed_keyword: 1} });
  var jsonResult = [];
  var defaultItem = {};

  if (currentKeywords && jobStreetData) {
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
  }
}; 

let _formatType = {
  csv( data )  { return Papa.unparse( data, {header: true} )}
};

Modules.server.submoduleDummyData = _getDummyData;