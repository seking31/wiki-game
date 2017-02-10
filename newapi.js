/*global $, document*/


$(document).ready(function() {
    // stop = document.getElementById('stop');


});


var counter = 0;
var index = 0;
var newColor = function (){
  counter++;
  console.log('counter', counter);
  var colorArray=['#321008', '#e0a08e',  '#8f8e64',  '#af4618',  '#26251c', '#AF4618', '#d48639',  '#7b4222', '#b69049', '#d08272', '#4b413a']
  if(counter % 3 === 0){
    index++;
  }
  if(index >= colorArray.length){
    index = 0;
  }
  return colorArray[index];
};

function getLinks(url) {

    function makeButtonLink(linkTitle) {

        let noSpacelinkTitle = linkTitle.replace(/\s/g, '+');
        let firstHalf = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=';
        let secondHalf = '&plnamespace=0&pllimit=500&pltitles=&pldir=ascending';
        let newPath = firstHalf + noSpacelinkTitle + secondHalf;
        let color = newColor();
        $('#link-btn-container').append('<button class="linkButton"' + ' href=' + newPath + '>' + linkTitle + '</button>');
        $('.linkButton').css({backgroundColor: color, color:'white',fontSize:'20px'});
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
                $('.win-modal').modal();

                // window.setTimeout(function(){
                //   location.reload();
                // }, 5000);


        } else {
            randomizedLinks.forEach(makeButtonLink);
        }
    });
}


$('#start').click(function() {
 $(this).prop('disabled', true);
  var twoMinutes = 60 * 2,
      display = $('#time');

getLinks('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=Adolf+Hitler&plnamespace=0&pllimit=500&pltitles=&pldir=ascending');
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


          display.text(minutes + ':' + seconds);

          if (--timer < 0) {
            $('.loser-modal').modal();

            window.setTimeout(function(){
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
//get the link created by the switch

// // Stopwatch
