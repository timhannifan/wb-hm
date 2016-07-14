Package.describe({
  name: 'natural',
  summary: 'Meteor wrapper for node-natural',
  version: '0.0.1',
  documentation: null
});

Npm.depends({
  'natural': '0.4.0'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  var packages = [
    'meteor-platform',  
  ];
  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'server/test.js'
  ], ['server']);

  // api.export('cheerio');
  api.export('natural');
  api.export('MeteorNatural');
});
