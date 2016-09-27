
Template.monsterData.onCreated( () => {

  let initialStart=moment().subtract(1000*3600*24*1).toDate();
  let today = new Date();
  
  this.startDate=new ReactiveVar({createdAt: {$gte: initialStart}});
  this.endDate=new ReactiveVar({createdAt: {$lte: today}});
  this.sourceCategory=new ReactiveVar({});
  this.qualification=new ReactiveVar({});

  this.fields = new ReactiveVar({
      title: 1,
      company: 1,
      sourceCategory: 1,
      qualification: 1,
      createdAt: 1
  });

	this.templateLimit = new ReactiveVar(50);
	this.increaseLimit = function(current, num) {
		const newVal = current + num;
		console.log(newVal)

		this.templateLimit.set(newVal);
	}	

  let passedQ = { 
    $and : [
          startDate.get(),
          endDate.get(),
          sourceCategory.get(),
          qualification.get()
        ] 
  };

  Tracker.autorun(function () {
    Meteor.subscribe('JobStreetMeta');
    Meteor.subscribe('monsterQuery', passedQ);
  });

});

Template.monsterData.helpers({
  tableItems() {
    let data = MonsterItems.find(
      {
        $and : [
	        startDate.get(),
	        endDate.get(),
	        sourceCategory.get(),
	        qualification.get()
        ] 
      },
      {
      	limit: templateLimit.get(),
      	sort: {createdAt: -1},
        fields: fields.get(),
      }
    );

    if (data) {
    	return data.fetch();
    } else {
    	return []
    };
  }
});

Template.monsterData.events({
  'change #monsterFilterForm': function (event, template) {
    GlobalUI.toast( 'Updating table....');
    var form = AutoForm.getFormValues('monsterFilterForm'),
    doc = form.insertDoc;

    if (doc.startDate){
      startDate.set({createdAt: {$gte: moment().subtract(1000*3600*24*1).toDate()}});
    }else {
      startDate.set({createdAt: {$gte: new Date()}});
    }     
    if (doc.endDate){
      endDate.set({createdAt: {$lte: doc.endDate}});
    }else {
      endDate.set({createdAt: {$lte: new Date()}});
    }    
    if (doc.sourceCategory){
      sourceCategory.set({sourceCategory: {$in: doc.sourceCategory}});
    } else {
      sourceCategory.set({});
    }    
    if (doc.qualification){
      qualification.set({qualification: {$in: doc.qualification}});
    } else {
      qualification.set({});
    }
  },
  'click .js-load-more': function (event, template) {
  	const current = templateLimit.get();
  	increaseLimit(current,50);
  }  
});

