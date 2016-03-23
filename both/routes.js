Meteor.startup(function () {

  console.log('/////configuring router/////');

  Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading',
    not_foundTemplate: 'notFound'
    // autoRender: true,
    // autoStart: false
    // waitOn: function () {this.next();},
  });

  Router.map(function(){
    this.route('home', {
      path: '/',
      template:'home'
    });
    
    this.route('sources', {
      path: '/sources/monster',
      template:'sources',
      waitOn: function() {
        Meteor.subscribe('Sources');
      },
      data: function () {
        return Sources.find().fetch();
      }
    });
    
    this.route('jobStreetSources', {
      path: '/sources/jobstreet',
      template:'jobStreetSources',
      waitOn: function() {
        Meteor.subscribe('JobStreetSources');
      },
      data: function () {
        return JobStreetSources.find().fetch();
      }
    });

    this.route('data', {
      path: '/data/monster',
      template:'data',
      waitOn: function() {
        Meteor.subscribe('SourceItems');
      },
      data: function () {
        return SourceItems.find().fetch();
      }
    });
    this.route('dataItem', {
      path: '/data/monster/:_id',
      template:'dataItem',
      waitOn: function() {
        Meteor.subscribe('SourceItems');
      },
      data: function () {
        return SourceItems.findOne({_id: this.params._id});
      }
    });
    this.route('jobStreetData', {
      path: '/data/jobstreet',
      template:'jobStreetData',
      waitOn: function() {
        Meteor.subscribe('JobSteetItems');
      },
      data: function () {
        return JobStreetItems.find().fetch();
      }
    });
    this.route('jobStreetDataItem', {
      path: '/data/jobstreet/:_id',
      template:'jobStreetData',
      waitOn: function() {
        Meteor.subscribe('JobSteetItems');
      },
      data: function () {
        return JobSteetItems.findOne({_id: this.params._id});
      }
    });

    this.route('graph', {
      path: '/graph',
      template:'graph'
    });
    this.route('map', {
      path: '/map',
      template:'map'
    });
    this.route('about', {
      path: '/about',
      template:'about'
    });
    this.route('export', {
      path: '/export',
      template:'export'
    });
    this.route('import', {
      path: '/import',
      template:'import'
    });
    this.route('newMonsterSource', {
      path: '/new-rss-feed',
      template:'newMonsterSource'
    });
    this.route('newJobstreetSource', {
      path: '/new-web-target',
      template:'newJobstreetSource'
    });
  });
});