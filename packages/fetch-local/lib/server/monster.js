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

function yakiSplitClean(string) {
  return Yaki(string).split().clean();
}

var sourceHandler = {
  getStream: function(content) {
    var stream = new Readable();
    stream.push(content);
    stream.push(null);

    return stream;
  },
  getItemKeywords: function(string) {
    // var test = Yaki(string).clean().extract();
    return;
  },
  handle: function(contentBuffer, sourceCategory, sourceId) {
    // console.log('sourceCategory',sourceCategory);
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

        if (str && a && b && c && (b > 0)) {
          return c(str, a , b); 
        } else {
          // look for experience instead, no qualifications listed
          // console.log('----------c(a,d)',c(str, a, d));
          return  c(str, a, d);
        }
      }
      function getQualification (str) {
        var a = (str.indexOf("Qualification")),
        b = str.indexOf("Experience"),
        c = function (str, a,b){
          return str.substring(a,b);
        };
        
        if (str && (a > 0) && (b > 0) && c) {
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
        return c(str, a , b);
      }
      function getLocation (str) {
        var a = (str.indexOf("location") + 10),
        b = b = str.indexOf("Ref"),
        c = function (str, a,b){
          return str.substring(a,b);
        };
        return c(str, a , b);
      }
      function getSummary (str) {
        var a = (str.indexOf("Summary:") + 9),
        b = b = str.length,
        c = function (str, a,b){
          return str.substring(a,b);
        };
        return c(str, a , b);
      }

      while (item = s.read()) {
        
        // if item has no guid use the URL to give it one
        if (!item.guid) {
          item.guid = item.link;
        }

        // // check if newSourceItem already exists
        if (!!MonsterItems.findOne({url: item.guid})) {
          console.log('///// '+item.guid+' was already imported//////');
          continue;
        }
        console.log('///// '+item.guid+' is a new item. adding new record....');
        newItemsCount++;

        var newSourceItem = {
          title: heDecode(item.title),
          url: item.guid,
          sourceId: sourceId,
          // itemGuid: item.guid,
          sourceCategory: sourceCategory,//self.getsourceCategory(item, sourceCategory),
          description: stripThis(item.description),
          pubDate: item.meta.pubdate,
          createdAt: new Date()
        };

        if (item.description){
          newSourceItem.htmlDescription = toMarkdown(he.decode(item.description));  
          // newSourceItem.parsedKeywords = _.uniq(Yaki(item.description).extract());  
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
          newSourceItem.cleanDescription = function (callback) {
            var str = stripThis(item.description);

            function callback(str) {
              return getSummary(str);
            }

            return callback(str);
          }();
          newSourceItem.descriptionTags = _.uniq(yakiSplitClean(newSourceItem.cleanDescription));
          newSourceItem.titleTags = _.uniq(yakiSplitClean(newSourceItem.title));  
        }


        try {
          MonsterItems.insert(newSourceItem);

        } catch (error) {
          // catch errors so they don't stop the loop
          console.log(error);
        }
      }
      // console.log('// Found ' + newItemsCount + ' new source items');
    }, function() {
      console.log('Failed to bind environment');
    }, sourceParser));
  }
};

fetchSources = function() {
  var contentBuffer;

  var existingSources = MonsterSources.find({});

  existingSources.forEach(function(obj){
    var sourceCategory = obj.sourceCategory;
    var sourceId = obj._id;
    var sourceUrl = obj.sourceUrl;

    try {
      contentBuffer = HTTP.get(sourceUrl, {responseType: 'buffer'}).content;
      sourceHandler.handle(contentBuffer, sourceCategory, sourceId);
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
    var collection = MonsterItems.find().fetch();
    var heading = true; // Optional, defaults to true
    var delimiter = ";" // Optional, defaults to ",";
    return exportcsv.exportToCSV(collection, heading, delimiter);
  }
});

// SyncedCron.add({
  // name: 'Monster batch autorun',
  // schedule: function(parser) {
  //   // parser is a later.parse object
  //   return parser.text('every 2 hours');
  // }, 
  // job: function(intendedAt) {

  //   console.log('running Monster XML job');
  //   console.log('job should be running at:');
  //   console.log(intendedAt);
  //   fetchSources();
  // }
// });