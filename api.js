/*global $, document*/


$(document).ready(function() {


});


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

      var queryId = Object.keys(data.query.pages)[0];
      var links = data.query.pages[queryId].links;

      console.log('queryId', queryId);
      console.log('links', links);

      for(var i = 0; i < links.length; i++){
        var linkTitle = links[i].title;
        // console.log(linkTitle, 'linkTitle');
        // console.log(typeof queryId, "queryId")
        // console.log(linkTitle);

        switch(queryId) {
          case '2731583':
            if(linkTitle === 'Amphetamine'){
              console.log('linkTitle',linkTitle);
              let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
              let newPath = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles='+ noSpacelinkTitle + '&plnamespace=0&pllimit=500&pltitles=&pldir=ascending';
              console.log('newPath', newPath);


              $('.linkButton').append('<button href=' + newPath + '>' + linkTitle + '</button>');

            }

          break;

          case '2504':
            if(linkTitle === 'Benzoic acid'){
              console.log('linkTitle',linkTitle);
              let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
              let newPath = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles='+ noSpacelinkTitle + '&plnamespace=0&pllimit=500&pltitles=&pldir=ascending';
              console.log('newPath', newPath);


              $('.linkButton').append('<button href=' + newPath + '>' + linkTitle + '</button>');

            }

          break;
          case '4106':
            if(linkTitle === 'Cat'){
              console.log('linkTitle',linkTitle);
              let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
              let newPath = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles='+ noSpacelinkTitle + '&plnamespace=0&pllimit=500&pltitles=&pldir=ascending';
              console.log('newPath', newPath);


              $('.linkButton').append('<button href=' + newPath + '>' + linkTitle + '</button>');

            }

        break;
        default:
        console.log('yepper');
        }

      }
    })

};


$('.linkButton').click(function(event){
  event.preventDefault();
  console.log(event.target,'event.target');
  console.log($(event.target).attr('href'));
  getLinks($(event.target).attr('href'));
});
//get the link created by the switch
function init(){
    getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Adolf+Hitler&plnamespace=0&pllimit=500&pltitles=&pldir=ascending');

}

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
