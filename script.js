const API_KEY = "9b6ff151c8e6916686763632dc834fc0";

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("result").innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
      <p>📊 Pressure: ${data.main.pressure} hPa</p>
    `;

    saveSearch(city);
    showHistory();

  } catch (error) {
    document.getElementById("result").innerHTML =
      `<p>❌ ${error.message}</p>`;
  }
}

function saveSearch(city) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push(city);

  localStorage.setItem("history", JSON.stringify(history));
}

function showHistory() {
  const history =
    JSON.parse(localStorage.getItem("history")) || [];

  document.getElementById("history").innerHTML =
    history.map(city => `<li>${city}</li>`).join("");
}

showHistory();