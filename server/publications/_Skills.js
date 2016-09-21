Meteor.publish('skillsInstances', function (query, modifier) {
	console.log(query, modifier);
	
	if (query && modifier ) {
    var checkedQuery = {}; 
    var checkedModifier = {};

    if (query.startDate && !query.endDate){
        check( query.startDate, Date);
        checkedQuery.createdAt = {$gte: query.startDate};       
    } else if (!query.startDate && query.endDate){
        check( query.endDate, Date);
        checkedQuery.createdAt = {$lte: query.endDate};
    } else if (query.startDate && query.endDate){
        check( query.startDate, Date);
        check( query.endDate, Date);
        checkedQuery = {
            $and: [ {createdAt: {$gte: query.startDate}}, {createdAt: {$lte: query.endDate}} ]
        };
    }

    if (query.jsParentCategory){
        check( query.jsParentCategory, Array);
        checkedQuery.parentCategory = {$in: query.jsParentCategory};
    }
    if (query.jsSubSpecialization){
        check( query.jsSubSpecialization, Array);
        checkedQuery.subSpecialization = {$in: query.jsSubSpecialization};
    }
    if (query.jsListedIndustry){
        check( query.jsListedIndustry, Array);
        checkedQuery.listedIndustry = {$in: query.jsListedIndustry};
    }
    if (query.jsListedSpec){
        check( query.jsListedSpec, Array);
        checkedQuery.listedSpec = {$in: query.jsListedSpec};
    }
    if (query.jsListedRole){
        check( query.jsListedRole, Array);
        checkedQuery.listedRole = {$in: query.jsListedRole};
    }
    if (query.jsAltIndustry){
        check( query.jsAltIndustry, Array);
        checkedQuery.companySnapIndustry = {$in: query.jsAltIndustry};
    }
    if (query.jsExperience){
        check( query.jsExperience, Array);
        checkedQuery.experience = {$in: query.jsExperience};
    }
    if (modifier.fields){
        check( modifier.fields, Object );    
        checkedModifier.fields = modifier.fields;
    }
    console.log(checkedQuery,checkedModifier);

    return SkillsKeywordInstances.find(checkedQuery, checkedModifier);
  } else {
  	return [];
  }
});

Meteor.publish('keywordMatchList', function(_id) {
    console.log('publishing for a new keyword' + _id);
    if (_id) {
        return  SkillsKeywordInstances.find( {keywordId: _id} );
    } else {
        return [];
    }
});

Meteor.publish('skillsKeywordInstancesTypes', function(query) {
  if (!query) {
    return [];
  } else {
    let mod = {
      sort: { 
        keywordType: 1
      },
      fields: {
        keywordType: 1
      }
    };

    return  SkillsKeywordInstances.find( query, mod );
  }
});


Meteor.publish('skillsKeywordInstancesAll', function(query) {
  return SkillsKeywordInstances.find( {})
  // if (query) {
    // console.log('skillsKeywordInstancesAll publishing for null query');
    // return SkillsKeywordInstances.find( {}, {limit: 1500} );
  // }
  // else {
    // console.log('skillsKeywordInstancesAll publishing:');
    // console.dir(query);
    // console.log(query);
    // ;//query );
  // }
      // console.log('skillsKeywordInstancesAll', query);
      // // var collQuery = {}; 
      // // var collMod = {};

      // // if (query.startDate && !query.endDate){
      // //     check( query.startDate, Date);
      // //     collQuery.createdAt = {$gte: query.startDate};       
      // // } else if (!query.startDate && query.endDate){
      // //     check( query.endDate, Date);
      // //     collQuery.createdAt = {$lte: query.endDate};
      // // } else if (query.startDate && query.endDate){
      // //     check( query.startDate, Date);
      // //     check( query.endDate, Date);
      // //     collQuery = {
      // //         $and: [ {createdAt: {$gte: query.startDate}}, {createdAt: {$lte: query.endDate}} ]
      // //     };
      // // }

      // // console.log(collQuery);

      // return  SkillsKeywordInstances.find( query );
    
});

