Package.describe({
  name: 'youiest:feed',
  version: '0.0.4',
  summary: ' for reactive network triggers with a simple ui',
  git: 'https://github.com/youiest/youiest-unionize.git',
  documentation: 'README.md'
});


Package.on_use(function (api) {
  api.versionsFrom('1.0.3.1');
  api.use([
    'templating',
    'deps',
    'tracker',
    'session',
    'pedrohenriquerls:reactjs',
    ], ['client', 'server']);
  api.add_files([
    'lib.js'
  ], ['client','server']);


  api.add_files([
    'templateFeed.html',
    'templateFeed.jsx',
    'client.js',
  ], ['client']);

  api.add_files([
    'server.js'
  ], ['server']);
});

Package.on_test(function (api) {
  // api.versionsFrom('1.0.3.1');
  api.use(
    [
      'underscore',
      'ground:db',
      'aldeed:console-me',
      'matb33:collection-hooks',
      'tracker', 
      'tinytest', 
      'test-helpers', 
      'coffeescript', 
      'insecure', 
      'accounts-base', 
      'accounts-password', 
      'underscore', 
      'random', 
      'pedrohenriquerls:reactjs',
      'mongo'
    ], 
    [
      'client', 
      'server'
    ]);

  api.export(["W","WI","Unionize"], ['client','server']);

  api.add_files([
    'lib.js'
  ], ['client','server']);

  api.add_files([
    'client.js'
  ], ['client']);

  api.add_files([
    'server.js'
  ], ['server']);

  api.add_files([
    'test.js'
  ], ['client','server']);   
});
