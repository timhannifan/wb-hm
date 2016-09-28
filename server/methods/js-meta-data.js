function _runJobStreetMeta(){
  let parentCats = JobStreetItems.find( {}, { fields: { parentCategory: 1 }} );
  if ( parentCats ) {
    var uniques = _.uniq( parentCats.map( ( item ) => {
      return item.parentCategory;
    }), true );


    _.each(uniques, function(value, key, list){
    
      JobStreetMeta.upsert({
        // type:'parentCategory',
        name: value
      },{$set: {
        type: 'parentCategory',
        parent: null,
        name: value,
        lastUpdate: new Date()
      }});
    
    });

  };
  let subSpecs = JobStreetItems.find( {}, { fields: { subSpecialization: 1, parentCategory: 1 }} );
  if ( subSpecs ) {
    var uniques = _.uniq( subSpecs.map( ( item ) => {
      return {
        parent: item.parentCategory,
        subSpec: item.subSpecialization
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
      
        JobStreetMeta.upsert({
          name: value.subSpec
        },{$set: {
          type: 'subSpecialization',
          parent: value.parent,
          name: value.subSpec,
          lastUpdate: new Date()
        }});
      
      });      
    }



  };

  let listedSpecs = JobStreetItems.find( {}, { fields: { listedSpec:1}} );
  if ( listedSpecs ) {
    var uniques = _.uniq( listedSpecs.map( ( item ) => {
      return {
        listedSpec: item.listedSpec
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.listedSpec != null){
          JobStreetMeta.upsert({
            name: value.listedSpec
          },{$set: {
            name: value.listedSpec,
            type: 'listedSpec',
            parent: null,
            lastUpdate: new Date()
          }});        
        }
      });
    }    
  };

  let companySnapInds = JobStreetItems.find( {}, { fields: { companySnapIndustry:1}} );
  if ( companySnapInds ) {
    var uniques = _.uniq( companySnapInds.map( ( item ) => {
      return {
        companySnapIndustry: item.companySnapIndustry
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.companySnapIndustry != null){
          JobStreetMeta.upsert({
            name: value.companySnapIndustry
          },{$set: {
            name: value.companySnapIndustry,
            type: 'companySnapIndustry',
            parent: null,
            lastUpdate: new Date()
          }});        
        }

      
      });
    }
  };
  
  let listedInds = JobStreetItems.find( {}, { fields: { listedIndustry:1}} );
  if ( listedInds ) {
    var uniques = _.uniq( listedInds.map( ( item ) => {
      return {
        listedIndustry: item.listedIndustry
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.listedIndustry != null){
          JobStreetMeta.upsert({
            name: value.listedIndustry
          },{$set: {
            name: value.listedIndustry,
            type: 'listedIndustry',
            parent: null,
            lastUpdate: new Date()
          }});        
        }
      });
    }
  };

};
function _runJobStreetMetaRoles(){
  let listedRoles = JobStreetItems.find( {}, { fields: { listedRole:1}} );
  if ( listedRoles ) {
    var uniques = _.uniq( listedRoles.map( ( item ) => {
      return {
        listedRole: item.listedRole
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.listedRole != null){
          JobStreetMeta.upsert({
            name: value.listedRole
          },{$set: {
            name: value.listedRole,
            type: 'listedRole',
            parent: null,
            lastUpdate: new Date()
          }});        
        }

      
      });
    }
  };
}  
function _runJobStreetMetaExperience(){
  let experiences = JobStreetItems.find( {}, { fields: { experience:1}} );
  if ( experiences ) {
    var uniques = _.uniq( experiences.map( ( item ) => {
      return {
        experience: item.experience
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.experience != null){
          JobStreetMeta.upsert({
            name: value.experience
          },{$set: {
            name: value.experience,
            type: 'experience',
            parent: null,
            lastUpdate: new Date()
          }});        
        }
      });
    }
  };
};
function _runJobStreetMetaLocation(){
  let locations = JobStreetItems.find( {}, { fields: { location:1}} );
  if ( locations ) {
    var uniques = _.uniq( locations.map( ( item ) => {
      return {
        location: item.location
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.location != null){
          JobStreetMeta.upsert({
            name: value.location
          },{$set: {
            name: value.location,
            type: 'location',
            parent: null,
            lastUpdate: new Date()
          }});        
        }
      });
    }
  };
};


Meteor.methods({
  runJobStreetMeta(){
    if (this.userId) {
      return _runJobStreetMeta();
    }
  },
  runJobStreetMetaRoles(){
    if (this.userId) {
      return _runJobStreetMetaRoles();
    }
  },
  runJobStreetMetaExperience(){
    if (this.userId) {
      return _runJobStreetMetaExperience();
    }
  },
  runJobStreetMetaLocation(){
    if (this.userId) {
      return _runJobStreetMetaLocation();
    }
  }
});