import { options } from '@/mocks/options-services';

type CheckboxListProps = {
  selectedOptions: string[];
  otherValue: string;
  label: string;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setOtherValue: React.Dispatch<React.SetStateAction<string>>;
};

export function CheckboxList({
  otherValue,
  selectedOptions,
  label,
  setOtherValue,
  setSelectedOptions,
}: CheckboxListProps) {
  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option],
    );
  };

  return (
    <div>
      <p className="text-[14px] text-blue-500 font-bold mb-1">{label}</p>
      <div className="flex flex-col gap-2">
        {options.map(option => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 "
            />
            <span className="text-[14px]">{option}</span>
          </label>
        ))}

        {selectedOptions.includes('Outros') && (
          <input
            type="text"
            placeholder="Especifique..."
            value={otherValue}
            onChange={e => setOtherValue(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        )}
      </div>
    </div>
  );
}
