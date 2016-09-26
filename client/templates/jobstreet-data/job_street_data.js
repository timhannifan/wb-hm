
Template.job_street_data.onCreated( () => {

  let initialStart=moment().subtract(1000*3600*24*1).toDate();
  let today = new Date();
  
  this.startDate=new ReactiveVar({createdAt: {$gte: initialStart}});
  this.endDate=new ReactiveVar({createdAt: {$lte: today}});
  this.jsParentCategory=new ReactiveVar({});
  this.jsSubSpecialization=new ReactiveVar({});
  this.jsListedIndustry=new ReactiveVar({});
  this.jsListedSpec=new ReactiveVar({});
  this.jsListedRole=new ReactiveVar({});
  this.jsAltIndustry=new ReactiveVar({});
  this.jsExperience=new ReactiveVar({});
  // this.titleFilter=new ReactiveVar({ title: {$ne: null}});
  this.fields = new ReactiveVar({
      title: 1,
      company: 1,
      experience: 1,
      companySnapIndustry: 1,
      parentCategory: 1,
      subSpecialization: 1,
      listedSpec: 1,
      listedRole: 1,
      listedIndustry: 1,
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
          jsParentCategory.get(),
          jsSubSpecialization.get(),
          jsListedIndustry.get(),
          jsListedSpec.get(),
          jsListedRole.get(),
          jsAltIndustry.get(),
          jsExperience.get()
        ] 
  };
  let passedM = { 
		limit: this.templateLimit.get(),
    fields: this.fields.get()
  };

  console.log(passedQ);
  console.log(passedM);


  Tracker.autorun(function () {
    Meteor.subscribe('JobStreetMeta');
    Meteor.subscribe('jobStreetQuery', passedQ);
  });

});

Template.job_street_data.helpers({
  tableItems() {
    let data = JobStreetItems.find(
      {
        $and : [
          startDate.get(),
          endDate.get(),
          jsParentCategory.get(),
          jsSubSpecialization.get(),
          jsListedIndustry.get(),
          jsListedSpec.get(),
          jsListedRole.get(),
          jsAltIndustry.get(),
          jsExperience.get()
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

Template.job_street_data.events({
  'change #jsFilterForm': function (event, template) {
    GlobalUI.toast( 'Updating table....');
    var form = AutoForm.getFormValues('jsFilterForm'),
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
    if (doc.jsParentCategory){
      jsParentCategory.set({parentCategory: {$in: doc.jsParentCategory}});
    } else {
      jsParentCategory.set({});
    }    
    if (doc.jsSubSpecialization){
      jsSubSpecialization.set({subSpecialization: {$in: doc.jsSubSpecialization}});
    } else {
      jsSubSpecialization.set({});
    } 
    if (doc.jsListedIndustry){
      jsListedIndustry.set({listedIndustry: {$in: doc.jsListedIndustry}});
    } else {
      jsListedIndustry.set({});
    } 
    if (doc.jsListedSpec){
      jsListedSpec.set({listedSpec: {$in: doc.jsListedSpec}});
    } else {
      jsListedSpec.set({});
    } 
    if (doc.jsListedRole){
      jsListedRole.set({listedRole: {$in: doc.jsListedRole}});
    } else {
      jsListedRole.set({});
    } 
    if (doc.jsAltIndustry){
      jsAltIndustry.set({companySnapIndustry: {$in: doc.jsAltIndustry}});
    }  else {
      jsAltIndustry.set({});
    }    
    if (doc.jsExperience){
      jsExperience.set({experience: {$in: doc.jsExperience}});
    } else {
      jsExperience.set({});
    } 
  },
  'click .js-load-more': function (event, template) {
  	const current = templateLimit.get();
  	increaseLimit(current,50);
  }  
});

