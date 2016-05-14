
Meteor.publish( 'jobstreet', function() {
  // let userId = this.userId;

  return [
  	JobStreetItems.find( {} )
  ];
});
