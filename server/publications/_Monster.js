Meteor.publish('monsterQuery', function (query,limit) {
	 Meteor._sleepForMs(2000);

   return MonsterItems.find(query, 
   	{
   		limit: limit,
   		sort: {
   			createdAt: -1
   		}, 
   		fields: {
   			title: 1,
   			company: 1,
   			sourceCategory: 1,
   			qualification: 1,
   			experience: 1,   			
   			createdAt: 1,
   			location: 1
 	    }
 	  }
   );
});

Meteor.publish('MonsterItemsById', function(_id) {
  return MonsterItems.find({_id:_id});
});