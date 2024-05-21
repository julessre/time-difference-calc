'use client';
import { differenceInHours } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function PickLocation() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [timezone, setTimezone] = useState('');
  const [timeDifference, setTimeDifference] = useState(null);

  const calculateTimeDifference = () => {
    const currentTime = new Date();
    console.log('currenttime:', currentTime);

    // Get the time in the specified location
    const locationTime = toZonedTime(new Date(), timezone);
    console.log('locationTime:', locationTime);

    // Calculate the time difference
    const diff = differenceInHours(locationTime, currentTime);
    console.log('diff:', diff);

    return diff;
  };

  useEffect(() => {
    const getTimeDifference = async () => {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?country=${country}&state=${region}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
      );

      const data = await response.json();
      // const coordinates = data.features?.[0].geometry?.coordinates;
      const timezoneOffset = data.features?.[0].properties?.timezone.offset_DST;

      // console.log('Coord:', coordinates);
      // console.log('timezone:', timezone);
      if (timezoneOffset) {
        setTimezone(timezoneOffset);
        const timeDiff = calculateTimeDifference();
        setTimeDifference(timeDiff);
      }
      // console.log('timeDifference:', timeDifference);
    };
    getTimeDifference().catch(console.error);
  });

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
          <div className="text-2xl font-regular font-sans text-blu-blue">
            Timezone: {timezone}
          </div>
          <div className="text-2xl font-regular font-sans text-blu-blue">
            Time Difference to your location:{' '}
            <span className="font-bold ">{timeDifference} hours </span>
          </div>
        </div>
      </div>
    </div>
  );
}
