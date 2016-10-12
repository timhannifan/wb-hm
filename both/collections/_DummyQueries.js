DummyQueries = new Mongo.Collection('DummyQueries');

if (Meteor.isServer) {
	Meteor.publish('DummyQueries', function() {
		return DummyQueries.find();
	});
} else {
	Meteor.subscribe('DummyQueries');
}