Meteor.publish('skills', function() {
	return Skills.find( {} );
});

Meteor.publish('skillsList', function() {
	return Skills.find( {} );
});


Meteor.publish('SkillsTypesAndParsedKeywords', function () {
	return Skills.find({},{fields:{type:1,parsed_keyword: 1}});
});

Meteor.publish('Skills.byType',function(val){
	check(val, String);

	if (this.userId) {
		if (val == 'all') {
			return [
			  Skills.find({})
			];
		} else {
			return [
				Skills.find({type: val})
			];
		}
	} else {
		return [];
	}
});
Meteor.publish('Skills.types',function(){
	if (this.userId) {
		return Skills.find({},{fields: {type: 1}});
	} else {
		return [];
	}

});