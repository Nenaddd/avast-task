import React, { createContext } from 'react';

export const RecordsContext = createContext({});

// this is only for demostrational purposes, and may be not suitable for real world app
const RecordsProvider = ({ removeRecord, children }) => {
  return (
    <RecordsContext.Provider value={(index) => removeRecord(index)}>
      {children}
    </RecordsContext.Provider>
  );
};

export default RecordsProvider;
