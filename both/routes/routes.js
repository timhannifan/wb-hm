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
    },
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        // 
        GlobalUI.showModal({template: "atForm", dialogFullOnMobile: true});
        this.render('accessDenied');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
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
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('MonsterSources')
        ];
      },
      // action: function (){
      //   if (this.ready()) {
      //     this.render();
      //   } else {
      //     this.render('Loading');
      //   }
      // } 
    });
    
    this.route('job_street_sources', {
      path: '/sources/jobstreet',
      template:'job_street_sources',
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('JobStreetSources')
        ];
      },
      // action: function (){
      //   if (this.ready()) {
      //     this.render();
      //   } else {
      //     this.render('Loading');
      //   }
      // }      
    });

    this.route('monsterData', {
      path: '/data/monster',
      template:'monsterData',
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('MonsterItems')
        ];
      },
      action: function (){
        if (this.ready()) {
          this.render();
        } else {
          this.render('Loading');
        }
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
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('JobStreetSources'),
          Meteor.subscribe('JobStreetItemsLimited')
        ];
      },
      action: function (){
        if (this.ready()) {
          this.render();
        } else {
          this.render('Loading');
        }
      }
    });
    
    this.route('job_street_data_item', {
      path: '/data/jobstreet/:_id',
      template:'job_street_data_item',
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('JobStreetItemsById', this.params._id)
        ];
      },
      action: function (){
        if (this.ready()) {
          this.render();
        } else {
          this.render('Loading');
        }
      },
      data: function () {
        return JobStreetItems.findOne({_id: this.params._id});
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
    this.route('skillsList', {
      path: '/skills/list',
      template:'skillsList',
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('skillsList')
        ];
      },
      action: function (){
        if (this.ready()) {
          this.render();
        } else {
          this.render('Loading');
        }
      }
    });

    this.route('skills', {
      path: '/skills',
      template:'skills',
      subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
          Meteor.subscribe('skills')
        ];
      },
      action: function (){
        if (this.ready()) {
          this.render();
        } else {
          this.render('Loading');
        }
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