var cheerio = Npm.require('cheerio'),
  $ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');

// $('ul').attr('id');
//=> fruits

console.log('cheerio found this many items: ' + $('#fruits').find('li').length);
//=> 3








































// //Tell the request that we want to fetch youtube.com, send the results to a callback function
// request({uri: 'http://youtube.com'}, function(err, response, body){
//   var self = this;
// 	self.items = new Array();//I feel like I want to save my results in an array
	
// 	//Just a basic error check
//   if(err && response.statusCode !== 200){console.log('Request error.');}
//   //Send the body param as the HTML code we will parse in jsdom
// 	//also tell jsdom to attach jQuery in the scripts
// 	jsdom.env({
//       html: body,
//       scripts: ['http://code.jquery.com/jquery-1.6.min.js']
//     }, function(err, window){
//     	//Use jQuery just as in any regular HTML page
//       var $ = window.jQuery
//       , $body = $('body')
//       , $videos = $body.find('.video-entry');
//     	//I know .video-entry elements contain the regular sized thumbnails

//     	//for each one of those elements found
//       $videos.each(function(i, item){
//         //I will use regular jQuery selectors
//         var $a = $(item).children('a'),
//         $title = $(item).find('.video-title .video-long-title').text(),
//         $time = $a.find('.video-time').text(),
//         $img = $a.find('span.clip img');
//         //and add all that data to my items array
//         self.items[i] = { 
//         	href: $a.attr('href'),
//         	title: $title.trim(),
//         	time: $time,
//         	thumbnail: $img.attr('data-thumb') ? $img.attr('data-thumb') : $img.attr('src'),
//         	urlObj: url.parse($a.attr('href'), true)//parse our URL and the query string as well
//         };
//       });

//     console.log(self.items);
//   });
// });