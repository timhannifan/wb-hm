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
      path: '/sources',
      template:'sources',
      waitOn: function() {
        Meteor.subscribe('Sources');
      },
      data: function () {
        return Sources.find().fetch();
      }
    });

    this.route('data', {
      path: '/data',
      template:'data',
      waitOn: function() {
        Meteor.subscribe('SourceItems');
      },
      data: function () {
        return SourceItems.find().fetch();
      }
    });
    this.route('dataItem', {
      path: '/data/:_id',
      template:'dataItem',
      waitOn: function() {
        Meteor.subscribe('SourceItems');
      },
      data: function () {
        return SourceItems.findOne({_id: this.params._id});
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
    this.route('download', {
      path: '/download',
      template:'download'
    });
  });
});