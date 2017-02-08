/*global $, document*/


$(document).ready(function() {


  function init(){
    getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Adolf+Hitler');
  }

  function getLinks(url){

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      data: {
        crossOrigin: true
      },
      xhrFields: {
        withCredentials: true
      },
    }).fail( function(error) {
      console.log('Error:', error);
    }).then(function(data) {
      console.log('data1', data);
      var queryId = Object.keys(data.query.pages)[0];
      var links = data.query.pages[queryId].links;
      console.log('links', links);

      for(var i = 0; i < links.length; i++){
        var linkTitle = links[i].title;
        console.log('linkTitle',linkTitle)
        let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
        let newPath = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles='+ noSpacelinkTitle + '&plnamespace=0&pllimit=5&pldir=descending';
        $('.linkButton').append('<button href=' + newPath + '>' + linkTitle + '</button>');
        console.log('newPath', newPath);
      }
    });
  }

  $('.linkButton').click(function(event){
    event.preventDefault();
    getLinks($(event.target).attr('href'));
  })

  // // Stopwatch

  $('#start').click(function() {
    init();
    var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

    function add() {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }

      h1.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

      timer();
    }

    function timer() {
      t = setTimeout(add, 1000);
    }
    timer();


    /* Start button */
    start.onclick = timer;

    /* Stop button */
    stop.onclick = function() {
      clearTimeout(t);
    };

    /* Clear button */
    clear.onclick = function() {
      h1.textContent = '00:00:00';
      seconds = 0;
      minutes = 0;
      hours = 0;
    };
  });
});
