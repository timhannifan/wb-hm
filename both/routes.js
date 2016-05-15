Meteor.startup(function () {

  console.log('/////configuring router/////');

  Router.configure({
    layoutTemplate: 'app_layout',
    loadingTemplate: 'loading',
    not_foundTemplate: 'notFound',
    action: function () {
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    }
  });

  Router.map(function(){
    this.route('home', {
      path: '/',
      template:'home'
    });
    
    this.route('monster_sources', {
      path: '/sources/monster',
      template:'monster_sources',
      waitOn: function() {
        Meteor.subscribe('MonsterSources');
      },
      data: function () {
        return MonsterSources.find().fetch();
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
        Meteor.subscribe('MonsterItems');
      },
      data: function () {
        return MonsterItems.find().fetch();
      }
    });
    this.route('data_item', {
      path: '/data/monster/:_id',
      template:'data_item',
      waitOn: function() {
        Meteor.subscribe('MonsterItems');
      },
      data: function () {
        return MonsterItems.findOne({_id: this.params._id});
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
    this.route('exportNew', {
      path: '/export',
      template:'exportNew'
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
    this.route('mascoFour', {
      path: '/masco-4',
      template:'mascoFour',
      waitOn: function() {
        return Meteor.subscribe('MascoFour');
      }
    });
    this.route('mascoFive', {
      path: 'masco-5',
      template:'mascoFive',
      waitOn: function() {
        return Meteor.subscribe('MascoFive');
      }
    });
    this.route('mascoKey', {
      path: '/masco-key',
      template:'mascoKey',
      waitOn: function() {
        return Meteor.subscribe('MascoKey');
      }
    });
  });

  if (Meteor.isClient) {

    // Route-related helpers
    Template.registerHelper("absoluteUrl", function(path) {
      return Meteor.absoluteUrl(path);
    });

    Template.registerHelper("currentRouteIs", function(name) {
      var current = Router.current();
      return current && current.route && current.route.name === name || false;
    });

    Template.registerHelper("activeRoute", function(name) {
      var current = Router.current();
      return current && current.route && current.route.name === name && "active" || "";
    });

  }

});