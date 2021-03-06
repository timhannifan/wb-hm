Package.describe({
  name: 'fetch-local',
  summary: 'Base configuration for application, dependency manager.',
  version: '0.0.1'
});

Npm.depends({
  'feedparser': '1.0.0',
  'to-markdown': '0.0.2',
  'he': '0.5.0',
  'striptags': '2.1.1',
  'iconv-lite': '0.4.7',
  'cheerio': '0.20.0',
  'babyparse': '0.4.5'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  var packages = [
    'meteor-platform',  
    'yaki-local',
    'http',
    'percolatestudio:synced-cron'
  ];
  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/server/monster.js',
    'lib/server/jobstreet.js',
  ], ['server']);

  api.export('cheerio');
  api.export('Baby');

});
