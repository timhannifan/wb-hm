Meteor.publish('monsterMeta', function() {

	return MonsterMeta.find(
		{
			type: {
				$in: ['sourceCategory','qualification','experience']
			}
		},
		{
			fields: {
				name: 1,
				type: 1
			}
		}
	);
});
