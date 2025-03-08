'use client';

import { fetchStates, StatesProps } from '@/utils/fetchStates';
import { useEffect, useRef, useState } from 'react';

export default function SelectSearch() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState<StatesProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [states, setStates] = useState<StatesProps[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadStates() {
      const statesData = await fetchStates();
      setStates(statesData);
    }
    loadStates();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredStates = states.filter(({ nome, sigla }) =>
    `${nome} ${sigla}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative mt-10 w-full" ref={dropdownRef}>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg focus:outline-none text-[14px] px-4 py-2"
        placeholder="Digite o estado..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setSelectedState(null);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && filteredStates.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredStates.map(state => (
            <div
              key={state.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-[14px]"
              onClick={() => {
                setSelectedState(state);
                setQuery(`${state.nome} - ${state.sigla}`); // 🔹 Define `query` com o nome do estado
                setIsOpen(false);
              }}
            >
              {state.nome} - {state.sigla}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
