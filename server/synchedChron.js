// SyncedCron.config({
//   collectionName: 'scheduledJobs'
// });

// SyncedCron.add({
//   name: 'Monster XML',
//   schedule: function(parser) {
//     // parser is a later.parse object
//     return parser.text('every 2 minutes');
//   }, 
//   job: function(intendedAt) {
//     console.log('running Monster XML job');
//     console.log('job should be running at:');
//     console.log(intendedAt);
//   }
// });


// SyncedCron.add({
//   name: 'JobStreet source scrape',
//   schedule: function(parser) {
//     // parser is a later.parse object
//     return parser.text('every 2 minutes');
//   }, 
//   job: function(intendedAt) {
//     console.log('JobStreet source scrape');
//     console.log('job should be running at:');
//     console.log(intendedAt);
//   }
// });


Meteor.startup(function () {
  // code to run on server at startup
  SyncedCron.start();
});