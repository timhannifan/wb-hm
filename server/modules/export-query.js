let jsZip    = Meteor.npmRequire( 'jszip' );

// ----- generic utilities

let _formatQueryData = {
  csv( data )  { return Papa.unparse( data ); }
};
let _initializeZipArchive = () => {
  return new jsZip();
};
let _addFileToZipArchive = ( archive, name, contents ) => {
  archive.file( name, contents );
};
let _generateZipArchive = ( archive ) => {
  return archive.generate( { type: 'base64' } );
};
let extend = ( obj, src ) => {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};

// ----- Export Query Module
let syncExportQuery = ( collection, query, modifier, callback ) => {
  let archive = _initializeZipArchive();
  _compileQueryZip( archive, collection, query, modifier );

  return _generateZipArchive( archive );
};
let _compileQueryZip = ( archive, collection, query, modifier) => {
  let collectionFinder = {
    'JobStreetItems': JobStreetItems,
    'MonsterItems': MonsterItems
  };
  _prepareQueryData( archive, collectionFinder[collection], 'csv', collection+'-export.csv', query, modifier  );
};
let _prepareQueryData = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, query, modifier ) : collection,
      formattedData = _formatQueryData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _getDataFromCollection = ( collection, query, modifier ) => {
  console.log('inside _getDataFromCollection with query ');
  console.dir(query);
  console.log('inside _getDataFromCollection with modifier ');
  console.dir(modifier);
  
  let data = collection.find( query, modifier ).fetch();
  if ( data ) {
    return data;
  }
};

Modules.server.syncExportQuery = syncExportQuery;