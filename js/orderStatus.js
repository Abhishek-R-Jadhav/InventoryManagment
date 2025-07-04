
 // Show current date
    const dateEl = document.getElementById("currentDate");
    const clockEl = document.getElementById("liveClock");

    function updateDateTime() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-IN', options);

      const time = now.toLocaleTimeString('en-IN');
      clockEl.textContent = time;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

