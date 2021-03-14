import { useState } from 'react';

const useArray = (initial) => {
  const [value, setValue] = useState(initial);
  return {
    value,
    add: item => setValue(value => [[...value], item]),
    clear: () => setValue(() => []),
    removeByIndex: index => {
      const clonedValue = [...value];
      clonedValue.splice(index, 1);
      setValue(clonedValue);
    },
    setValue: records => setValue(records),
    updateArray: (index, newValue) => {
      const clonedValue = [...value];
      clonedValue[index].event.type = newValue;
      setValue(value);
    } 
  };
};

export default useArray;
