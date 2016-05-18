Template.registerHelper('log', function () {
  console.log(this, arguments);
});

Meteor.subscribe("files");

Template.exportNew.created = function () {
  this.filename = new ReactiveVar('');
};

// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.exportNew.events({
    'change input.any': FS.EventHandlers.insertFiles(Collections.Files, {
      metadata: function (fileObj) {
        return {
          // owner: Meteor.userId(),
          foo: "bar",
          dropped: false
        };
      },
      after: function (error, fileObj) {
        if (!error) {
          console.log("Inserted", fileObj.name());
        }
      }
    }),
    'keyup .filename': function () {
      var ins = Template.instance();
      if (ins) {
        ins.filename.set($('.filename').val());
      }
    }
  });

});

Template.exportNew.helpers({
  uploadedFiles: function() {
    return Collections.Files.find();
  }
});


Template.exportNew.events({
   "click #methodExportMonsterItems": function() {
     console.log('clicked methodExportMonsterItems');
     MyAppExporter.methodExportMonsterItems();
   },
  'click .export-data-1' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      counter = 0,
      start = 0,
      limit = 500,
      fileName    = name + counter;

      Meteor.apply( 'exportData',[limit, start],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
      counter+=1;
      start+=limit;
      Meteor.apply( 'exportData',[limit, start],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
      start+=limit;
      Meteor.apply( 'exportData',[limit, start],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
      start+=limit;
      Meteor.apply( 'exportData',[limit, start],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },
  'click .export-data-2' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.apply( 'exportData',[500, 5000],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },
  'click .export-data-3' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.apply( 'exportData',[500, 10000],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },
  'click .export-data-4' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.apply( 'exportData',[500, 15000],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },
  'click .export-data-5' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.apply( 'exportData',[500, 20000],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },
  'click .export-data-6' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.apply( 'exportData',[500, 25000],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },
  'click .export-data-7' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.apply( 'exportData',[500, 30000],{wait: true}, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            console.log('response received.');
            // console.log(response);
            
            saveAs( Modules.client.convertBase64ToBlob( response ), `${fileName}.zip` );  
            
          }
        }
      });
  },        
});
