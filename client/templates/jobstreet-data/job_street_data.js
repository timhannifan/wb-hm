
Template.job_street_data.onCreated(function () {

  let initialStart=moment().subtract(1000*3600*24*1).toDate();
  let today = new Date();
  
  this.startDate=new ReactiveVar({createdAt: {$gte: initialStart}});
  this.endDate=new ReactiveVar({createdAt: {$lte: today}});
  this.jsParentCategory=new ReactiveVar({});
  this.jsSubSpecialization=new ReactiveVar({});
  this.jsListedIndustry=new ReactiveVar({});
  
  this.jsListedRole=new ReactiveVar({});
  this.jsAltIndustry=new ReactiveVar({});
  this.jsExperience=new ReactiveVar({});

	this.limit = new ReactiveVar(50);
  this.loaded = new ReactiveVar(0);

  this.autorun(() => {
    var limit = this.limit.get();
    var pq = {
      $and : [
        this.startDate.get(),
        this.endDate.get(),
        this.jsParentCategory.get(),
        this.jsSubSpecialization.get(),
        this.jsListedIndustry.get(),
        // this.jsListedSpec.get(),
        this.jsListedRole.get(),
        this.jsAltIndustry.get(),
        this.jsExperience.get()
      ]      
    };

    if ( pq ){
      var subscription = this.subscribe('jobStreetQuery', pq, limit);    
      this.subscribe('JobStreetMeta');
      if (subscription.ready()) {
        this.loaded.set(limit);
      } else {
        console.log("> Subscription is not ready yet. \n\n");
      }
    }

  });

  this.items = function() { 
    return JobStreetItems.find({},{ sort: { createdAt: -1 }, limit: this.loaded.get() });
  };
});

Template.job_street_data.helpers({
  items: function () {
    return Template.instance().items();
  },
  hasMoreData: function () {
    return Template.instance().items().count() >= Template.instance().limit.get();
  }
});

Template.job_street_data.events({
  'change #jsFilterForm': function (event, instance) {
    if (!AutoForm.validateForm('jsFilterForm')) {
        GlobalUI.toast( 'There was an error processing your query.', 'danger' );
    } else {
      GlobalUI.toast( 'Updating table....');
  
      var form = AutoForm.getFormValues('jsFilterForm'),
          doc = form.insertDoc;

      if (doc.startDate){
        console.log(doc.startDate)
        instance.startDate.set({createdAt: {$gte: doc.startDate}});
      }else {
        instance.startDate.set({createdAt: {$gte: moment().subtract(1000*3600*24*1).toDate()}});
      }     
      if (doc.endDate){
        instance.endDate.set({createdAt: {$lte: doc.endDate}});
      }else {
        instance.endDate.set({createdAt: {$lte: new Date()}});
      }    
      if (doc.jsParentCategory){
        instance.jsParentCategory.set({parentCategory: {$in: doc.jsParentCategory}});
      } else {
        instance.jsParentCategory.set({});
      }    
      if (doc.jsSubSpecialization){
        instance.jsSubSpecialization.set({subSpecialization: {$in: doc.jsSubSpecialization}});
      } else {
        instance.jsSubSpecialization.set({});
      }
      
      if (doc.jsListedIndustry){
        console.log(doc.jsListedIndustry);
        instance.jsListedIndustry.set({listedIndustry: {$in: doc.jsListedIndustry}});
      } else {
        instance.jsListedIndustry.set({});
      } 

      if (doc.jsListedRole){
        instance.jsListedRole.set({listedRole: {$in: doc.jsListedRole}});
      } else {
        instance.jsListedRole.set({});
      } 
      if (doc.jsAltIndustry){
        instance.jsAltIndustry.set({companySnapIndustry: {$in: doc.jsAltIndustry}});
      }  else {
        instance.jsAltIndustry.set({});
      }    
      if (doc.jsExperience){
        instance.jsExperience.set({experience: {$in: doc.jsExperience}});
      } else {
        instance.jsExperience.set({});
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

