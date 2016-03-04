// Template.data.rendered = function () {
// 	$('.mytable').DataTable({
// 		dom: 'Bfrtip',
// 		buttons: [
// 		    'colvis',
// 		    'excel',
// 		    'print'
// 		]
// 	});
// };
Template.tabTitle.helpers({
	getPost: function () {
		return this._id;
	}
});


Template.dataItem.rendered = function () {
	console.log(this);
};