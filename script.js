async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();

  const rows = text.trim().split("\n").slice(1);
  return rows.map(r => {
    const [date, km] = r.split(",");
    return { date, km: parseFloat(km) };
  });
}

async function plotChart(canvasId, csvFile, label) {
  const data = await loadCSV(csvFile);

  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label,
        data: data.map(d => d.km),
        borderWidth: 2,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { title: { display: true, text: "Kilometers" } },
        x: { title: { display: true, text: "End Date" } }
      }
    }
  });
}

plotChart("weeklyChart", "weekly_mileage.csv", "Weekly km");
plotChart("monthlyChart", "monthly_mileage.csv", "Monthly km");