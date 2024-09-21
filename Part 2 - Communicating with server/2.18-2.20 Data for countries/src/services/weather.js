import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY // Ensure the environment variable is correctly named

const getWeather = (country) => {
    // If I type "He", the first country that appears is "Heard Island and McDonald Islands" but latlang is not in "capitalInfo" - edge case
    if (!country.capitalInfo.latlng) {
        console.log("No weather data available for", country.name.common)
        return Promise.reject("No weather data available")
    }

    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    const request = axios.get(
        `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )

    return request.then(response => response.data)
}

export default { getWeather }
