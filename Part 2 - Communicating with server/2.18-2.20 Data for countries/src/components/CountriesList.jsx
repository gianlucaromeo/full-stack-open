import PropTypes from 'prop-types'

const CountriesList = (props) => {
    if (props.countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (props.countries.length === 1) {
        const country = props.countries[0]
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
    }

    return (
        <div>
            {props.countries.map((country) => {
                return (
                    <p key={country.name.common}>{country.name.common}</p>
                )
            })}
        </div>
    )
}

CountriesList.propTypes = {
    countries: PropTypes.array.isRequired
}

export default CountriesList