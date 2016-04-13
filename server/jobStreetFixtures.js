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
    		if (err) {console.log(err)} else {console.log('JobStreetSource create successfull')}
    	});
    }
    
  }
},

});
// JobStreetSources.after.insert(function (userId, doc) {
// 	//// ADDING CLEANTITLE, MAPTOFOUR, KEYWORDS TO TITLETAGS AND TAGSONLY
// 	var newlyInserted = JobStreetSources.findOne({_id: doc._id});
// 	if (newlyInserted){
// 		JobStreetSources.update({_id: this._id}, { 
// 				$set: {
// 					cleanTitle: cleanUp(doc.occ_title),
// 					cleanDesc: cleanUp(doc.occ_desc),
// 					cleanSector: cleanUp(doc.sector),
// 					titleTags: _.uniq(yakiSplitClean(cleanUp(doc.occ_title))),
// 					tagsOnly: _.uniq(yakiSplitClean(cleanUp(doc.occ_title))),
// 					descTags: _.uniq(yakiSplitClean(cleanUp(doc.occ_desc))),
// 					initialClean: 1
// 				}
// 		});

// 		JobStreetSources.update({_id: this._id}, {
// 			$push: {
// 				titleTags: cleanUp(doc.occ_title),
// 			},
// 			$set: {
// 				parsingComplete: 1
// 			}
// 		});
// 	}
// });

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