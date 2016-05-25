let getData = () => {
  let data = _getTemplateData();
  return data;
};

let _getTemplateData = () => {
  return {
    jobStreetItems: _getDataFromCollection( JobStreetItems, {}, {} )
  };
};

let _getDataFromCollection = ( collection, query, filters ) => {
  let data = collection.find( query, filters );
  if ( data ) {
    return data;
  }
};

Modules.client.getCollectionData = getData;
