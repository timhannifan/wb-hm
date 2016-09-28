
Template.monsterData.onCreated( function() {

  let initialStart=moment().subtract(1000*3600*24*1).toDate();
  let today = new Date();
  
  this.startDate=new ReactiveVar({createdAt: {$gte: initialStart}});
  this.endDate=new ReactiveVar({createdAt: {$lte: today}});
  this.sourceCategory=new ReactiveVar({});
  this.qualification=new ReactiveVar({});
  this.experience=new ReactiveVar({});

  this.fields = new ReactiveVar({
      title: 1,
      company: 1,
      sourceCategory: 1,
      qualification: 1,
      experience: 1,
      createdAt: 1
  });
  this.limit = new ReactiveVar(50);
  this.loaded = new ReactiveVar(0);

  this.autorun(() => {
    var limit = this.limit.get();
    var pq = {
      $and : [
        this.startDate.get(),
        this.endDate.get(),
        this.sourceCategory.get(),
        this.qualification.get(),
        this.experience.get()
      ]      
    };

    if ( pq ){
      var subscription = this.subscribe('monsterQuery', pq, limit);    
      this.subscribe('monsterMeta');
      if (subscription.ready()) {
        this.loaded.set(limit);
        console.log("> Subscription is ready. \n\n");
      } else {
        console.log("> Subscription is not ready yet. \n\n");
      }
    }
  });

  this.items = function() { 
    return MonsterItems.find({},{ sort: { createdAt: -1 }, limit: this.loaded.get() });
  };

});

Template.monsterData.helpers({
  items: function () {
    return Template.instance().items();
  },
  hasMoreData: function () {
    return Template.instance().items().count() >= Template.instance().limit.get();
  }  
});

Template.monsterData.events({
  'change #monsterFilterForm': function (event, instance) {
    if (!AutoForm.validateForm('monsterFilterForm')) {
        GlobalUI.toast( 'There was an error processing your query.', 'danger' );
    } else {
      GlobalUI.toast( 'Updating table....');
      var form = AutoForm.getFormValues('monsterFilterForm'),
      doc = form.insertDoc;

      if (doc.startDate){
        instance.startDate.set({createdAt: {$gte: doc.startDate}});
      }else {
        instance.startDate.set({createdAt: {$gte:  moment().subtract(1000*3600*24*1).toDate() }});
      }     
      if (doc.endDate){
        instance.endDate.set({createdAt: {$lte: doc.endDate}});
      }else {
        instance.endDate.set({createdAt: {$lte: new Date()}});
      }    
      if (doc.sourceCategory){
        instance.sourceCategory.set({sourceCategory: {$in: doc.sourceCategory}});
      } else {
        instance.sourceCategory.set({});
      }    
      if (doc.qualification){
        instance.qualification.set({qualification: {$in: doc.qualification}});
      } else {
        instance.qualification.set({});
      }    
      if (doc.experience){
        instance.experience.set({experience: {$in: doc.experience}});
      } else {
        instance.experience.set({});
      }    
    }
  },
  'click .js-load-more': function (event, instance) {
    event.preventDefault();
    var limit = instance.limit.get();
    limit += 50;
    instance.limit.set(limit);
  }   
});

