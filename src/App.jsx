import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('https://restcountries.com/v3.1/all');
        const data = await resp.json();
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(data);
  }, [search, countries]);

  return (
    <div className="App">
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="country-container">
        {(search === '' ? countries : filtered).map((country) => (
          <div className="countryCard" key={country.cca3}>
            <img src={country.flags.png} alt={country.name.common}></img>
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
