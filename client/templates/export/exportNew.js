Template.exportNew.events({
  'click #methodExportMonsterItems': function () {
    console.log('Exporting Monster data...');
    MyAppExporter.methodExportMonsterItems();    
  },
  'click .export-data': function ( event, template ) {
    // $( event.target ).button( 'loading' );

    // let data = Modules.client.getCollectionData();
    let options = {};
    options.limit = 1000;
    options.skip = 0;

    Meteor.call( 'exportData', options , ( error, response ) => {
      if ( error ) {
        GlobalUI.toast.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, 'archive.zip' );
          // $( event.target ).button( 'reset' );
        }
      }
    });
  },
  'click .export-data-query': function ( event, template ) {
    let query = {
                  title:{
                    $ne: null
                  }
                };

    let filter = {
      // fields: {},
      // sort: {}
    };

    Meteor.call( 'exportDataQuery', query, filter , ( error, response ) => {
      if ( error ) {
        GlobalUI.toast.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          console.log('received a resonse');
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, 'dataQuery.zip' );
        }
      }
    });
  },
  'click .export-data-sync': function ( event, template ) {
    let options = {};
    options.limit = 10000;
    options.skip = 0;

    Meteor.call( 'exportDataSync', options , ( error, response ) => {
      if ( error ) {
        GlobalUI.toast.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          console.log('received a resonse');
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, 'archiveSynch.zip' );
        }
      }
    });
  },
  'click .export-data-sync-limit': function ( event, template ) {
    var el = $(event.target);
    console.log(el);
    // console.log(el[0].attributes['data-start'].value);
    // console.log(el[0].attributes['data-end'].value);

    var start = el[0].attributes['data-start'].value;
    var end = el[0].attributes['data-end'].value;

    // console.log(event.target);
    let options = {
      limit: 5000,
      skip: Number(start)
    };


    Meteor.call( 'exportDataSync', options , ( error, response ) => {
      if ( error ) {
        GlobalUI.toast.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          console.log('received a resonse');
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, 'archiveSynch.zip' );
        }
      }
    });
  },
  'click .export-data-zip': function ( event, template ) {

    Meteor.call( 'exportBigZip', ( error, response ) => {
      if ( error ) {
        GlobalUI.toast.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          console.log('received a resonse');
          let blob = Modules.client.convertBase64ToBlob( response );
          saveAs( blob, 'exportBigZip.zip' );
        }
      }
    });
  }  
});

Template.exportNew.onCreated( () => {
  let template = Template.instance();
  
  template.subscribe('jobstreetItemIds');
  template.subscribe('monsterItemIds');
});

Template.exportNew.onRendered( () => {
  $( '.datetimepicker' ).datetimepicker({
    timeZone: 'America/Chicago',
    useCurrent: true
  });
});

Template.exportNew.helpers({
  items: function () {
    return JobStreetItems.find().fetch();
  },
  numberOfItems: function (){
    return JobStreetItems.find().count();
  },
  numberMonsterItems: function (){
    return MonsterItems.find().count();
  },
  sets: function(){
    var count = JobStreetItems.find().count();
    var res = [],
    counter = 0,
    listCount = 1;

    while (counter <= count) {
      res.push({start: counter, end: counter + 5000, listCount: listCount});
      listCount += 1;
      counter += 5000;
      // console.log(counter);
    }

    return res;
  }
});

Template.exportNew.events({
  // 'submit form': function ( event, template ) {
  //   event.preventDefault();

  //   let picker   = $( '.datetimepicker' ),
  //       dateTime = picker.data( 'DateTimePicker' ).date();

  //   if ( dateTime ) {
  //     let appointment = dateTime.format();

  //     console.log(appointment);

  //   } else {
  //     GlobalUI.toast.alert( 'Make sure to pick an appointment time!', 'danger' );
  //   }
  // }
});