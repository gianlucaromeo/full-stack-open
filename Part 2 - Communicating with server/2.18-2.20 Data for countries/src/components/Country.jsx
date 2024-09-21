import PropTypes from 'prop-types'
import { useState } from 'react'

const Country = ({ country, initialShow = false }) => {
    const [show, setShow] = useState(initialShow)

    if (show) {
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