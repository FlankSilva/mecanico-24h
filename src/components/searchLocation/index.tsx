import Cities from './cities';
import SelectSearch from './selectSearch';

export default function SearchLocation() {
  return (
    <div>
      <h3>Busque por estado ou cidade</h3>

      <SelectSearch />
      <Cities />
    </div>
  );
}
