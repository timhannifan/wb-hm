Template.export.events({
	"click #methodExportMonsterSources": function() {
		console.log('clicked methodExportMonsterSources');
		MyAppExporter.methodExportMonsterSources();
	},

	"click #methodExportJobStreetSources": function() {
		console.log('clicked methodExportJobStreetSources');
		MyAppExporter.methodExportJobStreetSources();
	},

	"click #methodExportMonsterItems": function() {
		console.log('clicked methodExportMonsterItems');
		MyAppExporter.methodExportMonsterItems();
	},
	"click #methodExportJobStreetItems": function() {
		console.log('clicked methodExporJobStreetItems');
		var res = MyAppExporter.methodExportJobStreetItems();
		console.log(res);
	},
	"click #methodExportCombinedItems": function() {
		console.log('clicked methodExportCombinedItems');
		MyAppExporter.methodExportCombinedItems();
	}
	// "click #method": function() {
	// 	console.log('clicked method');
	// 	MyAppExporter.method();
	// },

});
