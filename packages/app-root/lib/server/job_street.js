var cheerio = Npm.require('cheerio'),
  $ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');

// $('ul').attr('id');
//=> fruits

console.log('cheerio found this many items: ' + $('#fruits').find('li').length);
//=> 3




HTTP.call("GET", "http://www.jobstreet.com.my/en/job-search/find-specialization", function (error, result) {
	var self = this;
	self.items = new Array();

	if(error && result.statusCode !== 200){console.log('Request error.');}

  if (!error && result.statusCode == 200){
    var info = result.content
    , $ = cheerio.load(info)
    , $body = $('body')
    , $targets = $body.find('.halfdent');
		//I know .halfdent elements contain the parent categories

		//for each one of those elements found
    $targets.each(function(i, item){
			var $a = $(item).children('a');
			//and add all that data to my items array
      self.items[i] = { 
				href: $a.attr('href')
			};
    });
    console.log(self.items);
  }
});