import React from 'react';
import SearchBar from './search';

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar
      {...props}
      label="pagination search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;
