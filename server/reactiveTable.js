

if (Meteor.isServer) {
	if(JobStreetItems) {
		ReactiveTable.publish(
	        "jobstreet-items",
	        JobStreetItems,
	        {"disablePageCountReactivity": true}
		);		
	}

}