import React from 'react';
import styles from './styles.module.scss';

const Loading = () => (
    <div className={styles.snippet}>
        <div className={styles.stage}>
            <div className={styles.dotFalling}></div>
        </div>
    </div>
);

export default Loading;
