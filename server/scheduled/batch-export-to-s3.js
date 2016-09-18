let knox    = Meteor.npmRequire('knox');
let Request = Meteor.npmRequire('request');
let bound = Meteor.bindEnvironment(function(callback) {
  return callback();
});
let privateSettings = Meteor.settings.private.s3;
let cfdomain = privateSettings.cfdomain; // <-- Change to your Cloud Front Domain
let client = knox.createClient({
  key: privateSettings.key,
  secret: privateSettings.secret,
  bucket: privateSettings.bucket,
  region: privateSettings.region
});

let _createNewDBRecord = (url, fileName) => {
  BatchDownloads.insert({
      url: url,
      fileName: fileName,
      createdAt: new Date()
  });
}
let _runBatch = () => {
  let startDate = new Date();
  startDate.setDate(startDate.getDate()-5);
  let endDate = new Date();

  console.log(startDate.toLocaleString())
  console.log(endDate.toLocaleString())
  let query = {
    $and: [ {createdAt: {$gte: startDate}}, {createdAt: {$lte: endDate}} ]
  };
  let modifier = {
      sort: {
      createdAt: -1
    }
  };
  let data = JobStreetItems.find(query, modifier).fetch();
  let csvFile = Papa.unparse( data );
  let readableDate = moment(new Date()).format('DMMMYYYY');
  let fileName = '/test/batch_'+ readableDate + '.csv';

  if (csvFile) {
    console.log('inserting a file to s3:' + fileName);


    let req = client.put( fileName, {
        'Content-Length': Buffer.byteLength(csvFile),
        'Content-Type': 'text/csv',
        'x-amz-acl': 'public-read'
      }
    );

    req.on('response', function(res){
      bound(function(){
          if (200 == res.statusCode) {
            console.log('saved to %s', req.url);
            _createNewDBRecord(req.url, fileName);
          }
      })
    });

    req.end(csvFile);
  }
}

Meteor.methods({
  testBatch: function () {
    _runBatch();
  }
});

SyncedCron.add({
  name: 'Export batch data to s3',
  schedule: function(parser) {
    return parser.text('every 1 min');
  }, 
  job: function(intendedAt) {
    console.log('running scheduled process: export batch data to s3 at ' + intendedAt);


    // _runBatch();
  }
});

