import PropTypes from 'prop-types'

import Country from './Country'

const CountriesList = (props) => {
    // Case 1: More than 10 countries
    if (props.countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    // Case 2: 1 country
    if (props.countries.length === 1) {
        const country = props.countries[0]
        return (<Country country={country} initialShow={true} />)
    }

    // Case 3: 2-10 countries
    return (
        <div>
            {props.countries.map((country) =>
                <Country key={country.name.common} country={country} />
            )}
        </div>
    )
}

CountriesList.propTypes = {
    countries: PropTypes.array.isRequired
}

export default CountriesList