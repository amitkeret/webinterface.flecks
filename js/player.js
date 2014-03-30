(function(window, jQuery){
'use strict';
var XBMC = window.XBMC;

XBMC.player = {
  checkflag: false,
  toggleCheckFlag: function(){
    XBMC.player.checkflag = !XBMC.player.checkflag;
    if (XBMC.player.checkflag) XBMC.player.update();
  },
  check: function(){
    // this = Window (when calling from setInterval())
    if (XBMC.player.checkflag) XBMC.player.update();
  },
  update: function(){
    XBMC.rpc.req('Player.GetActivePlayers', {}, '#nowPlaying', XBMC.player.updateSuccess);
  },
  updateSuccess: function(id, data){
    var _r;
    if (data.length == 0) {
      $(id + 'Content #playeritem').hide();
      $(id + 'Content #playeritemnone').show();
    } else {
      var player = data[0];
      XBMC.rpc.req('Player.GetProperties', {
        playerid: player.playerid,
        properties: ['playlistid','time','percentage','totaltime','position']
      }, '#nowPlayingContent', function(id, data){
        if (player.type == 'video') XBMC.player.refreshVideoDetails(id, player.playerid);
        else if (player.type == 'audio') XBMC.player.refreshAudioDetails(id, player.playerid);
        XBMC.player.refreshPlayerDetails(id, data);
        $(id + ' #playeritemnone').hide();
        $(id + ' #playeritem').show();
      });
    }
  },
  refreshPlayerDetails: function(id, data){
    var progress = data.percentage.toFixed(2);
    $(id + ' #playerprogress .progress-bar')
      .css('width', progress + '%')
      .attr('aria-valuenow', progress);
    $(id + ' #playerprogress .progress-bar-text')
      .text( pad(data.time.hours, 2) + ':' + pad(data.time.minutes, 2) + ':' + pad(data.time.seconds, 2) );
  },
  refreshVideoDetails: function(id, playerid){
    var properties = jQuery.unique(jQuery.merge(jQuery.merge([], XBMC.consts.json.fields.movie), XBMC.consts.json.fields.episode));
    console.log(properties);
    XBMC.rpc.req('Player.GetItem', {
      playerid: playerid,
      properties: properties
    }, id, function(id, data){
      var item = data.item;
      $(id + ' #playitemfanart img').attr('src', XBMC.fn.global.formatAssetURL(item.thumbnail));
      $(id + ' #playitemtitle').html(item.title);
      if (item.showtitle != '')
        $(id + ' #playitemdetails').html(item.showtitle + ' | ' + item.season + 'x' + item.episode);
      if (item.year > 0)
        $(id + ' #playitemdetails').html(item.year + ' | ' + item.genre.join(','));
    });
  },
  refreshAudioDetails: function(id, playerid){
  
  }
}
}(window, jQuery));