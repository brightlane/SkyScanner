// Import necessary modules
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define API endpoints (you can replace these with real APIs)
const FLIGHT_API_URL = 'https://api.example.com/flights';
const HOTEL_API_URL = 'https://api.example.com/hotels';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const SEO_API_URL = 'https://api.example.com/seo-updates';
const AFFILIATE_LINK = 'https://affiliate.example.com?ref=your-affiliate-id'; // Your affiliate link

// Function to fetch flight data
const fetchFlightData = async () => {
  try {
    const response = await axios.get(FLIGHT_API_URL);
    const flightData = response.data;
    console.log("Flight data fetched successfully");
    updateFlightData(flightData);
  } catch (error) {
    console.error("Error fetching flight data:", error);
  }
};

// Function to fetch hotel data
const fetchHotelData = async () => {
  try {
    const response = await axios.get(HOTEL_API_URL);
    const hotelData = response.data;
    console.log("Hotel data fetched successfully");
    updateHotelData(hotelData);
  } catch (error) {
    console.error("Error fetching hotel data:", error);
  }
};

// Function to fetch weather data
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${WEATHER_API_URL}?q=${city}&appid=your-weather-api-key`);
    const weatherData = response.data;
    console.log("Weather data fetched successfully");
    updateWeatherData(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Function to update flight-related content on flights.html
const updateFlightData = (flightData) => {
  const flightFilePath = path.join(__dirname, 'flights.html');
  let htmlContent = '<h2>Available Flights</h2>';
  
  flightData.forEach(flight => {
    htmlContent += `
      <div class="flight">
        <h3>${flight.name}</h3>
        <p>Price: ${flight.price}</p>
        <a href="${flight.url}">Book Now</a>
      </div>
    `;
  });

  fs.writeFileSync(flightFilePath, htmlContent, 'utf8');
  console.log("Flight data updated on flights.html");
  updateAffiliateLinks(flightFilePath); // Update affiliate links
};

// Function to update hotel-related content on hotels.html
const updateHotelData = (hotelData) => {
  const hotelFilePath = path.join(__dirname, 'hotels.html');
  let htmlContent = '<h2>Available Hotels</h2>';
  
  hotelData.forEach(hotel => {
    htmlContent += `
      <div class="hotel">
        <h3>${hotel.name}</h3>
        <p>Price: ${hotel.price}</p>
        <a href="${hotel.url}">Book Now</a>
      </div>
    `;
  });

  fs.writeFileSync(hotelFilePath, htmlContent, 'utf8');
  console.log("Hotel data updated on hotels.html");
  updateAffiliateLinks(hotelFilePath); // Update affiliate links
};

// Function to update weather-related content on weather.html
const updateWeatherData = (weatherData) => {
  const weatherFilePath = path.join(__dirname, 'weather.html');
  let htmlContent = `<h2>Weather for ${weatherData.name}</h2>`;
  htmlContent += `
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Condition: ${weatherData.weather[0].description}</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
  `;

  fs.writeFileSync(weatherFilePath, htmlContent, 'utf8');
  console.log("Weather data updated on weather.html");
};

// Function to update affiliate links in HTML files
const updateAffiliateLinks = (htmlFilePath) => {
  fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    
    let updatedHtml = data.replace(/href="([^"]*)"/g, (match, p1) => {
      if (!p1.includes('affiliate')) {
        return `href="${p1}?aff_id=your-affiliate-id"`; // Append your affiliate ID
      }
      return match;
    });

    fs.writeFile(htmlFilePath, updatedHtml, 'utf8', (err) => {
      if (err) throw err;
      console.log(`Affiliate links updated in ${htmlFilePath}`);
    });
  });
};

// Function to generate SEO-friendly content
const generateSEOContent = async () => {
  try {
    const response = await axios.get(SEO_API_URL);
    const seoData = response.data;
    console.log("SEO data fetched successfully");
    updateSEOContent(seoData);
  } catch (error) {
    console.error("Error fetching SEO data:", error);
  }
};

// Function to update SEO content (meta tags, keywords) in seo.html
const updateSEOContent = (seoData) => {
  const seoFilePath = path.join(__dirname, 'seo.html');
  let htmlContent = `
    <meta name="description" content="${seoData.description}">
    <meta name="keywords" content="${seoData.keywords}">
    <meta name="author" content="${seoData.author}">
  `;

  fs.writeFileSync(seoFilePath, htmlContent, 'utf8');
  console.log("SEO content updated on seo.html");
};

// Main function to run all tasks
const runAutomation = async () => {
  // Fetch and update data for flight, hotel, weather, and SEO content
  await fetchFlightData();
  await fetchHotelData();
  await fetchWeatherData('New York'); // Change city as needed
  await generateSEOContent();
};

// Run the automation every day at midnight (or set your preferred time)
setInterval(runAutomation, 24 * 60 * 60 * 1000); // Run every 24 hours (86400000ms)
