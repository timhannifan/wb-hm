let knox    = Meteor.npmRequire('knox');
let Request = Meteor.npmRequire('request');
let later    = Meteor.npmRequire( 'later' );
let bound = Meteor.bindEnvironment(function(callback) {
  return callback();
});
let privateSettings = Meteor.settings.private.s3;
let cfdomain = privateSettings.cfdomain;
let client = knox.createClient({
  key: privateSettings.key,
  secret: privateSettings.secret,
  bucket: privateSettings.bucket,
  region: privateSettings.region
});
let extend = ( obj, src ) => {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};


let _createLocalRecord = (url, filename, filesize, start, end) => {
  DummyQueries.insert({
      url: url,
      fileName: filename,
      fileSize: filesize,
      startDate: start,
      endDate: end,
      createdBy: this.userId,
      createdAt: new Date()
  });
};

let _exportDummyVars = (start,end) => {
  console.log('exporting dummy vars ',start,end);

  let _getDummyDataFromCollection = ( start, end ) => {
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
  let jsonData = _getDummyDataFromCollection(start,end);

  if (jsonData) {
    let csvFile = Papa.unparse( jsonData );
    let readableDate = function (date) {
       return moment(date).format('DMMMYYYY');
    }
    let collectionCounter = DummyQueries.find().count();
    let dirName = '/production/dummyqueries/';
    let fileName = 'dummy-export-'+collectionCounter+'.csv';
    let awsString = dirName + fileName;

    if (csvFile) {
      console.log('inserting a file to s3:' + awsString);

      let filesize = Buffer.byteLength(csvFile);
      let req = client.put( awsString, {
          'Content-Length': filesize,
          'Content-Type': 'text/csv',
          'x-amz-acl': 'public-read'
        }
      );

      req.on('response', function(res){
        bound(function(){
            if (200 == res.statusCode) {
              console.log('saved to %s', req.url);
              _createLocalRecord(req.url, fileName, filesize, start, end);
            }
        })
      });

      req.end(csvFile);
    }
  }
}

let _resetDummyQueries = () => {
  DummyQueries.remove({},function(err,res) {
    if(!err) {
      console.log('completed reset');
    }
  });
}

Meteor.methods({
  exportDummyVars: function (start,end) {
    this.unblock();
    _exportDummyVars(start, end);
  },
  resetDummyQueries: function () {
    if (this.userId) {
      _resetDummyQueries();
    }
  }  
});