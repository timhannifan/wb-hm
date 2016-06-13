Meteor.startup(function () {

  SubManager = new SubsManager();


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
        GlobalUI.showModal({template: "atForm", dialogFullOnMobile: true});
        this.render('accessDenied');
      } else {
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
        return [
          Meteor.subscribe('MonsterSources')
        ];
      },
    });
    
    this.route('job_street_sources', {
      path: '/sources/jobstreet',
      template:'job_street_sources',
      subscriptions: function() {
        return [
          Meteor.subscribe('JobStreetSources')
        ];
      }     
    });

    this.route('monsterData', {
      path: '/data/monster',
      template:'monsterData',
      subscriptions: function() {
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
        return [
          Meteor.subscribe('JobStreetItemsById', this.params._id)
        ];
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
  });

  Router.route('skillsList', {
    path: '/skills/list',
    template:'skillsList',
    subscriptions: function() {
      return [
        Meteor.subscribe('skillsList')
      ];
    }
  });
  Router.route('keywordMatchList', {
    path: '/skills/keyword-matches/:_id',
    template:'keywordMatchList',
    action: function (){
      if (this.ready()) {
        this.render();
      } else {
        this.render('Loading');
      }
    },
    subscriptions: function () {
      return [
        Meteor.subscribe('keywordMatchList', this.params._id),
        Meteor.subscribe( 'JobStreetTrackedSkills',this.params._id)
      ];
    },
    data: function () {
      return [
        Skills.findOne({_id: this.params._id})
        , JobStreetItems.find()
      ];
    }
  });

  Router.route('itemViewByKeyword', {
    path: '/skills/list/view/:_id',
    template:'itemViewByKeyword',
    subscriptions: function() {
      return [
        Meteor.subscribe('JobStreetItemsById', this.params._id)
      ];
    },
    data: function () {
      return JobStreetItems.findOne({_id: this.params._id});
    },
    action: function () {
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    },
  });

  Router.route('skills', {
    path: '/skills/summary',
    template:'skills'
  });

  Router.route('loading', {
    path: '/loading',
    template:'loading'
  });
});