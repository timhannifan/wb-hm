var toMarkdown = Npm.require('to-markdown').toMarkdown;
var he = Npm.require('he');
var FeedParser = Npm.require('feedparser');
var Readable = Npm.require('stream').Readable;
var iconv = Npm.require('iconv-lite');
var striptags = Npm.require('striptags');



var normalizeEncoding = function (contentBuffer) {
  // got from https://github.com/szwacz/sputnik/
  var encoding;
  var content = contentBuffer.toString();

  var xmlDeclaration = content.match(/^<\?xml .*\?>/);
  if (xmlDeclaration) {
    var encodingDeclaration = xmlDeclaration[0].match(/encoding=("|').*?("|')/);
    if (encodingDeclaration) {
      encoding = encodingDeclaration[0].substring(10, encodingDeclaration[0].length - 1);
    }
  }

  if (encoding && encoding.toLowerCase() !== 'utf-8') {
    try {
      content = iconv.decode(contentBuffer, encoding);
    } catch (err) {
      // detected encoding is not supported, leave it as it is
    }
  }


  return content;
};

var sourceHandler = {
  getStream: function(content) {
    var stream = new Readable();
    stream.push(content);
    stream.push(null);

    return stream;
  },

  getSourceCategories: function(item, sourceCategories) {

    var itemCategories = [];

    // // loop over categories if they exist
    // if (item.categories && item.categories.length > 0) {
    //   item.categories.forEach(function(name) {
    //     // look up category by name
    //     var category = Categories.findOne({name: name}, {fields: {_id: 1}});
    //     // if it exists, push the _id to the new array, othewise add it to Categories collection
    //     if (category) {
    //       itemCategories.push(category._id);
    //     } else {
    //       var newId = Categories.insert({
    //         name: name
    //       });
    //       itemCategories.push(newId._id);
    //     }
    //   });
    // }

    // // add predefined source categories if there are any and remove any duplicates
    // if (!!sourceCategories) {
    //   sourceCategories.forEach(function(name) {
    //     // look up category by name
    //     var category = Categories.findOne({name: name}, {fields: {_id: 1}});
    //     // if it exists, push the _id to the new array
    //     if (category) {
    //       itemCategories.push(category._id);
    //     } 
    //   });
    // }

    itemCategories = _.uniq(itemCategories.concat(sourceCategories));

    return itemCategories;
  },
  getItemKeywords: function(string) {
    // var test = Yaki(string).clean().extract();
    
    return;
  },


  handle: function(contentBuffer, sourceCategories, sourceId) {
    var content = normalizeEncoding(contentBuffer);
    var stream = this.getStream(content),
    sourceParser = new FeedParser(),
    newItemsCount = 0,
    self = this;

    stream.pipe(sourceParser);

    sourceParser.on('meta', Meteor.bindEnvironment(function(meta) {
      //console.log('// Parsing RSS source: '+ meta.title);
    }));

    sourceParser.on('error', Meteor.bindEnvironment(function(error) {
      console.log('sourceParser error', error);
    }));

    sourceParser.on('readable', Meteor.bindEnvironment(function() {
      var s = this, item;

      function heDecode(string) {
        return he.decode(string);
      }

      function heUnescape(string) {
        return he.unescape(string);
      }      
      function stripThis(string) {
        return striptags(string);
      }
      function getCompany (str) {


        var a = (str.indexOf("Company") + 9),
        b = str.indexOf("Qualification"),
        c = function (str, a,b){
          return str.substring(a,b);
        },
        d = str.indexOf("Experience");



        // console.log('---------a',a);
        // console.log('----------b',b);
        // console.log('----------c()',c(str, a, b));
        if (str && a && b && c && (b > 0)) {
          console.log('----------c(a,b)',c(str, a, b));
          return c(str, a , b); 

        } else {
          // look for experience instead, no qualifications listed
          console.log('----------c(a,d)',c(str, a, d));
          return  c(str, a, d);
        }
      }
      function getQualification (str) {
        var a = (str.indexOf("Qualification")),
        b = str.indexOf("Experience"),
        c = function (str, a,b){
          return str.substring(a,b);
        };
        // console.log('lastof',a);
        // console.log('firstof',b);
        // console.log('company',c(str, a, b));
        console.log('---------a',a);
        console.log('----------b',b);
        console.log('----------c()',c(str, a, b));
        if (str && (a > 0) && (b > 0) && c) {
          console.log('----------c(a,b)',c(str, a, b));
          return c(str, (a + 14), b); 

        } else {
          return "null";
        }
      }
      function getExperience (str) {
        var a = (str.indexOf("Experience") + 11),
        b = str.indexOf("location"),
        c = function (str, a,b){
          return str.substring(a,b);
        };
        // console.log('lastof',a);
        // console.log('firstof',b);
        // console.log('company',c(str, a, b));
        return c(str, a , b);
      }
      function getLocation (str) {
        var a = (str.indexOf("location") + 10),
        b = b = str.indexOf("Ref"),
        c = function (str, a,b){
          return str.substring(a,b);
        };
        // console.log('lastof',a);
        // console.log('firstof',b);
        // console.log('company',c(str, a, b));
        return c(str, a , b);
      }

      while (item = s.read()) {
        console.log('Parsing new item: ', item.title);
        
        // if item has no guid, use the URL to give it one
        if (!item.guid) {
          item.guid = item.link;
        }

        // // check if newSourceItem already exists
        if (!!SourceItems.findOne({itemGuid: item.guid})) {
          console.log('///// This item was already imported//////');
          continue;
        }

        newItemsCount++;

        var newSourceItem = {
          title: heDecode(item.title),
          url: item.link,
          sourceId: sourceId,
          itemGuid: item.guid,
          sourceCategories: self.getSourceCategories(item, sourceCategories),
          description: stripThis(item.description),
          pubDate: item.meta.pubdate,
          postedAt: new Date()
        };

        if (item.description)
          newSourceItem.htmlDescription = toMarkdown(he.decode(item.description));  
          newSourceItem.parsedKeywords = _.uniq(Yaki(item.description).extract());  
          newSourceItem.company = function (callback) {
            var str = stripThis(item.description);

            function callback(str) {
              return getCompany(str);
            }

            return callback(str);
          }();
          newSourceItem.qualification = function (callback) {
            var str = stripThis(item.description);

            function callback(str) {
              return getQualification(str);
            }

            return callback(str);
          }();
          newSourceItem.experience = function (callback) {
            var str = stripThis(item.description);

            function callback(str) {
              return getExperience(str);
            }

            return callback(str);
          }();
          newSourceItem.location = function (callback) {
            var str = stripThis(item.description);

            function callback(str) {
              return getLocation(str);
            }

            return callback(str);
          }();
        // if (item.guid) 
          // newSourceItem.parsedKeywords = _.uniq(Scrape.website(item.guid).tags);
          // newSourceItem.parsedKeywords = _.uniq(Scrape.website(item.guid).tags);
          // console.log('extract',Yaki(item.description).extract());
          // console.log('clean',Yaki(item.description).extract().clean());


          // if RSS item link is a 301 or 302 redirect, follow the redirect
          // var get = HTTP.get(item.link, {followRedirects: false});
          // if (!!get.statusCode && (get.statusCode === 301 || get.statusCode === 302) &&
          //     !!get.headers && !!get.headers.location) {
          //       newSourceItem.url = get.headers.location;
          //     }

        try {
          SourceItems.insert(newSourceItem);
        } catch (error) {
          // catch errors so they don't stop the loop
          console.log(error);
        }
      }

      console.log('// Found ' + newItemsCount + ' new source items');
    }, function() {
      console.log('Failed to bind environment');
    }, sourceParser));
  }
};

fetchSources = function() {
  var contentBuffer;

  Sources.find().forEach(function(source) {

    var sourceCategories = source.sourceCategories;
    var sourceId = source._id;

    try {
      contentBuffer = HTTP.get(source.sourceUrl, {responseType: 'buffer'}).content;
      sourceHandler.handle(contentBuffer, sourceCategories, sourceId);
    } catch (error) {
      console.log('fetchSources error', error);
      return true; // just go to next source URL
    }
  });
};

Meteor.methods({
  fetchSources: function () {
    fetchSources();
  },
  testEntities: function (text) {
    console.log(he.decode(text));
  },
  testToMarkdown: function (text) {
    console.log(toMarkdown(text));
  },
  scrapeFeed: function (url) {
    var data = Scrape.feed(url);
    console.log(data);
  },
  scrapeWebsite: function (url) {
    return Scrape.website(url);
  },
  scrapeUrl: function (url) {
    var data = Scrape.url(url);
    console.log(data);
  },
  download: function() {
    var collection = SourceItems.find().fetch();
    var heading = true; // Optional, defaults to true
    var delimiter = ";" // Optional, defaults to ",";
    return exportcsv.exportToCSV(collection, heading, delimiter);
  }
});


console.log('scrape',Scrape.website('http://jobs.monster.com.my/details/15237787.html'));