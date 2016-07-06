_rund3 = function(data) {
}
Template.datavis.onCreated( () => {
	var instance = Template.instance();
	instance.skillType = new ReactiveDict();
	instance.skillType.set('type', 'all');
	instance.getSkillFilter = () => instance.skillType.get('type');
	// instance.getSkillQuery = () => instance.skillQuery.get();
	instance.ready = new ReactiveVar();

	Tracker.autorun(() => {

		const subHandle1 = Meteor.subscribe('JSAggs');
		const subHandle3 = Meteor.subscribe('Skills.byType', instance.getSkillFilter() );
	  	const isReady = subHandle1.ready() && subHandle3.ready();
	  	console.log(`datavis subs are ${isReady ? 'ready' : 'not ready'}`);  
	  	instance.ready.set(isReady);

		var skillsModifier = {sort: {parsed_keyword: 1} };
		var aggsQuery = {};
		var aggsModifier = {};

	  	if ( isReady ) {
	 		var jsonResult = [];
		  	var skillsCursor = Skills.find({}, skillsModifier);
		  	var skillsKeywordMap = skillsCursor.map(function(doc){return doc.parsed_keyword});
  	 		// var skillKeywordArray = skillsCursor.map(function(doc) {
  	 		// 	if (doc.parsed_keyword != null) {
  			 // 		return doc.parsed_keyword;		
  	 		// 	}
  	 		// });
		  	// var skillsFetch = skillsCursor.fetch();
		  	var aggsCursor = JSAggs.find(aggsQuery, aggsModifier);
		  	var aggsMap = aggsCursor.map(function(doc){return doc});
		  	// var aggsFetch = aggsCursor.fetch();

		  	var margin = { top: 150, right: 10, bottom: 50, left: 100 },
	  	  	cellSize = 10,
	  	  	col_number = skillsCursor.count(),
	  	  	row_number = aggsCursor.count(),
	  	  	width = cellSize*col_number, // - margin.left - margin.right,
	  	  	height = cellSize*row_number , // - margin.top - margin.bottom,
	  	  	legendElementWidth = cellSize*3,
	  	  	colorBuckets = 10,
	  	  	colors = ['#FFFFFF','#F1EEF6','#E6D3E1','#DBB9CD','#D19EB9','#C684A4','#BB6990','#B14F7C','#A63467','#9B1A53','#91003F'],
	  	 	hccol = skillsCursor.map(function(doc,index){
	  	  		return index+1;
	  	  	}),
	  	 	colLabel = skillsCursor.map(function(doc,index){
	  			return doc.parsed_keyword
	  	  	}),
	  	  	hcrow = aggsCursor.map(function(doc,index){
	  	  		return index+1;
	  	  	}),
	  	 	rowLabel = aggsCursor.map(function(doc,index){
	  	  		return doc._id;
	  	 	});

	  	 	aggsCursor.forEach(function (agg, aggIndex) {
	  	 		// console.log(agg);

	  	 		skillsCursor.forEach(function (skill, skillIndex) {
	  	 			// console.log(skill);

		 		  	var mappedItem = {};
		 		  	mappedItem.row = aggIndex+1;
		 		  	mappedItem.col = skillIndex+1;
		 		    
		 		    var thisOneKeyword = skill.parsed_keyword;
		 		    if (agg.skillKeyword == thisOneKeyword) {
		 		      mappedItem.value = agg.total;
		 		    } else {
		 		      mappedItem.value = 0;
		 		    }

			 		jsonResult.push(mappedItem);
	  	 		});
	  	 	});

	 		// for (var i = 0, len=aggsFetch.length; i<len; i++) {


		 	// 	for (var n = 0; n < skillKeywordArray.length; n++) {
		 	// 	  	var mappedItem = {};
		 	// 	  	mappedItem.row = aggsFetch.indexOf(aggsFetch[i])+1;

		 	// 	  	mappedItem.col = skillKeywordArray.indexOf(skillKeywordArray[n])+1;
		 		    
		 	// 	    var thisOneKeyword = skillKeywordArray[n];
		 	// 	    if (aggsFetch[i].skillKeyword == thisOneKeyword) {
		 	// 	      mappedItem.value = aggsFetch[i].total;
		 	// 	    } else {
		 	// 	      mappedItem.value = 0;
		 	// 	    }

			 // 		jsonResult.push(mappedItem);
		 	// 	}
	 		// }

		  	data = jsonResult;

	  		var colorScale = d3.scale.quantile()
	  		    .domain([ 0 , 5, 10])
	  		    .range(colors);
	  		  
	  		var svg = d3.select("#chart")
	  			.append("svg")
	  		    .attr("width", width + margin.left + margin.right)
	  		    .attr("height", height + margin.top + margin.bottom)
	  		    .append("g")
	  		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	  		    ;
	  		var rowSortOrder=false;
	  		var colSortOrder=false;
	  		var rowLabels = svg.append("g")
	  		    .selectAll(".rowLabelg")
	  		    .data(rowLabel)
	  		    .enter()
	  		    .append("text")
	  		    .text(function (d) { return d; })
	  		    .attr("x", 0)
	  		    .attr("y", function (d, i) { return hcrow.indexOf(i+1) * cellSize; })
	  		    .style("text-anchor", "end")
	  		    .attr("transform", "translate(-6," + cellSize / 1.5 + ")")
	  		    .attr("class", function (d,i) { return "rowLabel mono r"+i;} ) 
	  		    .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
	  		    .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
	  		    .on("click", function(d,i) {rowSortOrder=!rowSortOrder; sortbylabel("r",i,rowSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;})
	  		    ;

	  		var colLabels = svg.append("g")
	  		    .selectAll(".colLabelg")
	  		    .data(colLabel)
	  		    .enter()
	  		    .append("text")
	  		    .text(function (d) { return d; })
	  		    .attr("x", 0)
	  		    .attr("y", function (d, i) { return hccol.indexOf(i+1) * cellSize; })
	  		    .style("text-anchor", "left")
	  		    .attr("transform", "translate("+cellSize/2 + ",-6) rotate (-90)")
	  		    .attr("class",  function (d,i) { return "colLabel mono c"+i;} )
	  		    .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
	  		    .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);})
	  		    .on("click", function(d,i) {colSortOrder=!colSortOrder;  sortbylabel("c",i,colSortOrder);d3.select("#order").property("selectedIndex", 4).node().focus();;})
	  		    ;

	  		var heatMap = svg.append("g").attr("class","g3")
	  	        .selectAll(".cellg")
	  	        .data(data,function(d){return d.row+":"+d.col;})
	  	        .enter()
	  	        .append("rect")
	  	        .attr("x", function(d) { return hccol.indexOf(d.col) * cellSize; })
	  	        .attr("y", function(d) { return hcrow.indexOf(d.row) * cellSize; })
	  	        .attr("class", function(d){return "cell cell-border cr"+(d.row-1)+" cc"+(d.col-1);})
	  	        .attr("width", cellSize)
	  	        .attr("height", cellSize)
	  	        .style("fill", function(d) { return colorScale(d.value); })
	  	        /* .on("click", function(d) {
	  	               var rowtext=d3.select(".r"+(d.row-1));
	  	               if(rowtext.classed("text-selected")==false){
	  	                   rowtext.classed("text-selected",true);
	  	               }else{
	  	                   rowtext.classed("text-selected",false);
	  	               }
	  	        })*/
	  	        .on("mouseover", function(d){
	  	               //highlight text
	  	               d3.select(this).classed("cell-hover",true);
	  	               d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ return ri==(d.row-1);});
	  	               d3.selectAll(".colLabel").classed("text-highlight",function(c,ci){ return ci==(d.col-1);});
	  	        
	  	               //Update the tooltip position and value
	  	               d3.select("#tooltip")
	  	                 .style("left", (d3.event.pageX+10) + "px")
	  	                 .style("top", (d3.event.pageY-10) + "px")
	  	                 .select("#value")
	  	                 .text("labels:"+rowLabel[d.row-1]+","+colLabel[d.col-1]+"\ndata:"+d.value+"\nrow-col-idx:"+d.col+","+d.row+"\ncell-xy "+this.x.baseVal.value+", "+this.y.baseVal.value);  
	  	               //Show the tooltip
	  	               d3.select("#tooltip").classed("hidden", false);
	  	        })
	  	        .on("mouseout", function(){
	  	               d3.select(this).classed("cell-hover",false);
	  	               d3.selectAll(".rowLabel").classed("text-highlight",false);
	  	               d3.selectAll(".colLabel").classed("text-highlight",false);
	  	               d3.select("#tooltip").classed("hidden", true);
	  	        });

	  		var legend = svg.selectAll(".legend")
	  		    .data([0,1,2,3,4,5,6,7,8,9,10])
	  		    .enter().append("g")
	  		    .attr("class", "legend");
	  	 
	  		legend.append("rect")
	  		    .attr("x", function(d, i) { return legendElementWidth * i; })
	  		    .attr("y", height+(cellSize*2))
	  		    .attr("width", legendElementWidth)
	  		    .attr("height", cellSize)
	  		    .style("fill", function(d, i) { return colors[i]; });
	  		 
	  		legend.append("text")
	  		    .attr("class", "mono")
	  		    .text(function(d) { return d; })
	  		    .attr("width", legendElementWidth)
	  		    .attr("x", function(d, i) { return legendElementWidth * i; })
	  		    .attr("y", height + (cellSize*4));

	  		// Change ordering of cells
	  		function sortbylabel(rORc,i,sortOrder){
	  		       var t = svg.transition().duration(3000);
	  		       var frequencies=[];
	  		       var sorted; // sorted is zero-based index
	  		       d3.selectAll(".c"+rORc+i) 
	  		         .filter(function(ce){
	  		            frequencies.push(ce.value);
	  		          })
	  		       ;
	  		       if(rORc=="r"){ // sort by col
	  		         sorted=d3.range(col_number).sort(function(a,b){ if(sortOrder){ return frequencies[b]-frequencies[a];}else{ return frequencies[a]-frequencies[b];}});
	  		         t.selectAll(".cell")
	  		           .attr("x", function(d) { return sorted.indexOf(d.col-1) * cellSize; })
	  		           ;
	  		         t.selectAll(".colLabel")
	  		          .attr("y", function (d, i) { return sorted.indexOf(i) * cellSize; })
	  		         ;
	  		       }else{ // sort by row
	  		         sorted=d3.range(row_number).sort(function(a,b){if(sortOrder){ return frequencies[b]-frequencies[a];}else{ return frequencies[a]-frequencies[b];}});
	  		         t.selectAll(".cell")
	  		           .attr("y", function(d) { return sorted.indexOf(d.row-1) * cellSize; })
	  		           ;
	  		         t.selectAll(".rowLabel")
	  		          .attr("y", function (d, i) { return sorted.indexOf(i) * cellSize; })
	  		         ;
	  		       }
	  		};

	  		d3.select("#order").on("change",function(){
	  		    order(this.value);
	  		});
	  		  
	  		function order(value){
	  			   if(value=="by-cluster"){
	  			    var t = svg.transition().duration(1000);
	  			    t.selectAll(".cell")
	  			      .attr("x", function(d) { return hccol.indexOf(d.col) * cellSize; })
	  			      .attr("y", function(d) { return hcrow.indexOf(d.row) * cellSize; })
	  			      ;

	  			    t.selectAll(".rowLabel")
	  			      .attr("y", function (d, i) { return hcrow.indexOf(i+1) * cellSize; })
	  			      ;

	  			    t.selectAll(".colLabel")
	  			      .attr("y", function (d, i) { return hccol.indexOf(i+1) * cellSize; })
	  			      ;

	  			   }else if (value=="by-x-and-y"){
	  			    var t = svg.transition().duration(1000);
	  			    t.selectAll(".cell")
	  			      .attr("x", function(d) { return (d.col - 1) * cellSize; })
	  			      .attr("y", function(d) { return (d.row - 1) * cellSize; })
	  			      ;

	  			    t.selectAll(".rowLabel")
	  			      .attr("y", function (d, i) { return i * cellSize; })
	  			      ;

	  			    t.selectAll(".colLabel")
	  			      .attr("y", function (d, i) { return i * cellSize; })
	  			      ;

	  			   }else if (value=="by-y"){
	  			    var t = svg.transition().duration(1000);
	  			    t.selectAll(".cell")
	  			      .attr("y", function(d) { return (d.row - 1) * cellSize; })
	  			      ;

	  			    t.selectAll(".rowLabel")
	  			      .attr("y", function (d, i) { return i * cellSize; })
	  			      ;
	  			   }else if (value=="by-x"){
	  			    var t = svg.transition().duration(1000);
	  			    t.selectAll(".cell")
	  			      .attr("x", function(d) { return (d.col - 1) * cellSize; })
	  			      ;
	  			    t.selectAll(".colLabel")
	  			      .attr("y", function (d, i) { return i * cellSize; })
	  			      ;
	  			   }
	  		};

	  		var sa=d3.select(".g3")
	  		    .on("mousedown", function() {
	  		          if( !d3.event.altKey) {
	  		             d3.selectAll(".cell-selected").classed("cell-selected",false);
	  		             d3.selectAll(".rowLabel").classed("text-selected",false);
	  		             d3.selectAll(".colLabel").classed("text-selected",false);
	  		          }
	  		         var p = d3.mouse(this);
	  		         sa.append("rect")
	  		         .attr({
	  		             rx      : 0,
	  		             ry      : 0,
	  		             class   : "selection",
	  		             x       : p[0],
	  		             y       : p[1],
	  		             width   : 1,
	  		             height  : 1
	  		         })
	  		    })
	  		    .on("mousemove", function() {
	  		         var s = sa.select("rect.selection");
	  		      
	  		         if(!s.empty()) {
	  		             var p = d3.mouse(this),
	  		                 d = {
	  		                     x       : parseInt(s.attr("x"), 10),
	  		                     y       : parseInt(s.attr("y"), 10),
	  		                     width   : parseInt(s.attr("width"), 10),
	  		                     height  : parseInt(s.attr("height"), 10)
	  		                 },
	  		                 move = {
	  		                     x : p[0] - d.x,
	  		                     y : p[1] - d.y
	  		                 }
	  		             ;
	  		      
	  		             if(move.x < 1 || (move.x*2<d.width)) {
	  		                 d.x = p[0];
	  		                 d.width -= move.x;
	  		             } else {
	  		                 d.width = move.x;       
	  		             }
	  		      
	  		             if(move.y < 1 || (move.y*2<d.height)) {
	  		                 d.y = p[1];
	  		                 d.height -= move.y;
	  		             } else {
	  		                 d.height = move.y;       
	  		             }
	  		             s.attr(d);
	  		      
	  		                 // deselect all temporary selected state objects
	  		             d3.selectAll('.cell-selection.cell-selected').classed("cell-selected", false);
	  		             d3.selectAll(".text-selection.text-selected").classed("text-selected",false);

	  		             d3.selectAll('.cell').filter(function(cell_d, i) {
	  		                 if(
	  		                     !d3.select(this).classed("cell-selected") && 
	  		                         // inner circle inside selection frame
	  		                     (this.x.baseVal.value)+cellSize >= d.x && (this.x.baseVal.value)<=d.x+d.width && 
	  		                     (this.y.baseVal.value)+cellSize >= d.y && (this.y.baseVal.value)<=d.y+d.height
	  		                 ) {
	  		      
	  		                     d3.select(this)
	  		                     .classed("cell-selection", true)
	  		                     .classed("cell-selected", true);

	  		                     d3.select(".r"+(cell_d.row-1))
	  		                     .classed("text-selection",true)
	  		                     .classed("text-selected",true);

	  		                     d3.select(".c"+(cell_d.col-1))
	  		                     .classed("text-selection",true)
	  		                     .classed("text-selected",true);
	  		                 }
	  		             });
	  		         }
	  		    })
	  		    .on("mouseup", function() {
	  		            // remove selection frame
	  		         sa.selectAll("rect.selection").remove();
	  		      
	  		             // remove temporary selection marker class
	  		         d3.selectAll('.cell-selection').classed("cell-selection", false);
	  		         d3.selectAll(".text-selection").classed("text-selection",false);
	  	        });
	  		    // .on("mouseout", function() {
	  		    //      if(d3.event.relatedTarget.tagName=='html') {
	  		    //              // remove selection frame
	  		    //          sa.selectAll("rect.selection").remove();
	  		    //              // remove temporary selection marker class
	  		    //          d3.selectAll('.cell-selection').classed("cell-selection", false);
	  		    //          d3.selectAll(".rowLabel").classed("text-selected",false);
	  		    //          d3.selectAll(".colLabel").classed("text-selected",false);
	  		    //      }
	  		    // });
		}
	});
});

Template.datavis.onRendered( () => {
	var instance = Template.instance();

	console.log(instance.ready.get());
	console.log('rendering');
});

Template.datavis.helpers({
	skillTypes: function () {
		return _.uniq(Skills.find().map( (doc) => { return doc.type }), true );
	}
});

Template.datavis.events({
	'change #jsSkillType': function (event, instance) {
		// var self = this;
		// var newVal = ;
		event.preventDefault();
		instance.skillType.set('type', event.target.value);
		// instance.skillType.set('type', event.target.value);
	}
});

// let data = JobStreetMeta.find( {type: "companySnapIndustry"}, { fields: { name: 1 }, sort: { name: 1 }} );
// if ( data ) {
//   var uniques = _.uniq( data.map( ( item ) => {
//     return item.name;
//   }), true );

//   var res = [];
//   for (var i = 0; i < uniques.length; i++) {
//     res.push({label: uniques[i], value: uniques[i]});
//   }
//   return res;
// }