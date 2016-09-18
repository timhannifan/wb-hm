let startup = () => {
  _setBrowserPolicies();
};

var _setBrowserPolicies = () => {
  // BrowserPolicy.content.allowOriginForAll( '*.amazonaws.com' );
};

Modules.server.startup = startup;
