document.addEventListener("DOMContentLoaded", () => {
  // AOS scroll animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: false,
    });
  }

  // Chart.js materials chart
  const canvas = document.getElementById("materialsChart");
  if (canvas && typeof Chart !== "undefined") {
    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Polyester", "Acrylic", "Other Synthetics"],
        datasets: [{
          data: [85, 10, 5],
          backgroundColor: ["#ef4444", "#f97316", "#eab308"],
          borderColor: "#ffffff",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.raw}%`
            }
          }
        }
      }
    });
  }

  const options = [
  { value: "quantity", label: "Quantity" },
  { value: "ethics", label: "Ethical Production" },
  { value: "price", label: "Low Price" },
  { value: "quality", label: "High Quality" },
  { value: "materials", label: "Sustainable Materials" },
  { value: "trend", label: "Trendiness" }
];

const comparisons = {
  "quantity-ethics": "More quantity and ethical production often lead to higher prices or reduced quality.",
  "price-quality": "It's tough to get both low prices and high quality — one usually compromises the other.",
  "materials-trend": "Trendy designs and sustainable materials don’t often align due to cost and production time.",
  "ethics-trend": "Fashion that is trendy and ethical is rare — fast fashion trends often come with poor labor practices.",
  "materials-price": "Sustainable materials tend to raise production costs compared to synthetics.",
  "quantity-quality": "More quantity often comes at the cost of lower quality and faster wear.",
  "ethics-price": "Ethical labor usually raises production costs, making extremely low prices unrealistic.",
  "trend-quality": "Trendy clothes aren't always made to last — quality may take a hit.",
  "materials-quantity": "A large wardrobe made with eco-friendly materials gets expensive fast.",
  "quality-ethics": "High-quality, ethically made pieces offer longevity but usually come with a higher price tag."
};

const factorA = document.getElementById("factorA");
const factorB = document.getElementById("factorB");
const summary = document.getElementById("comparisonSummary");

function populateFactorB(excludeValue) {
  factorB.innerHTML = "";
  options.forEach(opt => {
    if (opt.value !== excludeValue) {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.label;
      factorB.appendChild(option);
    }
  });
}

function updateComparison() {
  const a = factorA.value;
  const b = factorB.value;
  const key = `${a}-${b}`;
  const reverseKey = `${b}-${a}`;

  if (a === b) {
    summary.textContent = "Please select two different values to compare.";
  } else if (comparisons[key]) {
    summary.textContent = comparisons[key];
  } else if (comparisons[reverseKey]) {
    summary.textContent = comparisons[reverseKey];
  } else {
    summary.textContent = `Balancing ${a} and ${b} usually means trade-offs in other areas like cost, sustainability, or durability.`;
  }
}

// When A changes, repopulate B and update
factorA.addEventListener("change", () => {
  populateFactorB(factorA.value);
  updateComparison();
});

// When B changes, just update summary
factorB.addEventListener("change", updateComparison);

// Initial setup
populateFactorB(factorA.value);
updateComparison();



});

