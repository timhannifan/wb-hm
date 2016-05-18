
Meteor.publish( 'jobstreet', function() {
  return [
  	JobStreetItems.find( {title: {$ne: ''} }, {sort: {createdAt: -1}}  )
  ];
});
