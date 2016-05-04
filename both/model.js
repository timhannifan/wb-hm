MonsterSources = new Mongo.Collection('MonsterSources');
JobStreetSources = new Mongo.Collection('JobStreetSources');
MonsterItems = new Mongo.Collection('MonsterItems');
JobStreetItems = new Mongo.Collection('JobStreetItems');
UnionItems = new Mongo.Collection('UnionItems');

// MonsterSources Schema and Permissions
MonsterSources.schema = new SimpleSchema({
  sourceName: {
    type: String,
    optional: true,
    defaultValue: 'monster',
  },
  sourceCategory: {
    type: String,
    optional: true,
  },
  sourceUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  sourceSpecialization: {
    type: String,
    optional: true,
    defaultValue: null
  }
});
MonsterSources.attachSchema(MonsterSources.schema);
MonsterSources.allow({
	insert: function (userId, doc) {
		return true;
	}
});

// JobStreetSources Schema and Permissions
JobStreetSources.schema = new SimpleSchema({
  sourceName: {
    type: String,
    optional: true,
    defaultValue: 'jobstreet'
  },
  sourceCategory: {
    type: String,
    optional: true
  },
  sourceUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  sourceSpecialization: {
    type: String,
    optional: true
  },
  sourceSearchDepth: {
    type: Number,
    optional: true
  },
  sourceSpecializationCode: {
    type: Number,
    optional: true
  }
});
JobStreetSources.attachSchema(JobStreetSources.schema);
JobStreetSources.allow({
  insert: function (userId, doc) {
    return true;
  }
});


// MonsterItems Schema and Permissions
MonsterItems.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },  
  description: {
    type: String,
    optional: true
  },  
  companyRegistrationNumber: {
    type: String,
    optional: true
  },  
  companySize: {
    type: String,
    optional: true
  },  
  benefits: {
    type: String,
    optional: true
  },  
  languagesSpoken: {
    type: String,
    optional: true
  },  
  companyAddress: {
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
  sourceCategory: {
    type: String,
    optional: true,
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
  datePosted: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  }
});

MonsterItems.attachSchema(MonsterItems.schema);
MonsterItems.allow({
  insert: function (userId, doc) {
    return true;
  }
});

// JobStreetItems Schema and Permissions
JobStreetItems.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  titleTags: {
    type: [String],
    optional: true
  },
  company: {
    type: String,
    optional: true
  },
  location: {
    type: String,
    optional: true
  },
  experience: {
    type: String,
    optional: true
  },  
  description: {
    type: String,
    optional: true
  },  
  descriptionTags: {
    type: [String],
    optional: true
  },
  companyRegistrationNumber: {
    type: String,
    optional: true
  },  
  companySize: {
    type: String,
    optional: true
  },  
  benefits: {
    type: String,
    optional: true
  },  
  languagesSpoken: {
    type: String,
    optional: true
  },  
  companyAddress: {
    type: String,
    optional: true
  }, 
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  parentCategory: {
    type: String,
    optional: true
  },
  subSpecialization: {
    type: String,
    optional: true
  },
  datePosted: {
      type: String,
      optional: true
  },
  createdAt: {
      type: Date,
      optional: true
    },
});
JobStreetItems.attachSchema(JobStreetItems.schema);
JobStreetItems.allow({
  insert: function (userId, doc) {
    return true;
  }
});

// UnionItems Schema and Permissions
UnionItems.schema = new SimpleSchema({
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
  description: {
    type: String,
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

  location: {
    type: String,
    optional: true
  },
  sourceCategory: {
    type: String,
    optional: true
  },
  sourceSpecialization: {
    type: String,
    optional: true
  },
});
UnionItems.attachSchema(UnionItems.schema);
UnionItems.allow({
  insert: function (userId, doc) {
    return true;
  }
});