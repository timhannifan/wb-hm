let jsZip    = Meteor.npmRequire( 'jszip' );

// ----- generic utilities

let _formatData = {
  csv( data )  { return Papa.unparse( data, {quotes: true, header: true} )}
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

// ----- generic export functionality
let exportData = ( options ) => {

  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
};
let exportDataSync = function (options,callback) {

  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
};
let _compileZip = ( archive, limit, skip) => {
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'data.csv', limit, skip );
};
let _prepareDataForArchive = ( archive, collection, type, fileName, limit, skip ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, limit, skip ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _getDataFromCollection = ( collection, limit, skip ) => {
  let data = collection.find( {}, { sort: {createdAt: -1}, limit: limit, skip: skip} ).fetch();
  if ( data ) {
    return data;
  }
};

Modules.server.exportData = exportData;
Modules.server.exportDataSync = exportDataSync;