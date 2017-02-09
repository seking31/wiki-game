/*global $, document*/


$(document).ready(function() {


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
        if(queryId === '6678'){
           alert('youz a win guy!');
        }else{
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

    //   console.log(t)
    //
    //   if(t=2){
    //     $(alert('loser')).click(function() {
    //     location.reload();
    // });

    //}

});
