Meteor.publish('JSNewDescTagsFrequency.all',function(req){
  return [
    JSNewDescTagsFrequency.find({})
  ];
});