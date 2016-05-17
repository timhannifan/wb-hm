
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

  TabularTables.MonsterItems = new Tabular.Table({
  name: "Monster Data",
  collection: MonsterItems,
  responsive: true,
  autoWidth: false,
  scrollX: true,
  // select: true,
  dom: 'Blfrtip',
  "tableTools": {
      "sSwfPath": "/swf/copy_csv_xls_pdf.swf"
  },
  buttons: [ 'csv', 'excel', 'pdf' ],
  columns: [
    {
      // tmpl: Meteor.isClient && Template.tabTitle,
      data: "title",
      title: "Title", 
      class: ""
    },
    {
      data: "sourceCategory", 
      title: "Sector/Category", 
      class: ""
    },
    {data: "company", title: "Company", class: ""},
    {data: "qualification", title: "Qualifications", class: ""},
    {data: "experience", title: "Experience", class: ""},
    {data: "location", title: "Location", class: ""},
    {data: "createdAt", title: "Created", class: ""}
  ],

});



TabularTables.JobStreetItems = new Tabular.Table({
name: "JobStreet Data",
collection: JobStreetItems,
responsive: true,
autoWidth: false,
scrollX: true,
  columns: [
    {data: "title", title: "Title", class: ""},
    {data: "company", title: "Company", class: ""},
    {data: "experience", title: "Experience", class: ""},
    {data: "location", title: "Location", class: ""},
    {data: "location", title: "Location", class: ""},
    {data: "parentCategory", title: "JS Sector", class: ""},
    {data: "subSpecialization", title: "JS Specialization", class: ""},
    {data: "listedIndustry", title: "Alt Industry", class: ""},
    {data: "listedSpec", title: "Alt Specialization", class: ""},
    {data: "listedRole", title: "Role", class: ""},
    {data: "url", title: "URL", class: ""},
    {data: "datePosted", title: "Posted", class: ""},
    {data: "dateClosing", title: "Closing", class: ""},
    {data: "createdAt", title: "Created", class: ""}
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
