(function(window){
'use strict';
var XBMC = window.XBMC;

XBMC.fn.global = {
  hashChange: function(e){
    // e = n.Event, this = Window
    var _hash = window.location.hash || '#home';
    if (_hash == XBMC.vars.hash) return false;
    XBMC.vars.hash = _hash;
    XBMC.fn.global.fadeOut();
    $.get('sections/' + _hash.substr(1) + '.html', function(d){
      $('#main-content').html(d);
      XBMC.fn.global.fadeIn(_hash);
    })
  },
  fadeOut: function(){
    $('#spinnerOverlay').fadeIn('fast');
    $('#main-content').fadeOut('fast');
    $('*.active').removeClass('active');
  },
  fadeIn: function(hash){
    $('*[href=' + hash + ']').parent().addClass('active');
    $('#main-content').fadeIn('fast');
    $('#spinnerOverlay').fadeOut('fast');
  },
  noClick: function(e){
    e.preventDefault();
    return false;
  },
  navbarButton: function(){
    var _elem = $(this);
    // We can unbind this function, cos next time "popover" will handle it.
    _elem.unbind('click', XBMC.fn.global.navbarButton);
    $.get('popovers/' + _elem.attr('href').substr(1) + '.html', function(d){
      _elem.popover({
        html: true,
        placement: 'auto bottom',
        container: 'body',
        content: d
      }).popover('show');
    })
  },
  formatAssetURL: function(url){
//    return 'image/' + encodeURI(url); CHECK IF THIS WORKS WHEN ON XBMC MACHINE !!!!!!!!
    return decodeURIComponent(url.substr(0, url.length - 1).substr(url.indexOf('://') + 3));
  },
  movie: {
    formatItem: function(data){
      var item = $($('#template-recentitem:eq(0)').html());
      item.find('[data-rpc=thumbnail] img').attr('src', XBMC.fn.global.formatAssetURL(data.fanart));
      item.find('[data-rpc=title]').text(data.title);
      item.find('[data-rpc=title-details]').text(' ' + data.year + ' | ' + data.genre.join(','));
      return item.outerHTML();
    }
  },
  episode: {
    formatItem: function(data){
      var item = $($('#template-recentitem:eq(0)').html());
      item.find('[data-rpc=thumbnail] img').attr('src', XBMC.fn.global.formatAssetURL(data.thumbnail));
      item.find('[data-rpc=title]').text(data.title);
      item.find('[data-rpc=title-details]').text(' ' + data.showtitle + ' | ' + data.season + 'x' + data.episode);
      return item.outerHTML();
    }
  }
}
}(window));