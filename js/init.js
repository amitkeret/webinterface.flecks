(function (document){
  'use strict';
  var i,
    script,
    debug = true, /* Set to true to disable cached javascript !!!!!!!!!!!!! */
    version = (debug ? Math.random() : '1.0'),
    scripts = [
      'vendor/json2.min',
      'vendor/iscroll-min',
      'vendor/jquery.ba-hashchange.min',
      'core',
      'player',
      'main',
      'sections/global'
    ];
  for (i = 0; i < scripts.length; i += 1) {
    script = '<script src="js/';
    script += scripts[i] + '.js?' + version;
    script += '"><\/script>';
    document.write(script);
  }
}(window.document));