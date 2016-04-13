// var cheerio = Npm.require('cheerio');


// HTTP.call("GET", 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php', function (error, result) {
// var self = this;


// 	if(error && result.statusCode !== 200){
// 		console.log('Request error.');
// 	}

// 	if (result.statusCode == 200){
// 	  console.log('Successful HTTP request');

// 	  //.position-title-link elements contain target URLS
// 	  var info = result.content
// 	  , $ = cheerio.load(info)
// 	  , $body = $('body');

// 	  var elements = $body.find('.select2-results__options');

// 	  console.log(elements);
// 	}

// });