Meteor.publish('monsterQuery', function (query) {
	if (query && this.userId) {
		let data = MonsterItems.find({query});

		return data;
	} else {
		return [];
	}
});

Meteor.publish('MonsterItemsById', function(_id) {
  return MonsterItems.find({_id:_id});
});