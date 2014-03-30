(function(window, jQuery){

jQuery.fn.outerHTML = function(s) {
  return s
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};

window.parseUrl = function( url ) {
  var a = document.createElement('a');
  a.href = url;
  return a;
}
window.pad = function(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}

var XBMC = {
  consts: {
    version: '1.0',
    json: {
      fields: {
        movie: ['title','genre','year','rating','plot','mpaa','imdbnumber','runtime','fanart','thumbnail','file'],
        episode: ['title','plot','firstaired','runtime','season','episode','showtitle','fanart','thumbnail','file','tvshowid'],
        track: ['title','artist','year','album','track','duration','fanart']
      }
    }
  },
  vars: {
    hash: '',
  },
  fn: {},
  rpc: {
    options: {
//      contentType: 'application/json', REMOVE THIS !!!!!!!!!!!!!!!
      dataType: 'json',
      type: 'POST',
    },
    req: function(method, params, id, callback){
      var data = {
        'jsonrpc': '2.0',
        'id': 1,
        'method': method,
        'params': params
      };
      var query = JSON.stringify(data);
      var options = jQuery.extend({}, this.options, {
        url: 'jsonrpc.php',//'jsonprc' + '?' + method, REMOVE THIS !!!!!!!!!!!!!!!
        data: {query: query},//JSON.stringify(data), REMOVE THIS !!!!!!!!!!!!!!!
        success: function(d){ callback(id, JSON.parse(d).result) }
      });
      return $.ajax(options);
    }
  }
}
window.XBMC = XBMC;

}(window, jQuery));