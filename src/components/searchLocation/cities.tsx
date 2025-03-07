'use client';

import { CitiesProps, fetchCities } from '@/utils/fetchStates';
import { useEffect, useState } from 'react';

export default function Cities() {
  const [cities, setCities] = useState<CitiesProps[]>([]);
  const [selectLetter, setSelectLetter] = useState('');

  const alphabet = [];
  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  useEffect(() => {
    async function loadStates() {
      const citiesData = await fetchCities();

      setCities(citiesData);
    }
    loadStates();
  }, []);

  return (
    <div className="w-full">
      <div className="flex-wrap flex justify-center text-[15px] gap-2 my-5">
        {alphabet.map(letter => (
          <button
            key={letter}
            className={`
              w-[1rem] 
              h-[1rem] 
              p-[12px]
              pb-[11px]
              ${selectLetter === letter ? 'bg-[#4338ca]' : ''}
              ${selectLetter === letter ? 'text-white' : ''}
              flex 
              justify-center 
              items-center 
              rounded-[4px]
            `}
            onClick={() => setSelectLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <ul>
        {cities.map(city => (
          <li key={city.id}>{city.nome}</li>
        ))}
      </ul>
    </div>
  );
}
