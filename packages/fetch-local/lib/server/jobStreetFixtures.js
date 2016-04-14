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
function insertNewItem (obj, category, subspec) {
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

      newItem.title = $body.find('#position_title').text();
      newItem.url = obj.jobUrl;
      newItem.company = $body.find('#company_name').text();
      newItem.location = $body.find('#single_work_location').text();
      newItem.experience = $body.find('#years_of_experience').text();
      newItem.companyRegistrationNumber = $body.find('#company_registration_number').text();
      newItem.companySize = $body.find('#company_size').text();
      newItem.benefits = $body.find('#work_environment_benefits').text();
      newItem.languagesSpoken = $body.find('#work_environment_spoken_language').text();
      newItem.companyAddress = $body.find('#address').text();
      newItem.createdAt = new Date();
      newItem.description = $body.find('#job_description').text();

      newItem.sourceCategory = parentCategory;
      newItem.sourceSpecialization = subSpecialization;

      if (  $body && newItem.title 
          && newItem.company 
          && newItem.location 
          && newItem.experience
          && newItem.description
          // && newItem.companyRegistrationNumber
          // && newItem.companySize
          // && newItem.benefits
          // && newItem.languagesSpoken
          // && newItem.companyAddress
          && newItem.createdAt
          && newItem.sourceCategory
          && newItem.sourceSpecialization
      
      ){
        JobStreetItems.insert(newItem);
      }

    }

    // Classified ads: some post properties are not available
    if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") > 0){
      console.log('Successful HTTP request, classified job posting, using alternate parse targets');

      //.position-title-link elements contain target URLS
      var info = result.content
      , $ = cheerio.load(info)
      , $body = $('body')
      , newItem = {};

      newItem.title = $body.find('.rRowTitleCls').text();
      newItem.url = obj.jobUrl;
      newItem.company = $body.find('.rRowCompanyCls').text();
      newItem.location = $body.find('.rRowLocCls').text();
      newItem.description = $body.find('.rRowJobFull').text();
      newItem.sourceCategory = parentCategory;
      newItem.sourceSpecialization = subSpecialization;
      newItem.createdAt = new Date();

      if (newItem.title 
                        && newItem.url 
                        && newItem.company 
                        && newItem.location
                        && newItem.description
                        && newItem.sourceCategory
                        && newItem.sourceSpecialization
                        && newItem.createdAt
      
      ){
              JobStreetItems.insert(newItem);
      }

    }

  });
}

function insertJobStreetItems(array, category, subspec) {
  for (var i = array.length - 1; i >= 0; i--) {

    var exists = JobStreetItems.findOne({url: array[i].jobUrl});
    if (!exists){
        insertNewItem(array[i], category, subspec);
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


        HTTP.call("GET", targets[i].url, function (error, result) {
          var self = this;
          var groupedItems = [];
          self.items = new Array();
          if(error && result.statusCode !== 200){console.log('Request error.');}
          
          if (result.statusCode == 200){
            console.log('Successful HTTP request!');

            //.position-title-link elements contain target URLS
            var info = result.content
            , $ = cheerio.load(info)
            , $body = $('body')
            , $linkTargets = $body.find('.position-title-link');

            // for each one of those elements found

            for (var i = $linkTargets.length - 1; i >= 0; i--) {
              
              var $a = $($linkTargets[i]).attr('href');
              var modifiedObj = {};
              modifiedObj.jobUrl = $a;
              
              groupedItems.push(modifiedObj);
            }

          }

          insertJobStreetItems(getUniq(groupedItems), parentCategory, subSpecialization);
        });
      }
  	}
  });
});

// JobStreetSources.after.update(function (userId, doc, fieldNames, modifier, options) {

//   if (!this.previous.parsingComplete && doc.parsingComplete){
//   	var titleMatches = MascoKey.find({keywords: {$in: doc.titleTags}}).fetch();
//   	var titleMatchIdSet = [];
//   	var descMatches = MascoKey.find({keywords: {$in: doc.descTags}}).fetch();
//   	var descMatchIdSet = [];

//   	if (titleMatches) {					
//   		for (var i = titleMatches.length - 1; i >= 0; i--) {
//   			titleMatchIdSet.push(titleMatches[i]._id);
//   		}

//   		var uniqueTitleMatches = _.uniq(titleMatchIdSet);

//   		JobStreetSources.update({_id: doc._id}, {
//   			$push: {
//   				titleIntersections: {
//   					$each: uniqueTitleMatches
//   				}
//   			},
//   			$set: {
//   				bulkIntersectionTitleComplete: 1
//   			}
//   		});
//   	}
//   	if (descMatches) {
// 			for (var i = descMatches.length - 1; i >= 0; i--) {
// 				descMatchIdSet.push(descMatches[i]._id);
// 			}

// 			var descUniques = _.uniq(descMatchIdSet);

// 			JobStreetSources.update({_id: doc._id}, {
// 				$push: {
// 					descIntersections: {
// 						$each: descUniques
// 					}
// 				},
// 				$set: {
// 					bulkIntersectionDescComplete: 1
// 				}
// 			});
//   	}
//   }
// 	if (!this.previous.bulkIntersectionTitleComplete && doc.bulkIntersectionTitleComplete){
// 		var matches = doc.titleIntersections;
// 		var matchDetail = [];

// 		for (var i = matches.length - 1; i >= 0; i--) {
// 			var matchDetailItem = {};
// 			var matchingMasco = MascoKey.findOne({_id: matches[i]});

// 			if (matchingMasco){
// 					matchDetailItem.mascoCode = matchingMasco.officialCode;
// 				  matchDetailItem.mascoKeywordLength = matchingMasco.keywords.length;
// 				  matchDetailItem.rptArrayLength = doc.titleTags.length;
// 				  matchDetailItem.intersectionValue = findIntersection(matchingMasco.keywords,doc.titleTags);
// 				  matchDetailItem.percentVsMascoSize = matchDetailItem.intersectionValue.length/matchingMasco.keywords.length;
// 				  matchDetailItem.percentVsJobStreetSourcesSize = matchDetailItem.intersectionValue.length/doc.titleTags.length;

// 				  matchDetail.push(matchDetailItem);
// 			}
// 		}
// 		JobStreetSources.update({_id: doc._id}, {
// 			$set: {
// 				intersectionTitleDetailComplete: 1,
// 				titleIntersectionDetail: matchDetail
// 			}
// 		});
// 	}
// 	if (!this.previous.bulkIntersectionDescComplete && doc.bulkIntersectionDescComplete){
// 		var matches = doc.descIntersections;
// 		var matchDetail = [];

// 		for (var i = matches.length - 1; i >= 0; i--) {
// 			var matchDetailItem = {};
// 			var matchingMasco = MascoKey.findOne({_id: matches[i]});

// 			if (matchingMasco){
// 				matchDetailItem.mascoCode = matchingMasco.officialCode;
// 			  matchDetailItem.mascoKeywordLength = matchingMasco.keywords.length;
// 			  matchDetailItem.rptArrayLength = doc.descTags.length;
// 			  matchDetailItem.intersectionValue = findIntersection(matchingMasco.keywords,doc.descTags);
// 			  matchDetailItem.percentVsMascoSize = matchDetailItem.intersectionValue.length/matchingMasco.keywords.length;
// 			  matchDetailItem.percentVsJobStreetSourcesSize = matchDetailItem.intersectionValue.length/doc.descTags.length;

// 			  matchDetail.push(matchDetailItem);	
// 			}
// 		}

// 		JobStreetSources.update({_id: doc._id}, {
// 			$set: {
// 				intersectionDescDetailComplete: 1,
// 				descIntersectionDetail: matchDetail
// 			}
// 		});
// 	}
// 	if (this.previous.intersectionTitleDetailComplete && this.previous.intersectionDescDetailComplete) {
// 		console.log('skipping all parsing and intersection work');
// 	}
// }, {fetchPrevious: true});