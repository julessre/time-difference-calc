'use client';
import { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function TimeDifferenceCalculator() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  async function getTimeDifference() {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?country=${country}&state=${region}&apiKey=${process.env.REACT_APP_API_KEY}`,
    );
  }

  return (
    <div className="bg-cold-white w-dvw h-dvh">
      <div className="p-5 my-5 text-xl mt-10 mr-1">
        <div className="text-center">
          <h1 className="text-3xl font-medium font-sans text-redi-red">
            Time Difference Calculator
          </h1>
          <div>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
              className="inline-flex p-5 my-5 mr-1 justify-center gap-x-1. rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blu-blue hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            />
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
              className="inline-flex p-5 my-5 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blu-blue hover:bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
