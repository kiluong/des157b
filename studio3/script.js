const avatar = document.getElementById("avatar");
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", item.id);
  });
});

avatar.addEventListener("dragover", e => {
  e.preventDefault();
});

avatar.addEventListener("drop", e => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text");
  const item = document.getElementById(id);
  alert(`You dropped ${item.title} on the avatar.\nShow origin here.`);
});

function goToCheckout() {
  window.location.href = "checkout.html";
}

// Chart.js Material Breakdown
window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('materialsChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Polyester', 'Rayon', 'Cotton', 'Satin'],
        datasets: [{
          label: 'Material Composition',
          data: [70, 20, 5, 5],
          backgroundColor: ['#b8c4d2', '#d2d6f0', '#e8f0f8', '#dcd8ea']
        }]
      },
      options: {
        plugins: {
          legend: { display: true, position: 'bottom' }
        }
      }
    });
  }
});
