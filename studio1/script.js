(function() {
    'use strict';

    const myVideo = document.querySelector('#myVideo');
    const fs = document.querySelector('.fa-expand');

    // add the rest of the script here
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');

    const poem = {
    start: [0, 5, 9],
    stop: [1, 7, 10],
    line: [line1, line2, line3]
    }

    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {
    console.log(parseInt(myVideo.currentTime));

        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {poem.line[i].className = "showing";
            } else {
            poem.line[i].className = "hidden";
            }
        }
    }


    fs.addEventListener('click', function() {
        // The fullscreenElement attribute returns null if the element is in windowed mode
        if (!document.fullscreenElement) {
            // document.documentElement returns the Element that is a direct child of the document, the <html> element
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();

        }
    });
})();