/*
- now playing
DONE- sections navigation
DONE- check back-forward buttons
- navbar library/power
DONE- recently added
- remote/volume in modal (better responsive)
- check connection on init
- 
*/
(function(window, jQuery){
'use strict';

$(function(){
  $(window).hashchange(XBMC.fn.global.hashChange)
  $(document).on('click', '[data-clickthrough=false]', XBMC.fn.global.noClick);
  $('#main-navbar [data-toggle=popover]').bind('click', XBMC.fn.global.navbarButton);
  $('#navbtn-nowplaying').bind('click', XBMC.player.toggleCheckFlag);
  $('#bottom-navbar [data-toggle=popover]').bind('click', XBMC.fn.global.navbarButton);
  $(window).trigger('hashchange');
  setInterval(XBMC.player.check, 1000);
})

}(window, jQuery));
