
Template.data.rendered = function(){
    Session.set("tabular-filter", {schema: "MonsterItems", label: ""});
}

Template.data.helpers({
  selector: function (){
    var select = Session.get("filter_selector");
    return select;
  }
});

Template.tabTitle.helpers({
	getPost: function () {
		return this._id;
	},
});


Template.data_item.rendered = function () {
	console.log(this);
};