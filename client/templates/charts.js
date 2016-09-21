// buildKeywordTypeChart = function() {
// 	let cursor = SkillsKeywordInstances.find();

// 	if ( cursor ) {
// 	  let uniqueTypes = _.uniq( cursor.map( ( item ) => {
// 	    return item.keywordType;
// 	  }), true );

// 	  let data = [];
// 	  let total = cursor.count();

// 	  console.log(total);
// 	  console.log(uniqueTypes);

// 	}

// 	// cursor.forEach(function(el) {
// 	// 	let amount = 0;
// 	// 	if (el.hasOwnProperty('amount')) {
// 	// 		amount = el.amount / total;
// 	// 	}
// 	// 	data.push([el.name, amount]);
// 	// });
// 	// $('#locationChart').highcharts({
// 	// 	chart: {
// 	// 		plotBackgroundColor: null,
// 	// 		plotBorderWidth: null,
// 	// 		plotShadow: false
// 	// 	},
// 	// 	title: {
// 	// 		text: "Keywords by Type"
// 	// 	},
// 	// 	tooltip: {
// 	// 		pointFormat: '<b>{point.percentage:.1f}%</b>'
// 	// 	},
// 	// 	plotOptions: {
// 	// 		pie: {
// 	// 			allowPointSelect: true,
// 	// 			cursor: 'pointer',
// 	// 			dataLabels: {
// 	// 				enabled: true,
// 	// 				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
// 	// 				style: {
// 	// 					color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
// 	// 				},
// 	// 				connectorColor: 'silver'
// 	// 			}
// 	// 		}
// 	// 	},
// 	// 	series: [{
// 	// 		type: 'pie',
// 	// 		name: 'location',
// 	// 		data: data
// 	// 	}]
// 	// });
// };

// buildOsChart = function() {
// 	opsys = OperatingSystems.find();
// 	var data = [];
// 	var total = 0;
// 	opsys.forEach(function(os) {
// 		if (os.hasOwnProperty('amount')) {
// 			total = total + os.amount;
// 		}
// 	});
// 	opsys.forEach(function(os) {
// 		var amount = 0;
// 		if (os.hasOwnProperty('amount')) {
// 			amount = os.amount / total;
// 		}
// 		data.push([os.name, amount]);
// 	});
// 	$('#osChart').highcharts({
// 		chart: {
// 			plotBackgroundColor: null,
// 			plotBorderWidth: null,
// 			plotShadow: false
// 		},
// 		title: {
// 			text: "Which OS Meteor developers use"
// 		},
// 		tooltip: {
// 			pointFormat: '<b>{point.percentage:.1f}%</b>'
// 		},
// 		plotOptions: {
// 			pie: {
// 				allowPointSelect: true,
// 				cursor: 'pointer',
// 				dataLabels: {
// 					enabled: true,
// 					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
// 					style: {
// 						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
// 					},
// 					connectorColor: 'silver'
// 				}
// 			}
// 		},
// 		series: [{
// 			type: 'pie',
// 			name: 'location',
// 			data: data
// 		}]
// 	});
// };
Template.charts.onCreated(function() {
	let thirtyDaysAgo = new Date() - 1000*60*24*30;

	this.subscribe('skillsKeywordInstancesTypes');
})
Template.charts.rendered = function() {
	let cursor = SkillsKeywordInstances.find();

	if ( cursor ) {
		// console.log(cursor.count());
	  let uniqueTypes = _.uniq( cursor.map( ( item ) => {
	    return item.keywordType;
	  }), true );

	  let data = [];
	  let total = cursor.count();

	  console.log(total);
	  console.log(uniqueTypes);
	}

};