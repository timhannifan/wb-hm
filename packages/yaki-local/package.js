Package.describe({
  name: 'yaki-local',
  version: '0.1.81',
  summary: 'Yaki can capture relevant tags from any bunch of text.',
  git: 'https://github.com/nefiltari/yaki.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['coffeescript','underscore'],['client', 'server']);
  api.addFiles(
    ['stopwords/stopwords.coffee.md'
  ],['client','server'])
  api.addFiles([
    'stopwords/stopwords_de.coffee',
    'stopwords/stopwords_en.coffee'
  ],['server'])  
  api.addFiles([
	  'lib/vocabulary.coffee.md',
    'lib/configuration.coffee.md',
	  'lib/yaki.coffee.md',
    'globals.js'
  ],['client', 'server']);

  api.export('Yaki', ['client', 'server'])
});

Package.onTest(function(api) {
  api.use(['tinytest','coffeescript','underscore'],['client', 'server']);
  api.use('nefiltari:yaki',['client', 'server']);
  api.addFiles('test.coffee.md', ['client','server']);
});