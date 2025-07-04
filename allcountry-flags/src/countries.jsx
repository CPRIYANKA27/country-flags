import React, { useEffect, useState } from "react";
import "./CountryList.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <div className="country-card" key={country.name}>
          <img src={country.flag} alt={`Flag of ${country.name}`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Countries;
