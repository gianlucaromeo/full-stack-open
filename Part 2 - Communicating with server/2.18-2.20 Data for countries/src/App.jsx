import { useState, useEffect } from 'react'

import countriesService from './services/countries'
import CountriesList from './components/CountriesList'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries)
    })
  }, [])

  const onSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = search
    ? countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    : countries

  return (
    <div>
      <span>find countries</span>
      <input value={search} onChange={onSearchChange}></input>
      <CountriesList countries={countriesToShow} />
    </div>
  )
}

export default App
