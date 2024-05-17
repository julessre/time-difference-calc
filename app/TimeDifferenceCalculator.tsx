'use client';
import { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function TimeDifferenceCalculator() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  return (
    <div className="p-5 my-5 text-xl mt-10 mr-1">
      <div className="text-center">
        <h1 className="text-3xl font-medium font-sans">
          Time Difference Calculator
        </h1>
        <div>
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
          />
        </div>
      </div>
    </div>
  );
}
