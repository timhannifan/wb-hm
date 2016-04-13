
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.MonsterItems = new Tabular.Table({
name: "Monster Data",
collection: MonsterItems,
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
    data: "sourceCategory", 
    title: "Industry", 
    class: "flex-1"
  },
  {data: "company", title: "Company", class: "flex-1"},
  {data: "qualification", title: "Qualifications", class: "flex-1"},
  {data: "experience", title: "Experience", class: "flex-1"},
  {data: "location", title: "Location", class: "flex-1"},
],

});



TabularTables.JobStreetItems = new Tabular.Table({
name: "JobStreet Data",
collection: JobStreetItems,
responsive: true,
autoWidth: false,
columns: [
  {data: "title", title: "Title", class: "flex-1"},
  {data: "company", title: "Company", class: "flex-1"},
  {data: "experience", title: "Experience", class: "flex-1"},
  {data: "location", title: "Location", class: "flex-1"},
  {data: "sourceCategory", title: "Category", class: "flex-1"},
  {data: "sourceSpecialization", title: "Specialization", class: "flex-1"}
  // {data: "url", title: "URL", class: "flex-1"},
],

});