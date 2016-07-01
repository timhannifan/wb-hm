Meteor.methods({
    exportOptionsQuery: function (query, modifier) {
    check( query.collection, String );
    
    var collection = query.collection;
    var passedQuery = {};    

    if (query.startDate){
        check( query.startDate, Date)
        passedQuery.createdAt = {$gte: query.startDate};       
    }
    if (query.endDate){
        check( query.endDate, Date);
        passedQuery.createdAt = {$lte: query.endDate};
    }
    if (query.jsParentCategory){
        check( query.jsParentCategory, Array);
        passedQuery.parentCategory = {$in: query.jsParentCategory};
    }
    if (query.jsSubSpecialization){
        check( query.jsSubSpecialization, Array);
        passedQuery.subSpecialization = {$in: query.jsSubSpecialization};
    }
    if (query.jsListedIndustry){
        check( query.jsListedIndustry, Array);
        passedQuery.listedIndustry = {$in: query.jsListedIndustry};
    }
    if (query.jsListedSpec){
        check( query.jsListedSpec, Array);
        passedQuery.listedSpec = {$in: query.jsListedSpec};
    }
    if (query.jsListedRole){
        check( query.jsListedRole, Array);
        passedQuery.listedRole = {$in: query.jsListedRole};
    }
    if (query.jsAltIndustry){
        check( query.jsAltIndustry, Array);
        passedQuery.companySnapIndustry = {$in: query.jsAltIndustry};
    }
    if (query.jsExperience){
        check( query.jsExperience, Array);
        passedQuery.experience = {$in: query.jsExperience};
    }
    if (query.jsLocation){
        check( query.jsLocation, Array);
        passedQuery.location = {$in: query.jsLocation};
    }

    // check( query.endDate, Date);
    // check( query.collection, String );
    if (modifier.fields){
        check( modifier.fields, Object );    
    }

    var passedModifier = {
        fields: modifier.fields
    };

    console.log('METHOD: exportOptionsQuery on '+ query.collection);
    console.log(passedQuery);
    console.log(passedModifier);

    var asyncExportQuery = Meteor.wrapAsync(Modules.server.syncExportQuery),
    // result = asyncExportQuery(query, modifier, function( error, response ) {
    result = asyncExportQuery(collection,passedQuery,passedModifier, function( error, response ) {
      if ( error ) {
        // Handle error.
        console.log(error)
      } else {
        // Handle response.
        console.log('export options result');
        console.log(result);        
        return result;

      }
    });
    
    return result;
    }
});
