let jsZip    = Meteor.npmRequire( 'jszip' );
let tm = Meteor.npmRequire( 'text-miner' );

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
let rerunJsDescTags = ( collection, query, modifier, callback ) => {
  let archive = _initializeZipArchive();
  _compileQueryZip( archive, collection, query, modifier );

  return _generateZipArchive( archive );
};
let _compileQueryZip = ( archive, collection, query, modifier) => {
  let collectionFinder = {
    'JobStreetItems': JobStreetItems,
    'MonsterItems': MonsterItems
  };
  _prepareQueryData( archive, collectionFinder[collection], 'csv', collection+'-desc-frequency.csv', query, modifier  );
};
let _prepareQueryData = ( archive, collection, type, fileName, query, modifier ) => {
  let data          = collection instanceof Mongo.Collection ? _getDataFromCollection( collection, query, modifier ) : collection,
      formattedData = _formatQueryData[ type ]( data );
  _addFileToZipArchive( archive, fileName, formattedData );
};
let _getDataFromCollection = ( collection, query, modifier ) => {
  
  let data = collection.find( query, modifier ).fetch();
  // let data = collection.find( query, modifier );
  if ( data ) {


    // function _rerunJsDescTags () {

      // let my_corpus = new tm.Corpus([]);
      


      // // let data = JobStreetItems.find({});

      // data.forEach(function (post) {
      //   let str = post.description;
      //   if (typeof str === 'string'){
      //     my_corpus.addDoc(str);
      //   }
      // });

    //   my_corpus.trim()
    //       .map(function(doc) {
    //         return doc.replace(/[a-z.]+(?=[A-Z.]+)/g, function(x){return x+" ";})   // regex to convert camelCase
    //         .replace(/_/g, " ")                               // regex for underscores
    //         .replace(/\W/g, " ");                       // regex for non-word characters
    //       })      
    //       .toLower()                                
    //       .removeDigits()                             
    //       .removeWords(tm.STOPWORDS.EN)
    //       .clean();



    //   let terms = new tm.Terms(my_corpus);
    //   console.log(terms.nTerms);
    //   console.log(terms.vocabulary);
    //   console.log(terms.findFreqTerms(2));
    // }

    // if (data.length > 10000) {
    //   throw new Meteor.Error("export-size", 
    //     "File size is too large. Please use filters to restrict your results.");
    // } else {
      return data;
    }
};

Modules.server.rerunJsDescTags = rerunJsDescTags;


