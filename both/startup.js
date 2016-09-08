Meteor.startup( () => Modules.both.startup() );

var mySubmitFunc = function(error, state){
  if (!error) {
    this.render('home');
  }
};

Router.configure({
    layoutTemplate: 'app_layout',
    loadingTemplate: 'loading',
    not_foundTemplate: 'notFound'
});

AccountsTemplates.configure({
    defaultLayout: 'app_layout',
    // onSubmitHook: mySubmitFunc
});

AccountsTemplates.configureRoute('signIn', {
  name: 'login',
  path: '/login',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'register',
  path: '/register',
});

Router.route('/', {
  name: 'home'
});
Router.route('/skills-data', {
	name: 'skillsData'
});
Router.route('/skills-db', {
	name: 'skillsDb'
});

Router.map(function(){
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
        this.render('loading');
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
        Meteor.subscribe('JobStreetItemsLimited', 100,0)
      ];
    },
    action: function (){
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
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

  this.route('new_monster_source', {
    path: '/new-monster-source',
    template:'new_monster_source'
  });
  this.route('new_jobstreet_source', {
    path: '/new-jobstreet-source',
    template:'new_jobstreet_source'
  });
});
Router.route('keywordMatchList', {
  path: '/skills/keyword-matches/:_id',
  template:'keywordMatchList',
  action: function (){
    if (this.ready()) {
      this.render();
    } else {
      this.render('loading');
    }
  },
  subscriptions: function () {
    return [
      Meteor.subscribe('keywordMatchList', this.params._id),
      Meteor.subscribe( 'JobStreetTrackedSkills',this.params._id),
      Meteor.subscribe('skills')
    ];
  },
  data: function () {
    return {
      skill: Skills.findOne({_id: this.params._id}),
      items: JobStreetItems.find()
    };
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

Router.route('export', {
  path: '/export',
  template: 'export'
});

Router.route('wordFrequency', {
  path: '/word-frequency'
});

Router.route('loading', {
  path: '/loading',
  template:'loading'
});

Router.plugin('ensureSignedIn', {
    except: ['login', 'register', 'loading']
});