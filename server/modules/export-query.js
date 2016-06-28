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
let syncExportQuery = ( query, modifier, callback ) => {
  let archive = _initializeZipArchive();
  _compileQueryZip( archive, query, modifier );

  return _generateZipArchive( archive );
};
let _compileQueryZip = ( archive, query, modifier) => {
  _prepareQueryData( archive, JobStreetItems, 'csv', 'custom-query.csv');
};
let _prepareQueryData = ( archive, collection, type, fileName ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection ) : collection,
      formattedData = _formatQueryData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _getDataFromCollection = ( collection ) => {
  let data = collection.find( {} ).fetch();
  if ( data ) {
    return data;
  }
};

Modules.server.syncExportQuery = syncExportQuery;