Meteor.methods({
  fetchSkillData( filter ) {
    check( filter, Object );

    let group = { 
      _id: {skill: '$skillName'}, 
      total: { $sum: '$count'}
    };

    if ( filter.parentCategory !== 'all' ) {
      group._id.parentCategory = '$parentCategory';// var idLookup = JobStreetSources.findOne({_id: filter.parentCategory}) 
      
      if (filter.subSpecialization !== 'all') {
        group._id.subSpecialization = '$subSpecialization';
      }
       
    }
    if ( filter.parentCategory === 'all' ) { delete filter.parentCategory; }
    if ( filter.subSpecialization === 'all'  ) { delete filter.subSpecialization;  }

    console.log(filter);
    console.log(group);

    return Counts.aggregate(
      { $match: filter },
      // { $project: }
      { $group: group }
    );
  }
});