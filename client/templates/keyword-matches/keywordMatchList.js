Template.keywordMatchList.onCreated( function() {
	this.limit = new ReactiveVar(50);
  this.loaded = new ReactiveVar(0);

  this.autorun(() => {
  	this.subscribe('skills');

    var limit = this.limit.get();
    var id = Router.current().params._id;
    
    var subscription = this.subscribe('keywordMatchList', id, limit);    
    if (subscription.ready()) {
      this.loaded.set(limit);
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
  });

  this.items = function() { 
    return SkillsKeywordInstances.find({},{ sort: { createdAt: -1 }, limit: this.loaded.get() });
  };
});

Template.keywordMatchList.helpers({
  items: function () {
    return Template.instance().items();
  },
  hasMoreData: function () {
    return Template.instance().items().count() >= Template.instance().limit.get();
  },
  skill: function (_id) {
  	// console.log(Router.current().params._id);
  	return Skills.findOne({_id: Router.current().params._id})
  }  
});

Template.keywordMatchList.events({
  'click .js-load-more': function (event, instance) {
    event.preventDefault();
    var limit = instance.limit.get();
    limit += 50;
    instance.limit.set(limit);
  } 
});

Template.jobStreetRow.onCreated(function() {	
	Meteor.subscribe('JobStreetOne', this.data._id);
})
Template.jobStreetRow.helpers({
	jsItem: function (_id) {
		return JobStreetItems.findOne({_id: _id});
	}
})