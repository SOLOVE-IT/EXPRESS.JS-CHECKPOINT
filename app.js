const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Custom Middleware: Check if the request is within working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentHour = currentDate.getHours(); // 24-hour format

  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Proceed to the route
  } else {
    res.send(`
      <h1>Sorry, the website is only available during working hours (Mon-Fri, 9AM-5PM).</h1>
      <p>Please visit us during working hours.</p>
    `);
  }
};

// Set Middleware and Static Folder
app.use(workingHoursMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
