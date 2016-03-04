
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.SourceItems = new Tabular.Table({
name: "SourceItem Data",
collection: SourceItems,
responsive: true,
autoWidth: false,
columns: [
  // {
  //   data: "_id",
  //   title: "ID", 
  //   class: "flex-1 link"
  // },
  // {
  //   data: "postedAt",
  //   title: "Created", 
  //   class: "flex-1",
  //   // render: function (val, type, doc) {
  //   //   if (val instanceof Date) {
  //   //     return moment(val).calendar();
  //   //   } else {
  //   //     return "Never";
  //   //   }
  //   // }
  // },
  {
    tmpl: Meteor.isClient && Template.tabTitle,
    data: "title",
    title: "Title", 
    class: "flex-2"
  },
  // {data: "url", title: "URL"},
  // {data: "sourceId", title: "Source _id"},
  {
    data: "sourceCategories", 
    title: "Categories", 
    class: "flex-1"
  },
  // {
  //   data: "parsedKeywords", 
  //   title: "Parsed Keywords", 
  //   class: "flex-1"
  // },
  {data: "company", title: "Company", class: "flex-1"},
  {data: "qualification", title: "Qualifications", class: "flex-1"},
  {data: "experience", title: "Experience", class: "flex-1"},
  {data: "location", title: "Location", class: "flex-1"},
  // {data: "bSortable", title: "sort", class: "flex-1"},
  // {
  //   tmpl: Meteor.isClient && Template.actionBtns, class: "flex-1"
  // }
],

});