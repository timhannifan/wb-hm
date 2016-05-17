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
  'click .gen-zip' ( event, template ) {
    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

    Meteor.apply( 'generateZip',[],{wait: true}, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          let blob = Modules.client.convertBase64ToBlob( response );
          
          var id = Collections.Files.insert(blob);

          
          saveAs( blob, `${fileName}.zip` );
        }
      }
    });
  },
  'click .export-data' ( event, template ) {
    console.log('clicked');

    let name        = 'download_',
      date    = new Date(),
      fileName    = `${name} ${date}`;

      Meteor.call( 'exportData',10,2, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'warning' );
        } else {
          if ( response ) {
            let blob = Modules.client.convertBase64ToBlob( response );
            saveAs( blob, `${fileName}.zip` );
          }
        }
      });
    // Meteor.apply( 'exportData',[{limit: 10, skip: 1}],{wait: true}, ( error, response ) => {
    //   if ( error ) {
    //     Bert.alert( error.reason, 'warning' );
    //   } else {
    //     if ( response ) {
    //       let blob = Modules.client.convertBase64ToBlob( response );
    //       saveAs( blob, `${fileName}.zip` );
    //     }
    //   }
    // });
  }  
});
