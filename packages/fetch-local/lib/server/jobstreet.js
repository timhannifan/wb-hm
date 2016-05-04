var cheerio = Npm.require('cheerio');
function cleanUp(string) {
	if (string != null) {
		return string.replace(/\0/g,' ')
		              .replace(/\W/g,' ')
		              .replace(/\s\s/g,' ')
		              .toLowerCase()
		              .trim();
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
function getHTTPjobUrlandInsert (obj, category, subspec) {
  console.log('inside getHTTPjobUrlandInsert');
  console.dir(obj);

  var parentCategory = category,
  subSpecialization = subspec;

  HTTP.call("GET", obj.jobUrl, function (error, result) {
    var self = this;

    if(error && result.statusCode !== 200){console.log('Request error.');}
    
    if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") == -1){
      console.log('Successful HTTP request on' + obj.jobUrl);

      //.position-title-link elements contain target URLS
      var info = result.content
      , $ = cheerio.load(info)
      , $body = $('body');
      var newItem = {};

      newItem.title = cleanUp($body.find('#position_title').text());
      if (newItem.title)
        newItem.titleTags = _.uniq(yakiSplitClean(newItem.title));

      newItem.url = obj.jobUrl;
      newItem.company = cleanUp($body.find('#company_name').text());
      newItem.location = cleanUp($body.find('#single_work_location').text());
      newItem.experience = cleanUp($body.find('#years_of_experience').text());
      newItem.companyRegistrationNumber = cleanUp($body.find('#company_registration_number').text());
      newItem.companySize = cleanUp($body.find('#company_size').text());
      newItem.benefits = cleanUp($body.find('#work_environment_benefits').text());
      newItem.languagesSpoken = cleanUp($body.find('#work_environment_spoken_language').text());
      newItem.postingDate = cleanUp($body.find('#posting_date').children().text());
      newItem.parentCategory = parentCategory;
      newItem.subSpecialization = subSpecialization;

      newItem.description = $body.find('#job_description').text();
      if (newItem.description)
        newItem.descriptionTags = _.uniq(yakiSplitClean(newItem.description));
      
      newItem.createdAt = new Date();
      
      JobStreetItems.insert(newItem);
    }



    // Classified ads: some post properties are not available
    if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") > 0){
      console.log('Successful HTTP request, classified job posting, using alternate parse targets');

      //.position-title-link elements contain target URLS
      var info = result.content
      , $ = cheerio.load(info)
      , $body = $('body')
      , newItem = {};


      newItem.title = cleanUp($body.find('.rRowTitleCls').text());
      if (newItem.title)
        newItem.titleTags = _.uniq(yakiSplitClean(newItem.title));

      newItem.url = obj.jobUrl;
      newItem.company = cleanUp($body.find('.rRowCompanyCls').text());
      newItem.location = cleanUp($body.find('.rRowLocCls').text());
      newItem.description = cleanUp($body.find('.rRowJobFull').text());
      newItem.sourceCategory = parentCategory;
      newItem.sourceSpecialization = subSpecialization;
      
      if (newItem.description)
        newItem.descriptionTags = _.uniq(yakiSplitClean(newItem.description));
      
      newItem.createdAt = new Date();
      
      JobStreetItems.insert(newItem);
    }

  });
}

function insertJobStreetItems(array, category, subspec) {
  for (var i = array.length - 1; i >= 0; i--) {

    var exists = JobStreetItems.findOne({
      url: array[i].jobUrl
    });

    if (!exists){
        getHTTPjobUrl(array[i], category, subspec);
        console.log('New jobStreetItem found, creating document....');      
    } else {
        console.log('Found a matching URL. Skipping to next item');
    }
  }
}

Meteor.methods({
  insertJobStreetSource: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = JobStreetSources.findOne({sourceUrl: data.sourceUrl});
      
      if( exists ){
      	console.log('Found a JobStreetSource with matching sourceUrl. Skipping this item.');
      } else {
      	console.log('Found a new JobStreetSource item. Creating original record...');
      	var item = {};
      	item.sourceName = data[ i ].sourceName;
      	item.sourceCategory = data[ i ].sourceCategory;
      	item.sourceUrl = data[ i ].sourceUrl;
      	item.sourceSpecialization = data[ i ].sourceSpecialization;
      	item.sourceSearchDepth = data[ i ].sourceSearchDepth;
      	item.sourceSpecializationCode = data[ i ].sourceSpecializationCode;

      	JobStreetSources.insert(item, function(err,res) {
      		if (err) {console.log(err)} else {console.log('JobStreetSource created successfully')}
      	});
      }
      
    }
  },
  testHttp: function (url) {
    console.log('testHttp called', url);
    // console.dir(obj);

    var parentCategory = 'test',
    subSpecialization = 'testsubspec';

    HTTP.call("GET", url, function (error, result) {
      var self = this;

      if(error && result.statusCode !== 200){console.log('Request error.');}
      
      if (result.statusCode == 200 && url.search("job-classified-ads") == -1){
        console.log('Successful HTTP request on' + url);

        //.position-title-link elements contain target URLS
        var info = result.content
        , $ = cheerio.load(info)
        , $body = $('body');
        var newItem = {};

        newItem.title = cleanUp($body.find('#position_title').text());
        if (newItem.title)
          newItem.titleTags = _.uniq(yakiSplitClean(newItem.title));

        newItem.url = url;
        newItem.company = cleanUp($body.find('#company_name').text());
        newItem.location = cleanUp($body.find('#single_work_location').text());
        newItem.experience = cleanUp($body.find('#years_of_experience').text());
        newItem.companyRegistrationNumber = cleanUp($body.find('#company_registration_number').text());
        newItem.companySize = cleanUp($body.find('#company_size').text());
        newItem.benefits = cleanUp($body.find('#work_environment_benefits').text());
        newItem.languagesSpoken = cleanUp($body.find('#work_environment_spoken_language').text());
        newItem.datePosted = cleanUp($body.find('#posting_date').children().text());
        newItem.parentCategory = parentCategory;
        newItem.subSpecialization = subSpecialization;

        console.log(newItem.datePosted);
        
        newItem.description = $body.find('#job_description').text();
        if (newItem.description)
          newItem.descriptionTags = _.uniq(yakiSplitClean(newItem.description));
        
        newItem.createdAt = new Date();
        
        JobStreetItems.insert(newItem);
      }



      // Classified ads: some post properties are not available
      if (result.statusCode == 200 && url.search("job-classified-ads") > 0){
        console.log('Successful HTTP request, classified job posting, using alternate parse targets');

        //.position-title-link elements contain target URLS
        var info = result.content
        , $ = cheerio.load(info)
        , $body = $('body')
        , newItem = {};


        newItem.title = cleanUp($body.find('.rRowTitleCls').text());
        if (newItem.title)
          newItem.titleTags = _.uniq(yakiSplitClean(newItem.title));

        newItem.url = obj.jobUrl;
        newItem.company = cleanUp($body.find('.rRowCompanyCls').text());
        newItem.location = cleanUp($body.find('.rRowLocCls').text());
        newItem.description = cleanUp($body.find('.rRowJobFull').text());
        newItem.sourceCategory = parentCategory;
        newItem.sourceSpecialization = subSpecialization;
        
        if (newItem.description)
          newItem.descriptionTags = _.uniq(yakiSplitClean(newItem.description));
        
        newItem.createdAt = new Date();
        
        JobStreetItems.insert(newItem);
      }

    });
  }
});

Meteor.startup(function() {
  JobStreetSources.after.insert(function (userId, doc) {
  	//// ADDING CLEANTITLE, MAPTOFOUR, KEYWORDS TO TITLETAGS AND TAGSONLY
    console.log('running after JobStreetSources insert');
  	
    var newDoc = JobStreetSources.findOne({_id: doc._id});

  	if (newDoc){
      var targets = [];
      var upperLimit = newDoc.sourceSearchDepth;
      i = 0;

      while (i < upperLimit) {
        var targetItem = {};
        targetItem.url = newDoc.sourceUrl + '&pg=' + i;
        targetItem.sourceCategory = newDoc.sourceCategory;
        targetItem.sourceSpecialization = newDoc.sourceSpecialization;
        console.log('target: ');
        console.dir(targetItem);
        targets.push(targetItem);

        i++;
      }

      for (var i = targets.length - 1; i >= 0; i--) {
        var parentCategory = targets[i].sourceCategory;
        var subSpecialization = targets[i].sourceSpecialization;
        // var exists = JobStreetSources.findOne({sourceUrl: data.sourceUrl});

        HTTP.call("GET", targets[i].url, function (error, result) {
          var self = this;
          var groupedItems = [];
          self.items = new Array();
          if(error)
            console.log(error);
          
          if (result && result.statusCode == 200){
            console.log('Successful HTTP request!');

            //.position-title-link elements contain target URLS
            var info = result.content
            , $ = cheerio.load(info)
            , $body = $('body')
            , $linkTargets = $body.find('.position-title-link');
            // , $jobDescTarget = $body.find("#job_desc_spec_1");

            // for each one of those elements found

            for (var i = $linkTargets.length - 1; i >= 0; i--) {
              
              var $a = $($linkTargets[i]).attr('href');
              var modifiedObj = {};
              modifiedObj.jobUrl = $a;
              
              groupedItems.push(modifiedObj);
            }

          }

          var uniques = getUniq(groupedItems) || null;

          if (uniques) {
            for (var i = uniques.length - 1; i >= 0; i--) {

              var exists = JobStreetItems.findOne({
                url: uniques[i].jobUrl
              });

              if (!exists){
                  getHTTPjobUrlandInsert(uniques[i], parentCategory, subSpecialization);
                  console.log('New jobStreetItem found, creating document....');      
              } else {
                  console.log('Found a matching URL. Skipping to next item');
              }
            }

            // insertJobStreetItems(getUniq(groupedItems), parentCategory, subSpecialization);            
          }
        });
      }
  	}
  });
});
