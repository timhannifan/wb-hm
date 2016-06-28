MonsterSources = new Mongo.Collection('MonsterSources');
MonsterItems = new Mongo.Collection('MonsterItems');

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