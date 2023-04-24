import React, { useState, useEffect } from "react";
import axios from "axios";


const Index = () => {
  // Define state variables
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryStates, setSelectedCountryStates] = useState([]);

  // Fetch country data from API using useEffect hook
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/info?returns=currency,unicodeFlag,dialCode")
      .then((response) => {
        setCountries(response.data.data.slice(8, 18)); // Store the data for 10 countries in the state variable
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Event handler for when a country is clicked
  const handleCountryClick = (country) => {
    setSelectedCountry(country); // Set the selected country in state
    setSelectedCountryStates([]); // Clear any existing state data
  };

  // Event handler for when a country flag is clicked
  const handleFlagClick = () => {
    axios
      .get(`https://countriesnow.space/api/v0.1/countries/states?country=${selectedCountry.name}`)
      .then((response) => {
        const countryData = response.data.data.find((country) => country.name === selectedCountry.name);
        setSelectedCountryStates(countryData.states.slice(0, 10)); // Store the data for the first 10 states in the selected country
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Event handler for when the Back button is clicked
  const handleBackClick = () => {
    setSelectedCountry(null); // Clear the selected country from state
    setSelectedCountryStates([]); // Clear any existing state data
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue'
    }}>
      {selectedCountryStates.length > 0 ? (
        <div>
          <button onClick={handleBackClick}>Back</button>
          <h3>10 states from {selectedCountry.name} and their state codes</h3>
          <ul>
            {selectedCountryStates.map((state) => (
              <li key={state.name}>
                {state.name} ({state.state_code})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>10 Countries</h1>
          <ul>
            {countries.map((country) => (
              <li key={country.name}>
                <button onClick={() => handleCountryClick(country)}>
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
          {selectedCountry && (
            <div>
              <h2>{selectedCountry.name}</h2>
              <img
                src={selectedCountry.unicodeFlag}
                alt={selectedCountry.name}
                onClick={handleFlagClick}
              />
              <p>Currency: {selectedCountry.currency}</p>
              <p>Dial code: {selectedCountry.dialCode}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;




