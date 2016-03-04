Package.describe({
  name: 'app-root',
  summary: 'Base configuration for application, dependency manager.',
  version: '0.0.1'
});

Npm.depends({
  'feedparser': '1.0.0',
  'to-markdown': '0.0.2',
  'he': '0.5.0',
  'striptags': '2.1.1',
  'iconv-lite': '0.4.7'
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  var packages = [
    'meteor-platform',  
    'app-lib',
    'lfergon:exportcsv',
    'nefiltari:yaki',
    'anonyfox:scrape'
  ];

  api.use(packages);

  api.imply(packages);

  // api.addFiles([
  //   'lib/model.js'
  // ], ['client', 'server']);

  api.addFiles([
    // 'lib/server/cron.js',
    'lib/server/fetch_sources.js',
    // 'lib/server/publications.js',
    // 'lib/server/server.js'
  ], ['server']);

  api.export([
    // 'Sources',
    // 'SourceItems',
    // 'Categories'
  ]);

});
