let jsZip    = Meteor.npmRequire( 'jszip' );

let exportData = ( options ) => {

  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
};

var exportDataSync = function (options,callback) {

  let archive = _initializeZipArchive();
  _compileZip( archive, options.limit, options.skip );

  return _generateZipArchive( archive );
}

var exportDummyVars = function (query, modifier, callback) {

  let archive = _initializeZipArchive();
  _compileDummyZip( archive, query, modifier );

  return _generateZipArchive( archive );
}

var exportDataQuery = function (query, filters,callback) {

  let archive = _initializeZipArchive();
  _compileQueryZip( archive, query, filters );

  return _generateZipArchive( archive );
}

var exportBigZip = function (callback) {

  let archive = _initializeZipArchive();
  _compileBigZip( archive);

  return _generateZipArchive( archive );
}

let _compileZip = ( archive, limit, skip) => {
  _prepareDataForArchive( archive, JobStreetItems, 'csv', 'data.csv', limit, skip );
};
let _compileDummyZip = ( archive, query, modifier) => {
  _prepareDummyDataForArchive( archive, Skills, 'csv', 'dummyVariables.csv', query, modifier );
};
let _compileQueryZip = ( archive, query, filters) => {
  _prepareQueryForArchive( archive, JobStreetItems, 'csv', 'query.csv', query, filters );
};

let _compileBigZip = ( archive) => {

  let items = _getDataCountFromCollection(JobStreetItems),
  counter = 0;

  if (items >= 5000) {
    while (counter < items) {
      let filename = "data_"+counter+".csv";
        _prepareDataForArchive( archive, JobStreetItems, 'csv', filename, 5000, counter );
        counter+=5000
    }

  } else {
    _prepareDataForArchive( archive, JobStreetItems, 'csv', 'data.csv', 5000, 0 );    
  }

};

let _prepareQueryForArchive = ( archive, collection, type, fileName, query, filters ) => {
  let data          = collection instanceof Mongo.Collection ? _getQueryFromCollection( collection, query, filters ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _prepareDataForArchive = ( archive, collection, type, fileName, limit, skip ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, limit, skip ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _prepareDummyDataForArchive = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getDummyDataFromCollection( collection, query, modifier ) : collection,
      formattedData = _formatData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};

let _getDataCountFromCollection = ( collection) => {
  // let data = collection.find( {}, { sort: {createdAt: 1}, limit: limit, skip: skip} ).fetch();
  let data = collection.find( {}, { sort: {createdAt: -1}, fields: {createdAt: 1}} ).count();
  if ( data ) {
    return data;
  }
};

let _getQueryFromCollection = ( collection,  query, filters  ) => {
  let data = collection.find( query, filters ).fetch();
  // let data = collection.find( {}, { sort: {createdAt: -1}, limit: limit, skip: skip} ).fetch();
  if ( data ) {
    return data;
  }
};

let _getDataFromCollection = ( collection, limit, skip ) => {
  // let data = collection.find( {}, { sort: {createdAt: 1}, limit: limit, skip: skip} ).fetch();
  let data = collection.find( {}, { sort: {createdAt: -1}, limit: limit, skip: skip} ).fetch();
  if ( data ) {
    return data;
  }
};

let _getDummyDataFromCollection = ( collection, query, modifier ) => {
  let data = collection.find( query, modifier ).fetch();
  if ( data ) {
    console.log(data);
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
Modules.server.exportDataSync = exportDataSync;
Modules.server.exportBigZip = exportBigZip;
Modules.server.exportDataQuery = exportDataQuery;
Modules.server.exportDummyVars = exportDummyVars;