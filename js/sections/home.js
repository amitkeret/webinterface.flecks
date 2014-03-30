(function(window){
'use strict';
var XBMC = window.XBMC;

XBMC.fn.home = {
  populatePanel: function(id, data){
    var items = [];
    try {
      $.each(data['movies'], function(i, d){
        items.push( XBMC.fn.global.movie.formatItem(d) );
      })
    } catch(e) {}
    try {
      $.each(data['episodes'], function(i, d){
        items.push( XBMC.fn.global.episode.formatItem(d) );
      })
    } catch(e) {}
    $(id).html(items.join("\n"));
  }
}

$(function(){
  XBMC.rpc.req('VideoLibrary.GetRecentlyAddedMovies', {
    properties: XBMC.consts.json.fields.movie,
    sort: {method: 'dateadded', order: 'descending'},
    limits: {end: 5}
  }, '#radm', XBMC.fn.home.populatePanel);
  XBMC.rpc.req('VideoLibrary.GetRecentlyAddedMovies', {
    properties: XBMC.consts.json.fields.movie,
    sort: {method: 'year', order: 'descending'},
    limits: {end: 5}
  }, '#raim', XBMC.fn.home.populatePanel);
  XBMC.rpc.req('VideoLibrary.GetRecentlyAddedEpisodes', {
    properties: XBMC.consts.json.fields.episode,
    sort: {method: 'dateadded', order: 'descending'},
    limits: {end: 5}
  }, '#rade', XBMC.fn.home.populatePanel);
  XBMC.rpc.req('VideoLibrary.GetRecentlyAddedEpisodes', {
    properties: XBMC.consts.json.fields.episode,
    sort: {method: 'year', order: 'descending'},
    limits: {end: 5}
  }, '#raie', XBMC.fn.home.populatePanel);
})
}(window));