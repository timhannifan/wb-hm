BatchDownloads = new Mongo.Collection('BatchDownloads');

if (Meteor.isServer) {
	Meteor.publish('BatchDownloads', function() {
		return BatchDownloads.find();
	});
} else {
	Meteor.subscribe('BatchDownloads');
}