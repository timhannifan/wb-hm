 var check_status='';
 //Reactive Var Initialization
 Template.testReactive.onCreated(function (){
       check_status1=new ReactiveVar({});
       check_status2=new ReactiveVar({});
       check_status3=new ReactiveVar({});
       Tracker.autorun(function () {
         console.log(check_status1.get());
       });
 });

 Template.testReactive.helpers({
       // showData : function(){
       //     return Collection.find({$and : [{check_status1.get(),check_status2.get(),check_status3.get()}]}).fetch();
       // }
 });

 Template.testReactive.events({
      "change #checkbox1" : function(event, template) {
        console.log(event.currentTarget);
            // if($(event.currentTarget).is(":checked").val())
              check_status1.set({field1: 'data1'});
            // else
               // check_status1.set({});
       },
       "change #checkbox2" : function(event) {
            if($(event.currentTarget).is(":checked").val())
              check_status2.set({field2: 'data2'});
            else
               check_status2.set({});
       },
       "change #checkbox3" :function(event) {
            if($(event.currentTarget).is(":checked").val())
               check_status3.set({field3: 'data2'});
            else
               check_status3.set({});
       },
 });