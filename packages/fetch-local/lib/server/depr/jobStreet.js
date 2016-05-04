// var cheerio = Npm.require('cheerio');

// Meteor.startup(function() {
//   if (JobStreetItems.find().count() == 0 && JobStreetSources.find().count() == 0) {
//     var specializationCodes = [
//       // {
//       //   sourceName: 'jobstreet',
//       //   sourceCategory: 'Accounting/Finance',
//       //   sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=130&area=&salary=&src=12',
//       //   sourceSpecialization: 'Audit and Taxation',
//       //   sourceSearchDepth: 2,
//       //   sourceSpecializationCode: 130
//       // }
//     ];
//     var subSpecTargets = [];
//     var jobDescriptionTargets = [];
//     var jobContentURLs = [];
//     var insertJSSource = function(obj){
//         JobStreetSources.insert({
//           sourceCategory: obj.sourceCategory,
//           sourceUrl: obj.sourceUrl,
//           sourceSpecialization: obj.sourceSpecialization,
//           sourceSearchDepth: obj.sourceSearchDepth,
//           sourceSpecializationCode: obj.sourceSpecializationCode
//         }, function(err, res){
//           if (err)
//             console.log(err);
//         });

//         subSpecTargets.push({
//           sourceUrl: obj.sourceUrl, 
//           sourceSearchDepth: obj.sourceSearchDepth,
//           sourceCategory: obj.sourceCategory,
//           sourceSpecialization: obj.sourceSpecialization,
//         });
//     };

//     for (var i = specializationCodes.length - 1; i >= 0; i--) {
//       insertJSSource(specializationCodes[i]);
//     }

//     var callback = function(obj,index){
//       var i = 1;
//       // upperLimit defines the pagedepth of the search minus 1
//       var upperLimit = obj.sourceSearchDepth;
//       var pageTarget = "";
//       while (i < upperLimit) {
//           pageTarget = obj.sourceUrl + '&pg=' + i;
//           i++;
//           console.log('pageTarget:' + pageTarget);
        
//         jobDescriptionTargets.push({
//           jobUrl: pageTarget, 
//           sourceCategory: obj.sourceCategory,
//           sourceSpecialization: obj.sourceSpecialization
//         });
//       }
//     }

//     for (var i = subSpecTargets.length - 1; i >= 0; i--) {  
//       callback(subSpecTargets[i]);
//     };

//     console.log('jobDescriptionTargets: ');
//     console.dir(jobDescriptionTargets);

//     var groupedItems = [];
//     var uniqueItems = _.uniq(groupedItems);
//     function insertNewItem (obj, category, subspec) {
//       console.log('inserting new item here....');
//       var parentCategory = category,
//       subSpecialization = subspec;

//       HTTP.call("GET", obj.jobUrl, function (error, result) {
//         var self = this;


//         if(error && result.statusCode !== 200){console.log('Request error.');}
        
//         if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") == -1){
//           console.log('Successful HTTP request on' + obj.jobUrl);

//           //.position-title-link elements contain target URLS
//           var info = result.content
//           , $ = cheerio.load(info)
//           , $body = $('body')
//           , newItem = {};

//           newItem.title = $body.find('#position_title').text();
//           newItem.title = $body.find('#position_title').text();
//           newItem.url = obj.jobUrl;
//           newItem.company = $body.find('#company_name').text();
//           newItem.location = $body.find('#single_work_location').text();
//           newItem.experience = $body.find('#years_of_experience').text();
//           newItem.sourceCategory = parentCategory;
//           newItem.sourceSpecialization = subSpecialization;

//           JobStreetItems.insert(newItem);
//         }

//         // Classified ads: some post properties are not available
//         if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") > 0){
//           console.log('Successful HTTP request, classified job posting, using alternate parse targets');

//           //.position-title-link elements contain target URLS
//           var info = result.content
//           , $ = cheerio.load(info)
//           , $body = $('body')
//           , newItem = {};

//           newItem.title = $body.find('.rRowTitleCls').text();
//           newItem.url = obj.jobUrl;
//           newItem.company = $body.find('.rRowCompanyCls').text();
//           newItem.location = $body.find('.rRowLocCls').text();
//           newItem.experience = null;
//           newItem.sourceCategory = obj.sourceCategory;
//           newItem.sourceSpecialization = obj.sourceSpecialization;

//           JobStreetItems.insert(newItem);
//         }

//       });
//     }
//     function findUniques(array) {
//       return (_.uniq(array));
//     }
//     function findUniquesCount(array) {
//       return (_.uniq(array).count());
//     }
//     function insertCleanedArray(array, category, subspec) {
//       for (var i = array.length - 1; i >= 0; i--) {

//         var exists = JobStreetItems.findOne({url: array[i].jobUrl});
//         if (exists){
//           console.log('Found a matching URL. Skipping to next item');
//         } else {
//           console.log('New jobStreetItem found, creating document....');
//           insertNewItem(array[i], category, subspec);
//         }
//       }
//     }
//     function callbackUnique(array) {
//       return _.uniq(array);
//     }
//     var uniqueJobs = findUniques(groupedItems);

//     // console.log(jobDescriptionTargets);
//     for (var i = jobDescriptionTargets.length - 1; i >= 0; i--) {
//       console.log('JOB DESCRIPTION TARGET');
//       console.dir(jobDescriptionTargets[i]);
//       var parentCategory = jobDescriptionTargets[i].sourceCategory;
//       var subSpecialization = jobDescriptionTargets[i].sourceSpecialization;

//       console.log(parentCategory);
//       console.log(subSpecialization);

//       HTTP.call("GET", jobDescriptionTargets[i].jobUrl, function (error, result) {
//         var self = this;
//         self.items = new Array();
//         if(error && result.statusCode !== 200){console.log('Request error.');}
        
//         if (result.statusCode == 200){
//           console.log('Successful HTTP request!');

//           //.position-title-link elements contain target URLS
//           var info = result.content
//           , $ = cheerio.load(info)
//           , $body = $('body')
//           , $targets = $body.find('.position-title-link');

//           // for each one of those elements found

//           for (var i = $targets.length - 1; i >= 0; i--) {
            
//             var $a = $($targets[i]).attr('href');
//             var modifiedObj = {};
//             modifiedObj.jobUrl = $a;
//             groupedItems.push(modifiedObj);
//           };
//         }

//         insertCleanedArray(callbackUnique(groupedItems), parentCategory, subSpecialization);
//       });
//     }
    
//   }
// });
