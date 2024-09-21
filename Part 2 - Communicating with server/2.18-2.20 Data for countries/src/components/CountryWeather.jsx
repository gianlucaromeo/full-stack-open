import PropTypes from 'prop-types'

const CountryWeather = ({ weather }) => {
    if (!weather) {
        return null
    }

    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

CountryWeather.propTypes = {
    weather: PropTypes.object,
}

export default CountryWeather