import { useCallback, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { FixedSizeList as List } from 'react-window';

export type Options = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  options: Options[];
  label?: string;
  placeholder?: string;
  setSelectedOption: (option: Options) => void;
};

const MenuList = (props: any) => {
  const { options, children, maxHeight } = props;
  const height = 35;

  return (
    <components.MenuList {...props}>
      <List
        height={maxHeight}
        itemCount={options.length}
        itemSize={height}
        width="100%"
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </components.MenuList>
  );
};

export function SelectDropdown({
  options,
  label,
  placeholder,
  setSelectedOption,
}: SelectDropdownProps) {
  const [filteredOptions, setFilteredOptions] = useState<Options[]>(options);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = useCallback(
    (inputValue: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const filtered = options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setFilteredOptions(filtered);
      }, 2000);
    },
    [options],
  );

  const handleChange = (option: Options | null) => {
    setSelectedOption(option as Options);
  };

  return (
    <div>
      <label htmlFor="" className="text-[14px] text-blue-500 font-bold">
        {label}
      </label>
      <Select
        options={filteredOptions}
        isClearable
        placeholder={placeholder}
        onInputChange={handleInputChange}
        components={{ MenuList }}
        onChange={handleChange}
      />
    </div>
  );
}
