// Template.export.events({
// 	"click #methodExportMonsterSources": function() {
// 		console.log('clicked methodExportMonsterSources');
// 		MyAppExporter.methodExportMonsterSources();
// 	},

// 	"click #methodExportJobStreetSources": function() {
// 		console.log('clicked methodExportJobStreetSources');
// 		MyAppExporter.methodExportJobStreetSources();
// 	},

// 	"click #methodExportMonsterItems": function() {
// 		console.log('clicked methodExportMonsterItems');
// 		MyAppExporter.methodExportMonsterItems();
// 	},
// 	"click #methodExportJobStreetItems": function() {
// 		console.log('clicked methodExporJobStreetItems');
// 		var res = MyAppExporter.methodExportJobStreetItems();
// 		console.log(res);
// 	},
// 	"click #methodExportCombinedItems": function() {
// 		console.log('clicked methodExportCombinedItems');
// 		MyAppExporter.methodExportCombinedItems();
// 	}
// 	// "click #method": function() {
// 	// 	console.log('clicked method');
// 	// 	MyAppExporter.method();
// 	// },

// });
Template.export.onCreated( () => {
  // Template.instance().subscribe( 'jobstreet' );
});

Template.export.events({
  'click .export-data' ( event, template ) {
  	console.log('clicked');

    let name        = 'download_',
    	date 		= new Date(),
        fileName    = `${name} ${date}`;

    Meteor.apply( 'exportData',[],{wait: true}, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, `${fileName}.zip` );
        }
      }
    });
  }
});
