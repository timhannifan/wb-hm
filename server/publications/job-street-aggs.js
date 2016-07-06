Meteor.publish('JSAggs',function(){
  return [
    JSAggs.find({})
  ];
});



// Meteor.publish('JSAggs',function(){
//   return [
//     JSAggs_parentCategory.find({}),
//     JSAggs_subSpecialization.find({}),
//     JSAggs_listedIndustry.find({}),
//     JSAggs_listedSpec.find({}),
//     JSAggs_listedRole.find({}),
//     JSAggs_companySnapIndustry.find({}),
//     JSAggs_experience.find({})
//   ];

// });
