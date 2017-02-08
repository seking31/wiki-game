/*global $, document*/

var articleId, newPath, noSpacelinkTitle;
$(document).ready(function() {

$('#Ready').click(function() {
});

    articleId = $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0',
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

        var queryId = data.query.random[0].id;
        console.log(queryId);

        var path = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&pageids='+ queryId + '&plnamespace=0&pllimit=5&pldir=descending';

        var articleLinks = $.ajax({
            url: path,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                crossOrigin: true
            },
            xhrFields: {
                withCredentials: true
            },
        }).done(function(newData) {
            console.log('newData', newData);
            newLinks(newData);
        });
    });



function newLinks(data){

    var id = Object.keys(data.query.pages)[0];
    var links = data.query.pages[id].links;
    console.log('linksss', links);


   $(".coolGroup").empty();

    for(var i = 0; i < links.length; i++){
        var linkTitle = links[i].title;
        newPath = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles='+ noSpacelinkTitle + '&plnamespace=0&pllimit=5&pldir=descending'
        $('.coolGroup').append('<button href=' + newPath + '>' + linkTitle + '</button>');

        noSpacelinkTitle = linkTitle.replace(/\s/g, '');


        console.log('newPath', newPath);

    }
}

$('.coolGroup').click(function(event){
    event.preventDefault();
    console.log('pie', $(event.target).attr('href'));


    $.ajax({
        url: $(event.target).attr('href'),
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
        console.log(data);
        newLinks(data);
    });

});
//put this ajax request in own function, then loop through logic of 'is this hitler'

});

// Stopwatch

$('#start').click(function() {

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
