Package.describe({
  name: 'machine',
  summary: 'text classification wiht mimir and brain',
  version: '0.0.1',
  documentation: null
});

Npm.depends({
  "brain": "0.7.0",
  "mimir": "0.0.1",
  "node-svm": "2.1.5"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  var packages = [
    'meteor-platform'
  ];
  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/machine.html',
    'lib/machine.js'
  ], ['server']);

  //api.export('mimir');
  //api.export('brain');

});
