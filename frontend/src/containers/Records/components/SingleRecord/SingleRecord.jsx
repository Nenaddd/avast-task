import React, { useContext } from 'react';
import deleteIcon from '../../../../assets/delete.png';
import styles from './styles.module.scss';
import { timestampToReadableDate } from '../../../../global/utils';
import { RecordsContext } from '../../../../context/recordsContext';
import { Text } from '../../../../components/text/text';

const SingleRecord = ({ eventType, time, nodeName, index }) => {
  const removeRecord = useContext(RecordsContext);
  return (
    <div className={styles.singleRecord}>
      <div className={styles.recordInfo}>
        <Text primary semibold>
          {eventType}
        </Text>
        <Text secondary small>
          {timestampToReadableDate(time)}
        </Text>
        <Text secondary small semibold>
          {nodeName}
        </Text>
      </div>
      <div onClick={() => removeRecord(index)}>
        <img src={deleteIcon} alt="delete icon" className={styles.deleteIcon} />
      </div>
    </div>
  );
};

export default SingleRecord;
