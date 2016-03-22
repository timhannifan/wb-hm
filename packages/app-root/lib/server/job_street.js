var cheerio = Npm.require('cheerio');


Meteor.startup(function() {
	if (JobStreetItems.find().count() == 0) {
		var specializationCodes = [
			"130"
			// , "131"
			// , "132"
			// , "135"
			// //
			// , "133"
			// , "137"
			// , "146"
			// , "148"
			// //
			// // Arts, media,communications
			// , "100"
			// , "101"
			// , "106"
			// , "141"
			// // building/construction
			// , "150"
			// , "180"
			// , "184"
			// , "198"
			// // computer it
			// , "191"
			// , "192"
			// , "193"
			// // education/training
			// , "105"
			// , "121"
			// // engineering
			// , "185"
			// , "186"
			// , "187"
			// , "188"	
			// , "189"
			// , "190"
			// , "195"
			// , "200"
			// // healthcare
			// , "111"
			// , "112"
			// , "113"
			// // hotel/rest
			// , "107"
			// , "114"
			// // manufacturing
			// , "115"
			// , "140"
			// , "194"
			// , "196"	
			// , "197"
			// // sales/marketing
			// , "139"
			// , "142"
			// , "143"
			// , "144"	
			// , "145"	
			// , "149"	
			// , "151"
			// // sciences
			// , "102"
			// , "103"
			// , "108"
			// , "109"	
			// , "181"	
			// , "182"	
			// , "183"	
			// , "199"	
			// // services
			// , "118"
			// , "119"
			// , "120"
			// , "134"	
			// , "138"	
			// , "147"	
			// , "152"	
			// // others
			// , "90"
			// , "104"
			// , "110"
			// , "116"	
			// , "117"	
		];
		var subSpecTargets = [];
		var jobDescriptionTargets = [];
		var jobContentURLs = [];

		specializationCodes.each(function(code, index, callback){

			var urlPrefix = 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization='
				+ code + '&area=&salary=&src=12';

			subSpecTargets.push(urlPrefix);
		});
		specializationCodes.each(function(){console.log('/////// subSpecialization code:' + this);});
			
		subSpecTargets.each(function(target,index){
			// console.log('target', target);
			// console.log('index', index);
			var i = 1;
			// upperLimit defines the pagedepth of the search minus 1
			var upperLimit = 2;
			var pageTarget = "";
			while (i < upperLimit) {
			    pageTarget = target + '&pg=' + i;
			    i++;
			 		jobDescriptionTargets.push(pageTarget);
			}
		});
		subSpecTargets.each(function(){console.log('/////// subSpecialization url:' + this);});

		// console.log(jobDescriptionTargets);
		var groupedItems = [];
		var uniqueItems = _.uniq(groupedItems);
		function insertNewItem (url) {

			HTTP.call("GET", url, function (error, result) {
				var self = this;
				var newPost = {};

				if(error && result.statusCode !== 200){console.log('Request error.');}
			  
			  if (result.statusCode == 200 && url.search("job-classified-ads") == -1){
			  	console.log('Successful HTTP request, non-classified job posting');

					//.position-title-link elements contain target URLS
			    var info = result.content
			    , $ = cheerio.load(info)
			    , $body = $('body');

			    JobStreetItems.insert({
			    	title: $body.find('#position_title').text()
			    	, url: url
			    	, company: $body.find('#company_name').text()
			    	, location: $body.find('#single_work_location').text()
			    	, experience: $body.find('#years_of_experience').text()
			    	, companyIndustry: $body.find('#company_industry').text()
			    });
			  }

		    if (result.statusCode == 200 && url.search("job-classified-ads") > 0){
		    	console.log('Successful HTTP request, classified job posting, using alternate parse targets');

		  		//.position-title-link elements contain target URLS
		      var info = result.content
		      , $ = cheerio.load(info)
		      , $body = $('body');

		      JobStreetItems.insert({
		      	title: $body.find('.rRowTitleCls').text()
		      	, url: url
		      	, company: $body.find('.rRowCompanyCls').text()
		      	, location: $body.find('.rRowLocCls').text()
		      	, experience: null
		      	, companyIndustry: null
		      });
		    }	  
			});
		}
		function findUniques(array) {
			return (_.uniq(array));
		}
		function findUniquesCount(array) {
			return (_.uniq(array).count());
		}
		function insertCleanedArray(array) {
			array.each(function(i, item) {
				var exists = JobStreetItems.findOne({url: i});
				if (!exists){
					console.log('New jobStreetItem found, creating document....');
					insertNewItem(i);
					
				} else {
					console.log('Found a matching URL. Skipping to next item');
				}
			});
		}
		function callbackUnique(array) {
			var uni = _.uniq(array);

			insertCleanedArray(uni);
		}
		var uniqueJobs = findUniques(groupedItems);

		jobDescriptionTargets.each(function(target,index){
			console.log('PARSING JOB URL: ', target);

			HTTP.call("GET", target, function (error, result) {
				var self = this;
				self.items = new Array();
				if(error && result.statusCode !== 200){console.log('Request error.');}
			  
			  if (result.statusCode == 200){
			  	console.log('Successful HTTP request!');

					//.position-title-link elements contain target URLS
			    var info = result.content
			    , $ = cheerio.load(info)
			    , $body = $('body')
			    , $targets = $body.find('.position-title-link');

					// for each one of those elements found
			    $targets.each(function(i, item){
						var $a = $(item).attr('href');
						//and add all that data to my items array
			      self.items[i] = { 
							href: $a
						};
						groupedItems.push($a);
						console.log('pushed $a to grouped: ' + $a);
			    });

			    // console.log('groupedItems1 ----------------' + groupedItems);
			  }
			  console.log('groupedItems1 ----------------' + groupedItems);
			  console.log(' -----uniqueJobs-----------' + uniqueJobs);

			  callbackUnique(groupedItems);
				// console.log('findUniquesCount ----------------' + findUniquesCount(groupedItems));				
				// return uniqueJobs;
			});

			// uniqueJobs.each(function(i, item) {
			// 	var exists = JobStreetItems.findOne({url: i});
			// 	if (!exists){
			// 		console.log('New jobStreetItem found, creating document....');
			// 		insertNewItem(i);
					
			// 	} else {
			// 		console.log('Found a matching URL. Skipping to next item');
			// 	}
			// });
		});

		// uniqueItems.each(function(i, item) {
		// 	var exists = JobStreetItems.findOne({url: i});
		// 	if (!exists){
		// 		console.log('New jobStreetItem found, creating document....');
		// 		insertNewItem(i);
				
		// 	} else {
		// 		console.log('found a jobStreetItem with matching URL. Skipping to next item');
		// 	}
		// });
	}

});
