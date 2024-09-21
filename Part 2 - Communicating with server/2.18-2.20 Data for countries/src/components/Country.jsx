import PropTypes from 'prop-types'
import { useState } from 'react'

import weatherService from '../services/weather'
import CountryWeather from './CountryWeather'


const Country = ({ country, initialShow = false }) => {
    const [show, setShow] = useState(initialShow)
    const [weather, setWeather] = useState(null)

    const fetchWeather = (country) => {
        weatherService
            .getWeather(country)
            .then((weather) => {
                setWeather(weather)
            })
            .catch((error) => {
                console.log("Error fetching weather data", error)
            })
    }

    if (show) {
        // Avoid fetching weather data if it's already available
        if (!weather) {
            fetchWeather(country)
        }
        
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
                <h2>languages</h2>
                <ul>
                    {Object.values(country.languages).map((language) => {
                        return <li key={language}>{language}</li>
                    })}
                </ul>
                <img src={country.flags.png} alt={country.name.common} width="100" />
                <CountryWeather weather={weather} />
            </div>
        )
    } else {
        return (
            <div>
                <span>{country.name.common}</span>
                <button onClick={() => setShow(true)}>show</button>
            </div>
        )
    }
}

Country.propTypes = {
    country: PropTypes.object.isRequired,
    initialShow: PropTypes.bool,
}

export default Country