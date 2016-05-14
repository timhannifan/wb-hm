let json2xml = Meteor.npmRequire( 'json2xml' ),
    jsZip    = Meteor.npmRequire( 'jszip' );

let exportData = ( options ) => {
  let archive = _initializeZipArchive();
  _compileZip( archive, options.collection );
  return _generateZipArchive( archive );
};

let _compileZip = ( archive) => {
  let collectionSize = JobStreetItems.find().count();
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_0_5000.csv', 5000, 0 );
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_5k_10k.csv', 5000, 5000 );
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_10k_15k.csv', 5000, 10000 );
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_15k_20k.csv', 5000, 15000 );
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_20k_25k.csv', 5000, 20000 );
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_25k_30k.csv', 5000, 25000 );
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'jobstreetitems_30k_35k.csv', 5000, 30000 );

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
  csv( data )  { return Papa.unparse( data ); },
  // xml( data )  { return json2xml( data, { header: true } ); }
  // json( data ) { return JSON.stringify( data, null, 2 ); }
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
