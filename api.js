/*global $, document*/

var articleId;
$(document).ready(function() {
    // $.get( 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1', function() {
    //   // $( '.result' ).html( data );
    //
    // }).done(function(result) {
    //   console.log(result)
    // })

    articleId = $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            // action: 'query',
            // meta: 'userinfo',
            // format: 'json',
            crossOrigin: true
            // origin: 'https://wiki-game-40c87.firebaseapp.com/'
        },
        xhrFields: {
            withCredentials: true
        },
        // dataType: 'json'
    }).fail( function(error) {
        console.log('Error:', error);
    }).then(function(data) {
        console.log(data.query.random[0].id);

        var id = data.query.random[0].id;

        var path = 'https://en.wikipedia.org/w/api.php?action=query&format=json&uselang=user&errorformat=plaintext&prop=links&list=&pageids=' + id + '&plnamespace=0&pllimit=1&pldir=descending';
        console.log('path', path);
        var articleLinks = $.ajax({
            url: path,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                // action: 'query',
                // meta: 'userinfo',
                // format: 'json',
                crossOrigin: true
                // origin: 'https://wiki-game-40c87.firebaseapp.com/'
            },
            xhrFields: {
                withCredentials: true
            },
            // dataType: 'json'
        }).done(function(data) {
            console.log('data', data);
        });
    });

});

//put this ajax request in own function, then loop through logic of 'is this hitler'



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
