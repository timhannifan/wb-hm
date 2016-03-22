Sources = new Mongo.Collection('Sources');
JobStreetSources = new Mongo.Collection('JobStreetSources');
SourceItems = new Mongo.Collection('SourceItems');
Categories = new Mongo.Collection('Categories');
Events = new Mongo.Collection('Events');
Notifications = new Mongo.Collection('Notifications');
JobStreetItems = new Mongo.Collection('JobStreetItems');

// Sources Schema and Permissions
Sources.schema = new SimpleSchema({
  sourceName: {
    type: String,
    optional: true,
  },
  sourceUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  sourceCategories: {
    type: [String],
    optional: true,
    label: "Source Categories",
    autoform: {
      type: "selectize-input",
      afFieldInput: {
        multiple: true,
        selectizeOptions: {
          plugins: ['remove_button'],
          persist: false,
          create: true,
          createOnBlur: true,
        }
      }
    }
  },
});
Sources.attachSchema(Sources.schema);
Sources.allow({
	insert: function (userId, doc) {
		return true;
	},
	remove: function (userId, doc) {
		return true;
	}
});

// SourceItems Schema and Permissions
SourceItems.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  sourceId: {
    type: String,
    optional: true
  },
  itemGuid: {
    type: String,
    optional: true
  },
  sourceCategories: {
    type: [String],
    label: 'Source Categories',
    optional: true
  },
  htmlDescription: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    label: 'Raw Description',
    optional: true
  },
  parsedKeywords: {
    type: [String],
    label: 'parsedKeywords keywords',
    optional: true
  },
  company: {
    type: String,
    optional: true
  },
  experience: {
    type: String,
    optional: true
  },
  qualification: {
    type: String,
    optional: true
  },
  location: {
    type: String,
    optional: true
  },
  pubDate: {
    type: String,
    optional: true
  },
  postedAt: {
    type: String,
    optional: true
  }
});

SourceItems.attachSchema(SourceItems.schema);
SourceItems.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});

// Categories Schema and Permissions
Categories.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
    optional: true,
    autoform: {
      omit: true
    }
  }
});
Categories.attachSchema(Categories.schema);
Categories.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});

JobStreetItems.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  location: {
    type: String,
    optional: true
  },
  experience: {
    type: String,
    optional: true
  },
  company: {
    type: String,
    optional: true
  },
  companyIndustry: {
    type: String,
    optional: true
  }
});
JobStreetItems.attachSchema(JobStreetItems.schema);
JobStreetItems.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});
// Meteor.methods({
//   insertSource: function(sourceUrl, categories){
//     // check(sourceUrl, Sources.schema);

//     if (Sources.findOne({url: sourceUrl.url}))
//       throw new Meteor.Error('already-exists', ('This source has already been added. Please try again.'));

//     return Sources.insert({
//     	url: sourceUrl,
//     });
//   }

