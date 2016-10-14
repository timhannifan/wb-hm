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

let _createNewDBRecord = (url, fileName, startDate, endDate) => {
  BatchDownloads.insert({
      url: url,
      fileName: fileName,
      periodStart: startDate,
      periodEnd: endDate,
      createdAt: new Date()
  });
}
let _runBatch = (startDate,endDate) => {
  console.log('running a batch export process for the following dates: ',startDate,endDate);

  let query = {
    $and: [ {createdAt: {$gte: startDate}}, {createdAt: {$lte: endDate}} ]
  };
  let modifier = {
    sort: {
      createdAt: -1
    },
    fields: JobStreetItems.publicFields
  };
  let data = JobStreetItems.find(query, modifier).fetch();
  let csvFile = Papa.unparse( data );
  let readableDate = function (date) {
     return moment(date).format('DMMMYYYY');
  }
  let dirName = '/production/';
  let fileName = readableDate(endDate) + '.csv';
  let awsString = dirName + fileName;

  if (csvFile) {
    console.log('inserting a file to s3:' + awsString);

    let req = client.put( awsString, {
        'Content-Length': Buffer.byteLength(csvFile),
        'Content-Type': 'text/csv',
        'x-amz-acl': 'public-read'
      }
    );

    req.on('response', function(res){
      bound(function(){
          if (200 == res.statusCode) {
            console.log('saved to %s', req.url);
            _createNewDBRecord(req.url, fileName, startDate, endDate);
          }
      })
    });

    req.end(csvFile);
  }
}

let _runBatchSeed = () => {
  const begginingOfTime = new Date(2016,1,1);

  let sched = later.parse.recur()
                .on(1).dayOfMonth().on('00:00').time()
              .and()
                .on(15).dayOfMonth().on('00:00').time();

  let backwards = later.schedule(sched).prev(15, new Date());
  
  for (var i = backwards.length - 1; i >= 0; i--) {

    if (backwards[i+1] < new Date()) {
      _runBatch(backwards[i+1],backwards[i]);
    }
  }
}

let _resetBatchDownloads = () => {
  BatchDownloads.remove({},function(err,res) {
    if(!err) {
      console.log('completed batch reset');
      _runBatchSeed();
    }
  });
}

Meteor.methods({
  runBatchTest: function () {
    let start = BatchDownloads.findOne({},{sort: {periodEnd: -1}}); 
    if (start.periodEnd) {
      _runBatchTest(start.periodEnd, new Date());
    }
  },
  resetBatchDownloads: function () {
    if (this.userId) {
      _resetBatchDownloads();
    }
  }
});

SyncedCron.add({
  name: 'Production batch data to s3',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('at 4:00 am on the 1st and 15th day of the month');
  }, 
  job: function(intendedAt) {
    console.log('Test batch data to s3 ' + intendedAt);
    let start = BatchDownloads.findOne({},{sort: {periodEnd: -1}}); 
    if (start.periodEnd) {
      _runBatch(start.periodEnd,intendedAt);      
    }
  }
});
