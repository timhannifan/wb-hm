

JobStreetSources = new Mongo.Collection('JobStreetSources');
JobStreetItems = new Mongo.Collection('JobStreetItems');
JobStreetParentCategoryCounts = new Mongo.Collection('JobStreetParentCategoryCounts');
JobStreetSubSpecializationCounts = new Mongo.Collection('JobStreetSubSpecializationCounts');
JobStreetMeta = new Mongo.Collection('JobStreetMeta');
JSNewTags = new Mongo.Collection('JSNewTags');
JSNewTagsFrequency = new Mongo.Collection('JSNewTagsFrequency');
LemmaIndex = new Mongo.Collection('LemmaIndex');

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


JobStreetItems.publicFields = {
  title: 1,
  titleTags: 1,
  company: 1,
  location: 1,
  experience: 1,
  description: 1,
  descriptionTags: 1,
  companyRegistrationNumber: 1,
  companySize: 1,
  benefits: 1,
  languagesSpoken: 1,
  companyAddress: 1,
  companySnapIndustry: 1,
  companySnapDressCode: 1,
  companyOverview: 1,
  companyOverviewTags: 1,
  url: 1,
  parentCategory: 1,
  subSpecialization: 1,
  parentId: 1,
  listedSpec: 1,
  listedRole: 1,
  listedIndustry: 1,
  datePosted: 1,
  dateClosing: 1,
  createdAt: 1
};

JobStreetItems.filterableFields = {
  location: 1,
  experience: 1,
  companySnapIndustry: 1,
  parentCategory: 1,
  subSpecialization: 1,
  listedSpec: 1,
  listedRole: 1,
  listedIndustry: 1
};


if ( Meteor.isServer ) {
  JobStreetItems._ensureIndex( { createdAt: -1 } );
  JobStreetItems._ensureIndex( { description: "text" } );
}


JobStreetItems.allow({
  insert: function (userId, doc) {
    return true;
  }
});
