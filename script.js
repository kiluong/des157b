(function() {
    'use strict';
    const button = document.querySelector("button")
    const body = document.querySelector("body")
    const banner = document.querySelector("#banner")
    const sections = document.querySelectorAll("section")
    const darkAudio = new Audio("audio/carti.mp3") 
    const lightAudio = new Audio("audio/ih.mp3") 
    let mode = "dark" 
    let isAudioPlaying = false // To track if audio is playing
    let currentAudio = null // To track which audio is playing

    // Function to play the correct audio
    function playAudio(audio) {
        // Stop any audio that is currently playing
        if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0 
        }

        // Play the selected audio
        audio
        .play()
        .then(() => {
            currentAudio = audio 
            console.log("Audio is playing")
            isAudioPlaying = true 
        })
        .catch((error) => {
            console.error("Error playing audio:", error)
        })
    }

    // Function to pause the audio if it's playing
    function pauseAudio() {
        if (currentAudio && isAudioPlaying) {
        currentAudio.pause() 
        isAudioPlaying = false 
        console.log("Audio paused")
        }
    }

    // Function to resume the audio if it's paused
    function resumeAudio() {
        if (currentAudio && !isAudioPlaying) {
        currentAudio.play() 
        isAudioPlaying = true 
        console.log("Audio resumed")
        }
    }

    function initializePage() {
        console.log("Initializing page")
        playAudio(darkAudio) 
    }

    button.addEventListener("click", () => {
        console.log("Button clicked") 

        // Switch the mode and play the corresponding audio
        if (mode === "dark") {
        console.log("Switching to light mode") 
        body.className = "switch"
        banner.className = "switch"
        button.className = "switch"
        for (const section of sections) {
            section.className = "switch"
        }
        mode = "light"

        // Play light mode audio
        playAudio(lightAudio)
        } else {
        console.log("Switching to dark mode")
        body.removeAttribute("class")
        banner.removeAttribute("class")
        button.removeAttribute("class")
        for (const section of sections) {
            section.removeAttribute("class")
        }
        mode = "dark"

        // Play dark mode audio
        playAudio(darkAudio)
        }
    })

    // Add an event listener for the spacebar to pause or resume any audio
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
        event.preventDefault() // Prevent default spacebar behavior (e.g., scrolling)
        if (isAudioPlaying) {
            pauseAudio() // Pause audio if it's playing
        } else {
            resumeAudio() // Resume audio if it's paused
        }
        }
    })

    document.addEventListener("DOMContentLoaded", initializePage)
})()