/*global $, document*/


$(document).ready(function() {
    stop = document.getElementById('stop');



});


function getLinks(url) {

    function makeButtonLink(linkTitle) {
        let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
        let firstHalf = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=';
        let secondHalf = '&plnamespace=0&pllimit=500&pltitles=&pldir=ascending';
        let newPath = firstHalf + noSpacelinkTitle + secondHalf;
        $('.linkButton').append('<button href=' + newPath + '>' + linkTitle + '</button>');
    }

    function randomizeLinks(linksArray, numberOfLinks) {

        var newLinks = [];
        for (var i = 0; i < numberOfLinks; i++) {
            var randomeNumber = Math.floor(Math.random() * linksArray.length);
            newLinks.push(linksArray[randomeNumber].title)
        }
        return newLinks;
    }

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
    }).fail(function(error) {
        console.log('Error:', error);
    }).then(function(data) {

        var queryId = Object.keys(data.query.pages)[0];
        var links = data.query.pages[queryId].links;
        var randomizedLinks = randomizeLinks(links, 3);
        var swapIndex = Math.floor(Math.random() * randomizedLinks.length);

        switch (queryId) {
            case '2731583': //Hitler Id
                randomizedLinks[swapIndex] = 'Amphetamine';
                break;
            case '2504': //Amphetamine Id
                randomizedLinks[swapIndex] = 'Benzoic acid';
                break;
            case '4106': //Benzoic acid Id
                randomizedLinks[swapIndex] = 'Cat';
                break;
        }
        if (queryId === '6678') {
            alert('youz a win guy!');

            location.reload();

        } else {
            randomizedLinks.forEach(makeButtonLink);
        }
    });
}


$('.linkButton').click(function(event) {
    event.preventDefault();
    getLinks($(event.target).attr('href'));
});
//get the link created by the switch
function init() {
    getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Adolf+Hitler&plnamespace=0&pllimit=500&pltitles=&pldir=ascending');

}

// // Stopwatch

$('#start').click(function() {
 $(this).prop('disabled', true);
  var twoMinutes = 60 * 2,
    display = $('#time');

  init();

  startTimer(twoMinutes, display);

  // start = document.getElementById('sta

  function startTimer(duration, display) {
      var timer = duration,
          minutes, seconds;
          // setInterval();
      setInterval(function() {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          console.log(minutes);
          console.log(seconds);

          display.text(minutes + ':' + seconds);

          if (--timer < 0) {
            alert('youz a Loser guy!');
            location.reload();
          }
      }, 1000);
  }



});
