  // Fixed chart visibility issue
  function renderTaskChart() {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  let completed = 0, pending = 0;
  Object.values(allTasks).forEach(tasks =>
    tasks.forEach(t => t.done ? completed++ : pending++)
  );
  const ctx = document.getElementById('tasksChart').getContext('2d');
  if (window.tasksChartObj) window.tasksChartObj.destroy();
 window.tasksChartObj = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [completed, pending],
      backgroundColor: ['#4caf50', '#f44336'],
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false
  }
});

}

function renderMoodChart() {
  const moods = JSON.parse(localStorage.getItem("moods") || "[]");
  const moodTypes = ['😊', '😢', '😡', '😴', '😍'];
  const moodCounts = moodTypes.map(mood =>
    moods.filter(m => m === mood).length
  );
  const ctx = document.getElementById('moodChart').getContext('2d');
  if (window.moodChartObj) window.moodChartObj.destroy();
  window.moodChartObj = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: moodTypes,
      datasets: [{
        label: 'Mood Frequency',
        data: moodCounts,
        backgroundColor: ['#ffb6c1', '#d3d3d3', '#ffa500', '#aeeaae', '#ff4d4d'],
      }]
    }
  });
}

function renderEventChart() {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  // Group events by month (YYYY-MM)
  const eventCounts = {};
  events.forEach(e => {
    if (!e.date) return;
    const month = e.date.slice(0, 7); // "YYYY-MM"
    if (!eventCounts[month]) eventCounts[month] = 0;
    eventCounts[month]++;
  });
  // Sort months
  const months = Object.keys(eventCounts).sort();
  const counts = months.map(month => eventCounts[month]);

  const ctx = document.getElementById('eventChart').getContext('2d');
  if (window.eventChartObj) window.eventChartObj.destroy();
  window.eventChartObj = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Events per Month',
        data: counts,
        borderColor: '#52b1ff',
        backgroundColor: 'rgba(82,177,255,0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Month' } },
        y: { title: { display: true, text: 'Event Count' }, beginAtZero: true }
      }
    }
  });
}