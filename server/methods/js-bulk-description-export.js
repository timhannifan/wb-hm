Meteor.methods({
	jsBulkDescriptionExport: function (query, modifier) {
		// check( query, Object );
		// check( modifier, Object );

		var jsBulkDescriptionExport = Meteor.wrapAsync(Modules.server.jsBulkDescriptionExport),
		  result = jsBulkDescriptionExport(query, modifier, function( error, response ) {
		    if ( error ) {
		      // Handle error.
		      console.log(error)
		    } else {
		      // Handle response.
		      console.log('jsBulkDescriptionExport result');
		      console.log(result);
		      return result;

		    }
		  });
		
		return result;
	},
	jsLemmaExport: function (query, modifier) {
		// check( query, Object );
		// check( modifier, Object );

		var jsLemmaExport = Meteor.wrapAsync(Modules.server.jsLemmaExport),
		  result = jsLemmaExport(query, modifier, function( error, response ) {
		    if ( error ) {
		      // Handle error.
		      console.log(error)
		    } else {
		      // Handle response.
		      console.log('jsLemmaExport result');
		      console.log(result);
		      return result;

		    }
		  });
		
		return result;
	}
});