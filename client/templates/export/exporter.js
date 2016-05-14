MyAppExporter = {
	methodExportMonsterSources: function() {
		var self = this;

		Meteor.apply("exportMonsterSources",[],{wait: true}, function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "MonsterSources.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportJobStreetSources: function() {
		var self = this;

		Meteor.apply("exportJobStreetSources",[],{wait: true}, function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "JobStreetSources.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportJobStreetItems: function() {
		var self = this;

		Meteor.apply("exportJobStreetItems",[],{wait: true}, function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			else {
				if(data){
					console.log('we got a result from JobStreetItems');
					var csv = Papa.unparse(data);
					
					var title = "JobStreetItems.csv";
					self._downloadCSV(csv, title);
					return true;
				}
			}

		});
	},
	methodExportMonsterItems: function() {
		var self = this;

		Meteor.apply("exportMonsterItems",[],{wait: true}, function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "MonsterItems.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportCombinedItems: function() {
		var self = this;

		Meteor.apply("exportCombinedItems",[],{wait: true}, function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "CombinedItems.csv";
			self._downloadCSV(csv, title);
		});
	},
	_downloadCSV: function(csv, title) {
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
	    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	    a.download = title;
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a);
	}
}