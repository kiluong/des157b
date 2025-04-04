(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const darkAudio = new Audio('audio/carti.mp3'); // Dark mode audio
    const lightAudio = new Audio('audio/ih.mp3'); // Light mode audio
    let mode = 'dark'; // Initial mode is dark

    // Function to play the correct audio
    function playAudio(audio) {
        console.log('Attempting to play audio:', audio.src); // Log the audio being played
        audio.play().then(() => {
            console.log('Audio is playing');
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    button.addEventListener('click', function() {
        console.log('Button clicked'); // Log the button click

        // Stop any currently playing audio
        darkAudio.pause();
        lightAudio.pause();

        if (mode === 'dark') {
            console.log('Switching to light mode'); // Log mode change
            // Switch to light mode
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';

            // Play light mode audio
            playAudio(lightAudio);
        } else {
            console.log('Switching to dark mode'); // Log mode change
            // Switch to dark mode
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark';

            // Play dark mode audio
            playAudio(darkAudio);
        }
    });
})();
