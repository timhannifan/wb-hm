function _runMonsterMeta(){
  let parentCats = MonsterItems.find( {}, { fields: { sourceCategory: 1 }} );
  if ( parentCats ) {
    var uniques = _.uniq( parentCats.map( ( item ) => {
      return item.sourceCategory;
    }), true );


    _.each(uniques, function(value, key, list){
    
      MonsterMeta.upsert({
        name: value
      },{$set: {
        type: 'sourceCategory',
        name: value,
        createdAt: new Date()
      }});
    
    });

  };


  let qualifications = MonsterItems.find( {}, { fields: { qualification:1}} );
  if ( qualifications ) {
    var uniques = _.uniq( qualifications.map( ( item ) => {
      return {
        qualification: item.qualification
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.qualification != null){
          MonsterMeta.upsert({
            name: value.qualification
          },{$set: {
            type: 'qualification',            
            name: value.qualification,
            createdAt: new Date()
          }});        
        }
      });
    }    
  };

  let experiences = MonsterItems.find( {}, { fields: { experience:1}} );
  if ( experiences ) {
    var uniques = _.uniq( experiences.map( ( item ) => {
      return {
        experience: item.experience
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.experience != null){
          MonsterMeta.upsert({
            name: value.experience
          },{$set: {
            type: 'experience',
            name: value.experience,
            createdAt: new Date()
          }});        
        }

      
      });
    }
  };
  let locations = MonsterItems.find( {}, { fields: { location:1}} );
  if ( locations ) {
    var uniques = _.uniq( locations.map( ( item ) => {
      return {
        location: item.location
      }
    }), true );

    if(uniques){
      _.each(uniques, function(value, key, list){
        
        if (value.location != null){
          MonsterMeta.upsert({
            name: value.location
          },{$set: {
            type: 'location',
            name: value.location,
            createdAt: new Date()
          }});        
        }

      
      });
    }
  };
};

Meteor.methods({
  runMonsterMeta(){
    if (this.userId) {
      return _runMonsterMeta();
    }
  }
});

Meteor.startup(function () {
  if (MonsterMeta.find().count() == 0 ){
    _runMonsterMeta(); 
  }
});