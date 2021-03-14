import React from 'react';
import SingleRecord from './components/SingleRecord/SingleRecord';
import styles from './styles.module.scss';

const Records = ({ records }) =>  (
    <div className={styles.recordsContainer}>
      {records.map((record, index) => (
        <SingleRecord
          key={`${record.time}`}
          eventType={record.event.type}
          time={record.time}
          nodeName={record.setup.nodeName}
          index={index}
        />
      ))}
    </div>
  );

export default Records;
