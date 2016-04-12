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
    
    this.route('job_street_sources', {
      path: '/sources/jobstreet',
      template:'job_street_sources',
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
    this.route('data_item', {
      path: '/data/monster/:_id',
      template:'data_item',
      waitOn: function() {
        Meteor.subscribe('SourceItems');
      },
      data: function () {
        return SourceItems.findOne({_id: this.params._id});
      }
    });
    this.route('job_street_data', {
      path: '/data/jobstreet',
      template:'job_street_data',
      waitOn: function() {
        Meteor.subscribe('JobSteetItems');
      },
      data: function () {
        return JobStreetItems.find().fetch();
      }
    });

    this.route('combined_data', {
      path: '/data/combined',
      template:'combined_data'
      // waitOn: function() {
      //   Meteor.subscribe('JobSteetItems');
      // },
      // data: function () {
      //   return JobStreetItems.find().fetch();
      // }
    });

    this.route('job_street_data_item', {
      path: '/data/jobstreet/:_id',
      template:'job_street_data_item',
      waitOn: function() {
        Meteor.subscribe('JobSteetItems');
      },
      data: function () {
        return JobSteetItems.findOne({_id: this.params._id});
      }
    });
    this.route('about', {
      path: '/about',
      template:'about'
    });
    this.route('export', {
      path: '/export',
      template:'export'
    });
    this.route('new_monster_source', {
      path: '/new-monster-source',
      template:'new_monster_source'
    });
    this.route('new_jobstreet_source', {
      path: '/new-jobstreet-source',
      template:'new_jobstreet_source'
    });
    this.route('upload', {
      path: '/utilities/upload-csv',
      template:'upload'
    });
  });
});