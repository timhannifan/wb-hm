// Meteor.methods({
//   testHttp: function (url) {
//     console.log('testHttp called', url);

//     var parentCategory = 'test',
//     subSpecialization = 'testsubspec';

//     HTTP.call("GET", url, function (error, result) {
//       var self = this;

//       if(error && result.statusCode !== 200){console.log('Request error.');}
      
//       if (result.statusCode == 200 && url.search("job-classified-ads") == -1){
//         console.log('Successful HTTP request on' + url);

//         //.position-title-link elements contain target URLS
//         var info = result.content
//         , $ = cheerio.load(info)
//         , $body = $('body');
//         var newItem = {};

//         newItem.title = cleanUp($body.find('#position_title').text());
//         if (newItem.title)
//           newItem.titleTags = _.uniq(yakiSplitClean(newItem.title));

//         newItem.url = url;
//         newItem.company = cleanUp($body.find('#company_name').text());
//         newItem.location = cleanUp($body.find('#single_work_location').text());
//         newItem.experience = cleanUp($body.find('span[itemprop="experienceRequirements"]').text());
//         newItem.companyRegistrationNumber = cleanUp($body.find('#company_registration_number').text());
//         newItem.companySize = cleanUp($body.find('#company_size').text());
//         newItem.benefits = cleanUp($body.find('#work_environment_benefits').text());
//         newItem.languagesSpoken = cleanUp($body.find('#work_environment_spoken_language').text());
//         newItem.datePosted = cleanUp($body.find('#posting_date').children().text());
//         newItem.parentCategory = parentCategory;
//         newItem.subSpecialization = subSpecialization;

//         console.log(newItem.experience);
        
//         newItem.description = $body.find('#job_description').text();
//         if (newItem.description)
//           newItem.descriptionTags = _.uniq(yakiSplitClean(newItem.description));
        
//         newItem.createdAt = new Date();
        
//         JobStreetItems.insert(newItem);
//       }



//       // Classified ads: some post properties are not available
//       if (result.statusCode == 200 && url.search("job-classified-ads") > 0){
//         console.log('Successful HTTP request, classified job posting, using alternate parse targets');

//         //.position-title-link elements contain target URLS
//         var info = result.content
//         , $ = cheerio.load(info)
//         , $body = $('body')
//         , newItem = {};


//         newItem.title = cleanUp($body.find('.rRowTitleCls').text());
//         if (newItem.title)
//           newItem.titleTags = _.uniq(yakiSplitClean(newItem.title));

//         newItem.url = obj.jobUrl;
//         newItem.company = cleanUp($body.find('.rRowCompanyCls').text());
//         newItem.location = cleanUp($body.find('.rRowLocCls').text());
//         newItem.description = cleanUp($body.find('.rRowJobFull').text());
//         newItem.sourceCategory = parentCategory;
//         newItem.sourceSpecialization = subSpecialization;
        
//         if (newItem.description)
//           newItem.descriptionTags = _.uniq(yakiSplitClean(newItem.description));
        
//         newItem.createdAt = new Date();
        
//         JobStreetItems.insert(newItem);
//       }
//     });
//   },
//   testPageQuery: function (url) {
//     HTTP.call("GET", url, function (error, result) {
//       var parentCategory = 'test',
//       subSpecialization = 'testsubspec';

//       var self = this;
//       var groupedItems = [];
//       self.items = new Array();
//       if(error)
//         console.log(error);
      
//       if (result && result.statusCode == 200){
//         console.log('Successful HTTP request!');

//         //.position-title-link elements contain target URLS
//         var info = result.content
//         , $ = cheerio.load(info)
//         , $body = $('body')
//         , $linkTargets = $body.find('.position-title-link');

//         // for each one of those elements found

//         for (var i = $linkTargets.length - 1; i >= 0; i--) {
          
//           var $a = $($linkTargets[i]).attr('href');
//           var specFields = $($linkTargets[i]).parent().parent().find('.job-specialization').children();
        
//           var modifiedObj = {};
//           modifiedObj.jobUrl = $a;
//           if (specFields.length == 3){
//             modifiedObj.listedSpec = specFields[0].children[0].data;
//             modifiedObj.listedRole = specFields[1].children[0].data;
//             modifiedObj.listedIndustry = specFields[2].children[0].data;
//           } else if (specFields.length == 2) {
//             modifiedObj.listedSpec = specFields[0].children[0].data;
//             modifiedObj.listedRole = null;
//             modifiedObj.listedIndustry = specFields[1].children[0].data;
//           } 

//           groupedItems.push(modifiedObj);
//         }

//       }

//       var uniques = getUniq(groupedItems) || null;

//       if (uniques) {
//         for (var i = uniques.length - 1; i >= 0; i--) {

//           var exists = JobStreetItems.findOne({
//             url: uniques[i].jobUrl
//           });

//           if (!!exists){
//               console.log('Found a matching URL. Skipping to next item');  
//           } else {
//               // getJobListingPageAndInsert(uniques[i], parentCategory, subSpecialization);
//               console.log('New jobStreetItem found, creating document....');    
//           }
//         }
//       }
//     });
//   }

// });