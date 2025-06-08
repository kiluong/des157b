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
    "quantity-ethics": "Choosing more quantity and ethical production increases costs and may reduce quality.",
    "ethics-quantity": "Choosing ethical production and more quantity often means higher prices or lower-quality materials.",
    "price-quality": "Lower price and higher quality are difficult to achieve together — you'll likely compromise on ethics or sustainability.",
    "quality-materials": "High quality and sustainable materials result in longer lifespan but come at a higher price.",
    "trend-ethics": "Staying trendy and ethical is tough — fast fashion usually sacrifices fair labor.",
    "price-ethics": "A low price and ethical production rarely go hand-in-hand — you may need to sacrifice quantity or trendiness.",
    "materials-quantity": "Wanting lots of items made from sustainable materials raises cost and lowers accessibility.",
    "trend-quality": "Trendy clothes aren't always built to last — high quality may mean less trend responsiveness.",
    "materials-price": "Eco-friendly materials often raise prices compared to synthetic alternatives.",
    "quantity-trend": "High quantity and trendiness can drive waste and unsustainable consumption habits."
  };

  const factorA = document.getElementById("factorA");
  const factorB = document.getElementById("factorB");
  const summary = document.getElementById("comparisonSummary");

  function populateFactorB(excludeValue) {
    // Clear all options
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
      summary.textContent = "This combination is complex — you'll likely have to compromise on other values like cost or sustainability.";
    }
  }

  // When dropdown A changes, update B’s options and run comparison
  factorA.addEventListener("change", () => {
    populateFactorB(factorA.value);
    updateComparison();
  });

  // When dropdown B changes, run comparison
  factorB.addEventListener("change", updateComparison);

  // Initial setup
  populateFactorB(factorA.value);
  updateComparison();



});

