function exportMonsterSources () {
	console.log('exportMonsterSources called');
	var jsonData, fullData;
	
	fullData = MonsterSources.find({}).fetch();

	jsonData = [];

	if (fullData) {
		for (var i = 0; i < fullData.length; i++) {
			//array of objects
			jsonData.push(fullData[i]);
		}
		
		return jsonData;		
	}
}
function exportJobStreetSources () {
	console.log('exportJobStreetSources called');
	var jsonData, fullData;
	
	fullData = JobStreetSources.find({}).fetch();

	jsonData = [];

	if (fullData) {
		for (var i = 0; i < fullData.length; i++) {
			//array of objects
			jsonData.push(fullData[i]);
		}
		
		return jsonData;		
	}
}
function exportJobStreetItems () {
	console.log('exportJobStreetItems called');
	var jsonData, fullData;
	
	fullData = JobStreetItems.find({}).fetch();

	jsonData = [];

	if (fullData) {
		for (var i = 0; i < fullData.length; i++) {
			//array of objects
			jsonData.push(fullData[i]);
		}
		
		return jsonData;		
	}
}
function exportMonsterItems () {
	console.log('exportMonsterItems called');
	var jsonData, fullData;
	
	fullData = MonsterItems.find({}).fetch();

	jsonData = [];

	if (fullData) {
		for (var i = 0; i < fullData.length; i++) {
			//array of objects
			jsonData.push(fullData[i]);
		}
		
		return jsonData;		
	}
}
function exportCombinedItems () {
	console.log('exportCombinedItems called');
	var jsonData, data1, data2;
	
	data1 = JobStreetItems.find({}).fetch();
	data2 = MonsterItems.find({}).fetch();

	jsonData = [];

	if (data1 && data2) {
		for (var i = 0; i < data1.length; i++) {
			//array of objects
			jsonData.push(data1[i]);
		}
		for (var i = 0; i < data2.length; i++) {
			//array of objects
			jsonData.push(data2[i]);
		}
		
		return jsonData;		
	}
}

Meteor.methods({
	exportMonsterSources: function() {
		return exportMonsterSources();
	},
	exportJobStreetSources: function() {
		return exportJobStreetSources();
	},
	exportJobStreetItems: function() {
		return exportJobStreetItems();
	},
	exportMonsterItems: function() {
		return exportMonsterItems();
	},
	exportCombinedItems: function() {
		return exportCombinedItems();
	}
});