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
  console.log('running a new batch export: ' + startDate + ' through ' + endDate);

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
  let readableDate = function (date) {
     return moment(date).format('DMMMYYYY');
  }
  let fileName = '/production/'+ readableDate(startDate) + '_' + readableDate(endDate) + '.csv';

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
            _createNewDBRecord(req.url, fileName, startDate, endDate);
          }
      })
    });

    req.end(csvFile);
  }
}
let _runBatchSeed = () => {
  const begginingOfTime = new Date(2016,4,1,0,0,0);

  let sched = later.parse.recur()
                .on(1).dayOfMonth()
              .and()
                .on(15).dayOfMonth();

  let schedule = later.schedule(sched).next(100, begginingOfTime)

  for (var i = schedule.length - 1; i >= 0; i--) {
    if (schedule[i+1] < new Date()) {
      _runBatch(schedule[i],schedule[i+1]);      
    }
  }
}

let _cleanUpBatchCollections = () => {
  BatchDownloads.remove({});
  _runBatchSeed();
}

Meteor.methods({
  testBatch: function () {
    _runBatch();
  },
  resetBatchDownloads: function () {
    if (this.userId) {
      _cleanUpBatchCollections();
    }
  }
});



SyncedCron.add({
  name: 'Export batch data to s3',
  schedule: function(parser) {
    // return parser.text('every 1 min');
    return parser.recur()
                .on(1).dayOfMonth()
              .and()
                .on(15).dayOfMonth();
  }, 
  job: function(intendedAt) {
    console.log('running scheduled process: export batch data to s3 at ' + intendedAt);
    let cronSched = later.parse.recur()
                              .on(1).dayOfMonth()
                            .and()
                              .on(15).dayOfMonth();

    let start = later.schedule(cronSched).prev(1, intendedAt);

    _runBatch(start,intendedAt);
  }
});

Meteor.startup(function () {
  if (BatchDownloads.find().count() == 0 ){
    _runBatchSeed(); 
  }
});
