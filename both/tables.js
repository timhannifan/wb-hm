
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

TabularTables.MascoFive = new Tabular.Table({
  name: "MascoFive",
  collection: MascoFive,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "id", title: "OfficialId", class: "flex-4"},
    {data: "cleanTitle", title: "Title", class: "flex-4"},
    {data: "titleTags", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.MascoFour = new Tabular.Table({
  name: "MascoFour",
  collection: MascoFour,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "id", title: "Masco4", class: "flex-4"},
    {data: "cleanTitle", title: "Title", class: "flex-4"},
    {data: "titleTags", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.MascoKey = new Tabular.Table({
  name: "MascoKey",
  collection: MascoKey,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "officialCode", title: "Masco4", class: "flex-4"},
    {data: "officialTitle", title: "Title", class: "flex-4"},
    {data: "keywords", title: "Keywords", class: "flex-4"}
  ]
});
