let json2xml = Meteor.npmRequire( 'json2xml' ),
    jsZip    = Meteor.npmRequire( 'jszip' );

let exportData = ( options ) => {
  let archive = _initializeZipArchive();
  _compileZip( archive );

  return _generateZipArchive( archive );
};

let generateZip = ( options ) => {
  let archive = _initializeZipArchive();
  _compileZip( archive );

  return _generateZipArchive( archive );
};

let _compileZip = ( archive) => {
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_0_5000.csv', 500, 0 );
};

let _prepareDataForArchive = ( archive, collection, type, fileName, limit, skip ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, limit, skip ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _getDataFromCollection = ( collection, limit, skip ) => {
  let data = collection.find( {}, { limit: limit, skip: skip} ).fetch();
  if ( data ) {
    return data;
  }
};

let _formatData = {
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

Modules.server.exportData = exportData;
Modules.server.generateZip = generateZip;
