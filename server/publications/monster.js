Meteor.publish('MonsterSources', function() {
  return MonsterSources.find({}, {sort: {sourceCategory: 1}});
});

Meteor.publish('MonsterItems', function() {
  return MonsterItems.find({});
});

Meteor.publish( 'monsterItemIds', function() {
  return [
  	MonsterItems.find( 
  		{ title: {$ne: null} 
  		}, 
  		{ sort: {createdAt: -1},
  			fields: {
  				createdAt: 1
  			}
  		},	
  	)
  ];
});