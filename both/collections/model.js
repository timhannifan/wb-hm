MonsterSources = new Mongo.Collection('MonsterSources');
JobStreetSources = new Mongo.Collection('JobStreetSources');
MonsterItems = new Mongo.Collection('MonsterItems');
JobStreetItems = new Mongo.Collection('JobStreetItems');

MascoFive = new Mongo.Collection('MascoFive');
MascoFour = new Mongo.Collection('MascoFour');
MascoKey = new Mongo.Collection('MascoKey');

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
  },
  lastUpdate: {
    type: Date,
    optional: true
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
  },
  lastUpdate: {
    type: Date,
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
  titleTags: {
    type: [String],
    optional: true,
    defaultValue: null
  }, 
  description: {
    type: String,
    optional: true
  },  
  descriptionTags: {
    type: [String],
    optional: true,
    defaultValue: null
  }, 
  cleanDescription: {
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
    label: "Sector"
  },
  htmlDescription: {
    type: String,
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


if ( Meteor.isServer ) {
  MonsterItems._ensureIndex( { createdAt: -1 } );
}

MonsterItems.allow({
  insert: function (userId, doc) {
    return true;
  }
});

// if ( Meteor.isServer ) {
//   Albums._ensureIndex( { title: 1 } );
// }
// JobStreetItems Schema and Permissions
JobStreetItems.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
    defaultValue: null
  },
  titleTags: {
    type: [String],
    optional: true,
    defaultValue: null
  },
  company: {
    type: String,
    optional: true,
    defaultValue: null
  },
  location: {
    type: String,
    optional: true,
    defaultValue: null
  },
  experience: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  description: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  descriptionTags: {
    type: [String],
    optional: true,
    defaultValue: null
  },
  companyRegistrationNumber: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  companySize: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  benefits: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  languagesSpoken: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  companyAddress: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  companySnapIndustry: {
    type: String,
    optional: true,
    defaultValue: null
  },  
  companySnapDressCode: {
    type: String,
    optional: true,
    defaultValue: null
  },   
  companyOverview: {
    type: String,
    optional: true,
    defaultValue: null
  },
  companyOverviewTags: {
    type: [String],
    optional: true,
    defaultValue: null
  },
  companyRecruitBool: {
    type: Number,
    optional: true,
    defaultValue: null
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  parentCategory: {
    type: String,
    optional: true,
    defaultValue: null
  },
  subSpecialization: {
    type: String,
    optional: true,
    defaultValue: null
  },
  parentId: {
    type: String,
    optional: true,
    defaultValue: null
  },
  listedSpec: {
    type: String,
    optional: true,
    defaultValue: null
  },
  listedRole: {
    type: String,
    optional: true,
    defaultValue: null
  },
  listedIndustry: {
    type: String,
    optional: true,
    defaultValue: null
  },
  datePosted: {
    type: String,
    optional: true,
    defaultValue: null
  },
  dateClosing: {
    type: String,
    optional: true,
    defaultValue: null
  },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: null
  },
  dummyVars: {
    type: Object,
    optional: true,
    blackbox: true
  },
  classificationComplete: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  trackedSkills: {
    type: [Object],
    optional: true,
    defaultValue: []
  },
  "trackedSkills.$.skillId": {
    type: String,
    optional: true
  },
  "trackedSkills.$.skillKeyword": {
    type: String,
    optional: true
  },
  "trackedSkills.$.dummyVar": {
    type: Number,
    optional: true
  },
  skillsClassified:{
    type: [String],
    optional: true
  }
});
JobStreetItems.attachSchema(JobStreetItems.schema);



if ( Meteor.isServer ) {
  JobStreetItems._ensureIndex( { createdAt: -1 } );
  JobStreetItems._ensureIndex( { description: "text" } );
}


JobStreetItems.allow({
  insert: function (userId, doc) {
    return true;
  }
});
