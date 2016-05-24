var cheerio = Npm.require('cheerio');

function cleanUp(string) {
  if (string != null) {
    return string.toString()
                  .replace(/\0/g,' ')
                  .replace(/\W/g,' ')
                  .replace(/\s\s/g,' ')
                  .trim()
                  .replace('  ',' ');
  } else {
    return "";
  }
}
function cleanUpClosingDate(string) {
  if (string != null) {
    return string.trim()
                  .replace('Closing on ','');
  } else {
    return "";
  }
}
function cleanUpPostingDate(string) {
  if (string != null) {
    return string.trim()
                  .replace(' ','-');
  } else {
    return "";
  }
}
function cleanUpRole(string) {
  if (string != null) {
    return string.replace('>','')
                  .trim();
  } else {
    return "";
  }
}
function cleanUpIndustry(string) {
  if (string != null) {
    return string.replace('>','')
                  .trim();
  } else {
    return "";
  }
}
function cleanUpLocation(string) {
	if (typeof string === "string") {
		return string.trim();
	} else {
		return "";
	}
}
function yakiSplitClean(string) {
  return Yaki(string).split().clean();
}
function findIntersection(arg1,arg2) {
  return _.intersection(arg1,arg2);
}
function getUniq(array) {
	return _.uniq(array);
}
function getPageListings (url, parentCategory, subSpecialization) {
  HTTP.call("GET", url, function (error, result) {
    var self = this;
    var groupedItems = [];
    self.items = new Array();
    if(error) {
      console.log('error getting jobStreetPageQuery: ' + url);
    }
    
    if (result && result.statusCode == 200){
      console.log('Successful JobStreet page listing request!');

      //.position-title-link elements contain target URLS
      var info = result.content
      , $ = cheerio.load(info)
      , $body = $('body')
      , $linkTargets = $body.find('.position-title-link');

      for (var i = $linkTargets.length - 1; i >= 0; i--) {
        
        var $a = $($linkTargets[i]).attr('href');
        var specFields = $($linkTargets[i]).parent().parent().find('.job-specialization').children();
      
        var modifiedObj = {};
        modifiedObj.jobUrl = $a;
        if (specFields.length == 3){
          modifiedObj.listedSpec = specFields[0].children[0].data;
          modifiedObj.listedRole = specFields[1].children[0].data;
          modifiedObj.listedIndustry = specFields[2].children[0].data;
        } else if (specFields.length == 2) {
          modifiedObj.listedSpec = specFields[0].children[0].data;
          modifiedObj.listedRole = null;
          modifiedObj.listedIndustry = specFields[1].children[0].data;
        } 

        groupedItems.push(modifiedObj);
      }
    }

    var uniques = getUniq(groupedItems) || null;
    if (uniques) {
      for (var i = uniques.length - 1; i >= 0; i--) {
        var thisUrl = uniques[i].jobUrl;
        
        Meteor.setTimeout(function () {}, 100);

        var exists = JobStreetItems.findOne({url: thisUrl});
        
        if( exists ){
          console.log('Listing URL already exists');
        } else {
          console.log('NEW Listing URL');
          getJobListing(uniques[i], parentCategory, subSpecialization);          
        }
        
      }
    }
  });  
}
function getJobListing (obj, category, subspec) {
  var parentCategory = category,
  subSpecialization = subspec;

  HTTP.call("GET", obj.jobUrl, function (error, result) {
    var self = this;

    if(error || result.statusCode !== 200){console.log('Request error.');}
    
    if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") == -1){
      console.log('Successful jobListing HTTP request on: ' + obj.jobUrl);

      var info = result.content
      , $ = cheerio.load(info)
      , $body = $('body');
      var newItem = {};

      newItem.title = cleanUp($body.find('#position_title').text());
      if (newItem.title && typeof newItem.title === 'string') {
        var str = newItem.title;
        newItem.titleTags = _.uniq(yakiSplitClean(str.toLowerCase()));
      }

      newItem.url = obj.jobUrl;
      newItem.company = cleanUp($body.find('#company_name').text());

      newItem.location = cleanUpLocation($body.find('#single_work_location').text());

      newItem.experience = cleanUp($body.find('span[itemprop="experienceRequirements"]').text());
      newItem.companyRegistrationNumber = cleanUp($body.find('#company_registration_number').text());
      newItem.companySize = cleanUp($body.find('#company_size').text());
      newItem.benefits = cleanUp($body.find('#work_environment_benefits').text());
      newItem.languagesSpoken = cleanUp($body.find('#work_environment_spoken_language').text());
      newItem.datePosted = cleanUpPostingDate($body.find('#posting_date').children().text());
      newItem.dateClosing = cleanUpClosingDate($body.find('#closing_date').text());
      newItem.companySnapIndustry = cleanUp($body.find('#company_industry').text());
      newItem.companySnapDressCode = cleanUp($body.find('#work_environment_dress_code').text());
      
      newItem.parentCategory = parentCategory;
      newItem.subSpecialization = subSpecialization;
      newItem.listedSpec = obj.listedSpec;
      newItem.listedRole = cleanUpRole(obj.listedRole);
      newItem.listedIndustry = cleanUpIndustry(obj.listedIndustry);

      newItem.description = $body.find('#job_description').text();
      if (newItem.description  && typeof newItem.description === 'string') {
        var str = newItem.description;
        newItem.descriptionTags = _.uniq(yakiSplitClean(str.toLowerCase()));
      }

      newItem.companyOverview = cleanUp($body.find('#company_overview_all').children().text());
      if (newItem.companyOverview && typeof newItem.companyOverview === 'string') {
        var str = newItem.companyOverview;
        newItem.companyOverviewTags = _.uniq(yakiSplitClean(str.toLowerCase()));
      }

      newItem.createdAt = new Date();
      
      JobStreetItems.insert(newItem);

    } else if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") > 0){
    // Classified ads: some post properties are not available
    
      console.log('Successful HTTP request, classified job posting, using alternate parse targets');

      //.position-title-link elements contain target URLS
      var info = result.content
      , $ = cheerio.load(info)
      , $body = $('body')
      , newItem = {};

      newItem.title = cleanUp($body.find('.rRowTitleCls').text());
      if (newItem.title && typeof newItem.title === 'string') {
        var str = newItem.title;
        newItem.titleTags = _.uniq(yakiSplitClean(str.toLowerCase()));
      }

      newItem.url = obj.jobUrl;
      newItem.company = cleanUp($body.find('.rRowCompanyCls').text());
      newItem.location = cleanUp($body.find('.rRowLocCls').text());
      newItem.datePosted = cleanUp($body.find('.rRowDate').text());
      
      newItem.description = $body.find('.rRowJobFull').text();
      if (newItem.description  && typeof newItem.description === 'string') {
        var str = newItem.description;
        newItem.descriptionTags = _.uniq(yakiSplitClean(str.toLowerCase()));
      }

      newItem.parentCategory = parentCategory;
      newItem.subSpecialization = subSpecialization;
      newItem.listedSpec = obj.listedSpec;
      newItem.listedRole = cleanUpRole(obj.listedRole);
      newItem.listedIndustry = cleanUpIndustry(obj.listedIndustry)
      
      newItem.createdAt = new Date();
      
      JobStreetItems.insert(newItem);
    }
  });  
}

Meteor.methods({
  insertJobStreetSource: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      var item   = data[ i ];
      var exists = JobStreetSources.findOne({sourceUrl: item.sourceUrl});
      
      if( exists ){
      	console.log('Source already exists');
      } else {
        console.log('New JobStreet Source found.');
        var newSource = {};
        newSource.sourceName = item.sourceName;
        newSource.sourceCategory = item.sourceCategory;
        newSource.sourceUrl = item.sourceUrl;
        newSource.sourceSpecialization = item.sourceSpecialization;
        newSource.sourceSearchDepth = item.sourceSearchDepth;
        newSource.sourceSpecializationCode = item.sourceSpecializationCode;

        JobStreetSources.insert(newSource, function(err,res) {
         if (err) {console.log(err)} else {console.log('JobStreetSource created successfully')}
        });
      }
    }
  },
  testJSRefresh: function () {
    var existingSources = JobStreetSources.find({});

    existingSources.forEach(function(obj){
      var targets = [];
      var upperLimit = obj.sourceSearchDepth;
      i = 1;

      // create url query with page numbers based on search depth
      while (i <= upperLimit) {
        var targetItem = {};
        targetItem.url = obj.sourceUrl + '&pg=' + i;
        targetItem.sourceCategory = obj.sourceCategory;
        targetItem.sourceSpecialization = obj.sourceSpecialization;
        targets.push(targetItem);
        i++;
      }

      // for each page URL, callback HTTP get on it
      for (var i = targets.length - 1; i >= 0; i--) {
        var parentCategory = targets[i].sourceCategory;
        var subSpecialization = targets[i].sourceSpecialization;

        try {
          getPageListings(targets[i].url, parentCategory, subSpecialization);
        } catch (error) {
          console.log('Error retrieving jobstreet page listings on :' + targets[i].url, error);
        }
      }

      JobStreetSources.update({_id: obj._id}, {$set: {lastUpdate: new Date()}});
      return true;     
    });
    
  }
});

Meteor.startup(function() {
  JobStreetSources.after.insert(function (userId, doc) {
    var newDoc = JobStreetSources.findOne({_id: doc._id});

  	if (newDoc){
      var targets = [];
      var upperLimit = newDoc.sourceSearchDepth;
      i = 1;

      // create url query with page numbers based on search depth
      while (i <= upperLimit) {
        var targetItem = {};
        targetItem.url = newDoc.sourceUrl + '&pg=' + i;
        targetItem.sourceCategory = newDoc.sourceCategory;
        targetItem.sourceSpecialization = newDoc.sourceSpecialization;
        targets.push(targetItem);
        i++;
      }

      // for each page URL, callback HTTP get on it
      for (var i = targets.length - 1; i >= 0; i--) {
        var parentCategory = targets[i].sourceCategory;
        var subSpecialization = targets[i].sourceSpecialization;

        getPageListings(targets[i].url, parentCategory, subSpecialization);
      }
  	}
  });
});

function jobStreetAutoRun () {
  var existingSources = JobStreetSources.find({});

  existingSources.forEach(function(obj){
    var targets = [];
    var upperLimit = obj.sourceSearchDepth;
    i = 1;

    // create url query with page numbers based on search depth
    while (i <= upperLimit) {
      var targetItem = {};
      targetItem.url = obj.sourceUrl + '&pg=' + i;
      targetItem.sourceCategory = obj.sourceCategory;
      targetItem.sourceSpecialization = obj.sourceSpecialization;
      targets.push(targetItem);
      i++;
    }

    // for each page URL, callback HTTP get on it
    for (var i = targets.length - 1; i >= 0; i--) {
      var parentCategory = targets[i].sourceCategory;
      var subSpecialization = targets[i].sourceSpecialization;

      try {
        getPageListings(targets[i].url, parentCategory, subSpecialization);
      } catch (error) {
        console.log('Error retrieving jobstreet page listings on :' + targets[i].url, error);
      }
    }

    JobStreetSources.update({_id: obj._id}, {$set: {lastUpdate: new Date()}});
    return true;     
  });
  
}


// SyncedCron.add({
//   name: 'Jobstreet batch autorun',
//   schedule: function(parser) {
//     // parser is a later.parse object
//     return parser.text('every 8 hours');
//   }, 
//   job: function(intendedAt) {

//     console.log('running Jobstreet batch autorun');
//     console.log('job should be running at:');
//     console.log(intendedAt);
//     jobStreetAutoRun();
//   }
// });