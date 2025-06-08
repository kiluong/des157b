document.addEventListener("DOMContentLoaded", () => {
  // AOS scroll animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: false, // allow fade-out
      mirror: true, // trigger "out" animation on scroll-up
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

  const comparisons = {
    "quantity-ethics": "Choosing to buy more while supporting ethical production increases production demands, often leading to higher costs and challenges in maintaining fair labor standards at scale.",
    "ethics-quantity": "Prioritizing ethical production while seeking high quantity may force compromises in worker treatment or material sourcing, as ethical practices typically support smaller-scale, slower production.",
    "price-quality": "Trying to maintain low prices while expecting high quality is difficult — corners are often cut on stitching, fabric durability, or ethical sourcing to meet cost expectations.",
    "quality-materials": "Prioritizing long-lasting quality and sustainable materials leads to longer garment lifespans but comes at a higher financial and production cost due to careful sourcing and craftsmanship.",
    "trend-ethics": "Keeping up with fast-moving fashion trends while supporting ethical labor is difficult, as ethical production cycles are slower and more deliberate than fast fashion timelines.",
    "price-ethics": "Seeking low-cost fashion while supporting ethical practices is often unrealistic — fair wages, safe labor conditions, and environmental safeguards drive up production costs.",
    "materials-quantity": "Wanting a high number of garments made from sustainable materials increases production costs and environmental strain, undermining the very benefits of sustainability through overconsumption.",
    "trend-quality": "Trendy clothing is typically made for short-term use — prioritizing both trendiness and high quality often results in higher prices or creative constraints in design longevity.",
    "materials-price": "Sustainable materials like organic cotton or recycled fibers are more expensive to produce than synthetic alternatives, making it difficult to offer eco-friendly garments at ultra-low prices.",
    "quantity-trend": "Pursuing both quantity and trendiness feeds into fast fashion’s cycle of overproduction and waste — often at the cost of sustainability, ethics, and quality."
  };

  const factorA = document.getElementById("factorA");
  const factorB = document.getElementById("factorB");
  const summary = document.getElementById("comparisonSummary");

  function updateComparison() {
    const a = factorA.value;
    const b = factorB.value;
    const key = `${a}-${b}`;
    const reverseKey = `${b}-${a}`;

    if (a === b) {
      summary.textContent = "Please select two different values.";
    } else if (comparisons[key]) {
      summary.textContent = comparisons[key];
    } else if (comparisons[reverseKey]) {
      summary.textContent = comparisons[reverseKey];
    } else {
      summary.textContent = "This combination is complex — you'll likely have to compromise on other values like cost or accessibility. Consider your priorities carefully.";
    }
  }

  factorA.addEventListener("change", updateComparison);
  factorB.addEventListener("change", updateComparison);

  updateComparison(); // Initialize on load

  // Willingness to Pay Chart
  const payCanvas = document.getElementById("payChart");
  if (payCanvas && typeof Chart !== "undefined") {
    const ctx = payCanvas.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["$1–$5 more", "$6–$10 more", "Over $10"],
        datasets: [{
          data: [33, 25, 17],
          backgroundColor: ["#4ade80", "#facc15", "#f87171"],
          borderColor: "#ffffff",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#222",
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.raw}%`
            }
          }
        }
      }
    });
  }

  const compareSwitch = document.getElementById("compareSwitch");
  const fastFashion = document.getElementById("costTable");
  const sustainable = document.getElementById("sustainableTable");

  if (compareSwitch) {
    compareSwitch.addEventListener("change", () => {
      fastFashion.classList.toggle("hidden");
      sustainable.classList.toggle("hidden");
    });
  }
  
  window.scrollToTrueCost = function () {
    const trueCost = document.getElementById("true-cost");
    if (trueCost) {
      trueCost.scrollIntoView({ behavior: "smooth" });
    }
  };

});

