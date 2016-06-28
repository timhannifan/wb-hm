Meteor.publish('skills', function() {
	return Skills.find( {} );
});

Meteor.publish('skillsList', function() {
	return Skills.find( {} );
});
Meteor.publish('keywordMatchList', function(_id) {
	console.log('publishing for a new keyword' + _id);

	return Skills.find( {_id: _id} );
});

Meteor.publish('SkillsTypesAndParsedKeywords', function () {
	return Skills.find({},{fields:{type:1,parsed_keyword: 1}});
});