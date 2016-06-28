Meteor.startup(function(){
	Modules.server.startup();

	Inject.rawModHtml('addUnresolved',function(html){
	  return html = html.replace('<body>', '<body unresolved>');
	});

	SyncedCron.start();
});
