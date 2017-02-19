/*global $, document*/


$(document).ready(function() {

});

var counter = 0;
var index = 0;
var newColor = function() {
    counter++;
    var colorArray = ['#321008', '#e0a08e', '#8f8e64', '#af4618', '#26251c', '#AF4618', '#d48639', '#7b4222', '#b69049', '#d08272', '#4b413a'];
    if (counter % 3 === 0) {
        index++;
    }
    if (index >= colorArray.length) {
        index = 0;
    }
    return colorArray[index];
};

function makeButtonLink(linkTitle) {

    let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
    let firstHalf = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=';
    let secondHalf = '&plnamespace=0&pllimit=500&pltitles=&pldir=ascending';
    let newPath = firstHalf + noSpacelinkTitle + secondHalf;
    let color = newColor();
    let newClass = 'colorClass' + counter;

    $('#simp').append('<button class="linkButton ' + newClass + ' "  href=' + newPath + '>' + linkTitle + '</button>');
    $('.' + newClass).css({
        backgroundColor: color,
        color: 'white',
        fontSize: '20px'
    });
    return {title: linkTitle, path: newPath, class: newClass};
}

function getLinks(url) {

    function randomizeLinks(linksArray, numberOfLinks) {

        var newLinks = [];
        for (var i = 0; i < numberOfLinks; i++) {
            var randomeNumber = Math.floor(Math.random() * linksArray.length);
            newLinks.push(linksArray[randomeNumber].title);
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
            var randomizedLinks = randomizeLinks(links, 2);
            var swapIndex = Math.floor(Math.random() * randomizedLinks.length);

            if (queryId === '2731583' || queryId === '2504' || queryId === '4106') {
                switch (queryId) {
                    case '2731583': //Hitler Id
                        randomizedLinks[swapIndex] = 'Amphetamine';
                        console.log('1',queryId);
                        break;
                    case '2504': //Amphetamine Id
                        randomizedLinks[swapIndex] = 'Benzoic acid';
                        console.log('2',queryId);
                        break;
                    case '4106': //Benzoic acid Id
                        randomizedLinks[swapIndex] = 'Cat';
                        break;
                }
            } else if (queryId === '21473' || queryId === '200646') {
                switch (queryId) {
                    case '21473': //Tesla
                        randomizedLinks[swapIndex] = 'Selective breeding';
                        console.log('307',queryId);
                        break;
                    case '200646': //Selective Breeding
                        randomizedLinks[swapIndex] = 'Cat';
                        console.log('4',queryId);
                        break;
                }
            } else if(queryId === '65015' || queryId === '19828134' || queryId === '142586'){
                switch (queryId) {
                    case '65015': //Swamp Thing
                        randomizedLinks[swapIndex] = 'Plant';
                        console.log('1',queryId);
                        break;
                    case '19828134': //plant Id
                        randomizedLinks[swapIndex] = 'Domestication';
                        console.log('2',queryId);
                        break;
                    case '142586': //Domestication Id
                        randomizedLinks[swapIndex] = 'Cat';
                        break;
                      }
                  } else {
                  console.log('err');
                }
            if (queryId === '6678') {
                    $('.win-modal').modal();

                    window.setTimeout(function() {
                        location.reload();
                    }, 5000);


          } else {
                    randomizedLinks.forEach(makeButtonLink);
                }
            });
    }

    $('.start').click(function(e) {
      console.log(e.target.id);
        $(this).prop('disabled', true);
        var twoMinutes = 30 * 2,
            display = $('#time');
        $('.start').remove();

        if(event.target.id === 'Hitler'){
          getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Adolf+Hitler&plnamespace=0&pllimit=500&pltitles=&pldir=ascending');
          startTimer(twoMinutes, display);
        }else if (event.target.id === 'Swamp') {
          getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Swamp+Thing&plnamespace=0&pllimit=500&pltitles=&pldir=ascending');
          startTimer(twoMinutes, display);
        }else{
          getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Nikola+Tesla&plnamespace=0&pllimit=500&pltitles=&pldir=ascending');
          startTimer(twoMinutes, display);
        }

        function startTimer(duration, display) {
            var timer = duration,
                minutes, seconds;
            // setInterval();
            setInterval(function() {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;


                display.text(minutes + ':' + seconds);

                if (--timer < 0) {
                    $('.loser-modal').modal();

                    window.setTimeout(function() {
                        location.reload();
                    }, 5000);
                }
            }, 1000);
        }

    });

    $(document).on('click', '.linkButton', function(event) {
        event.preventDefault();
        getLinks($(event.target).attr('href'));

        $(this).remove();

    });
