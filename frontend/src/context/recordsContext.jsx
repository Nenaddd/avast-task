import React, { createContext } from 'react';

export const RecordsContext = createContext({});

// this is only for demostrational purposes, and may be not suitable for real world app
const RecordsProvider = ({ removeRecord, editRecord, children }) => {

  const eventActions = {
    removeRecord: (index) => removeRecord(index),
    editRecord: (index) => editRecord(index)
  }
  return (
    <RecordsContext.Provider value={eventActions}>
      {children}
    </RecordsContext.Provider>
  );
};

export default RecordsProvider;
