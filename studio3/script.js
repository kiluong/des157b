// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: false,
    easing: "ease-in-out",
    offset: 200,
  })

  // Fetch data from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Initialize the page with data
      initializeData(data)
    })
})

function initializeData(data) {
  // artist list
  const artistList = document.getElementById("artistList")
  data.topArtists.forEach((artist, index) => {
    const li = document.createElement("li")
    li.innerHTML = `
      <span class="rank">#${index + 1}</span>
      <div class="item-details">
        <span class="item-name">${artist.name}</span>
        <span class="item-stat">${artist.playCount} plays</span>
      </div>
    `
    artistList.appendChild(li)
  })

  // genre list
  const genreList = document.getElementById("genreList")
  data.topGenres.forEach((genre, index) => {
    const li = document.createElement("li")
    li.innerHTML = `
      <span class="rank">#${index + 1}</span>
      <div class="item-details">
        <span class="item-name">${genre.name}</span>
        <span class="item-stat">${genre.hours} hours</span>
      </div>
    `
    genreList.appendChild(li)
  })

  // song data
  document.getElementById("minutesListened").textContent = data.topSong.minutesListened
  document.getElementById("songTitle").textContent = data.topSong.title
  document.getElementById("songArtists").textContent = data.topSong.artists

  // artist pie chart
  const artistCtx = document.getElementById("artistChart").getContext("2d")
  new Chart(artistCtx, {
    type: "pie",
    data: {
      labels: data.topArtists.map((artist) => artist.name),
      datasets: [
        {
          data: data.topArtists.map((artist) => artist.playCount),
          backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)", "rgba(255, 159, 64, 0.8)"],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })

  // genre bar chart
  const genreCtx = document.getElementById("genreChart").getContext("2d")
  new Chart(genreCtx, {
    type: "bar",
    data: {
      labels: data.topGenres.map((genre) => genre.name),
      datasets: [
        {
          label: "Hours Listened",
          data: data.topGenres.map((genre) => genre.hours),
          backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}
