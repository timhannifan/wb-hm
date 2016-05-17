
Meteor.publish( 'jobstreet', function() {
  return [
  	JobStreetItems.find( {title: {$ne: null} } )
  ];
});
