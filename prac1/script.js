

const weatherData ={
    "Ahmedabad": "40°C",
    "Mumbai": "33°C",
    "Delhi": "38°C",
    "Bengaluru": "29°C",
    "Chennai": "35°C"
};

document.getElementById('getWeatherBtn').addEventListener('click', () =>{
    const city = document.getElementById("cityInput").valuetrim();
    const resultDiv = document.getElementByID("result");

    if (city in weatherData){
        resultDiv.textContent = 'The weather in ${city} is ${weatherData[city]}';
        } else {                    
        resultDiv.textContent = 'Sorry, weather data for ${city} is not available.';
    }
});