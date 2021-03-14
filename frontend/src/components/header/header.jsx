import React from 'react';
import { Button } from '../button/button';
import styles from './styles.module.scss';

const Header = ({ showStats, events, onToggleStats, onRandomShuffle }) => (
  <div className={styles.header}>
    <Button primary>
      <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(events))}`} download='Event Data' disabled={false}>
        Save
      </a>
    </Button>
    <Button onClick={() => onToggleStats(!showStats)} disabled={false} secondary>
      {showStats ? 'Hide' : 'Show'} Stats
      </Button>
    <Button onClick={onRandomShuffle} disabled={false} secondary>
      Shuffle
      </Button>
  </div>
);

export default Header;
