let json2xml = Meteor.npmRequire( 'json2xml' ),
    jsZip    = Meteor.npmRequire( 'jszip' );

let exportData = ( options ) => {
  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
};

let generateZip = ( options ) => {
  let archive = _initializeZipArchive();
  _compileZip( archive );

  return _generateZipArchive( archive );
};

let _compileZip = ( archive, limit, skip) => {
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'data.csv', limit, skip );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_1.csv', 500, limit );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_2.csv', 500, limit + 1000 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_3.csv', 500, limit + 1500 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_4.csv', 500, limit + 2000 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_5.csv', 500, limit + 2500 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_6.csv', 500, limit + 3000 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_7.csv', 500, limit + 3500 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_8.csv', 500, limit + 4000 );
  // _prepareDataForArchive( archive, JobStreetItems, 'csv', 'download_9.csv', 500, limit + 4500 );
};

let _prepareDataForArchive = ( archive, collection, type, fileName, limit, skip ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, limit, skip ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _getDataFromCollection = ( collection, limit, skip ) => {
  let data = collection.find( {}, { sort: {createdAt: 1}, limit: limit, skip: skip} ).fetch();
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
