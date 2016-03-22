
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.SourceItems = new Tabular.Table({
name: "SourceItem Data",
collection: SourceItems,
responsive: true,
autoWidth: false,
columns: [
  {
    tmpl: Meteor.isClient && Template.tabTitle,
    data: "title",
    title: "Title", 
    class: "flex-2"
  },
  {
    data: "sourceCategories", 
    title: "Categories", 
    class: "flex-1"
  },
  {data: "company", title: "Company", class: "flex-1"},
  {data: "qualification", title: "Qualifications", class: "flex-1"},
  {data: "experience", title: "Experience", class: "flex-1"},
  {data: "location", title: "Location", class: "flex-1"},
],

});



TabularTables.JobStreetItems = new Tabular.Table({
name: "JobStreet Job Data",
collection: JobStreetItems,
responsive: true,
autoWidth: false,
columns: [
  {
    tmpl: Meteor.isClient && Template.jobStreetTabTitle,
    data: "title",
    title: "Title", 
    class: "flex-2"
  },
  // {
  //   data: "sourceCategories", 
  //   title: "Categories", 
  //   class: "flex-1"
  // },
  {data: "company", title: "Company", class: "flex-1"},
  {data: "experience", title: "Experience", class: "flex-1"},
  {data: "location", title: "Location", class: "flex-1"},
  {data: "url", title: "URL", class: "flex-1"},
],

});