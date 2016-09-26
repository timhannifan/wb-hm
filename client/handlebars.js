UI.registerHelper('formatDate', function(context, options) {
  if(context)
    return moment(context).format("dddd, MMMM Do YYYY, h:mm:ss a");
});
UI.registerHelper('formatTimeDate', function(context, options) {
  if(context)
    return moment(context).format("MMMM DD YYYY, h:mm a");
});

UI.registerHelper('formatShortDate', function(context, options) {
  if(context)
    return moment(context).format("DD-MMM-YY");
});

UI.registerHelper('relativeTime', function(context, options) {
  if(context)
    return moment(context).fromNow();
});


UI.registerHelper('truncateText', function(string) {
  if(string)
    return string.substr(0,20)+ (string.length > 25 ? "..." : "");
});

UI.registerHelper('truncateTextShort', function(string) {
  if(string)
    return string.substr(0,5)+'...';// (string.length > 25 ? "..." : "");
});
UI.registerHelper('truncateTextLong', function(string) {
  if(string)
     return string.substr(0,45) + (string.length > 45 ? "..." : "");
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
