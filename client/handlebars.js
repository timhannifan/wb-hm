UI.registerHelper('formatDate', function(context, options) {
  if(context)
    return moment(context).format("dddd, MMMM Do YYYY, h:mm:ss a");
});

UI.registerHelper('formatShortDate', function(context, options) {
  if(context)
    return moment(context).format("DD-MMMM-YYYY");
});

UI.registerHelper('relativeTime', function(context, options) {
  if(context)
    return moment(context).fromNow();
});


UI.registerHelper('truncateText', function(string) {
  if(string)
    return string.substr(0,25)+ (string.length > 25 ? "..." : "");
});

UI.registerHelper("absoluteUrl", function(path) {
  return Meteor.absoluteUrl(path);
});

UI.registerHelper("currentRouteIs", function(name) {
  var current = Router.current();
  return current && current.route && current.route.name === name || false;
});

UI.registerHelper("activeRoute", function(name) {
  var current = Router.current();
  return current && current.route && current.route.name === name && "active" || "";
});
