UI.registerHelper('formatDate', function(context, options) {
  if(context)
    return moment(context).format("dddd, MMMM Do YYYY, h:mm:ss a");
});