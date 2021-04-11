import React, { FunctionComponent } from 'react';
import styles from '../styles/ProgressBar.module.scss';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
};

const ProgressBar: FunctionComponent<{ secondsPassed: number; totalSeconds: number }> = ({
    secondsPassed,
    totalSeconds,
}) => {
    return (
        <div className={styles.container}>
            <span>{formatTime(secondsPassed)}</span>
            <div className={styles.barWrapper}>
                <div className={styles.bar} style={{ width: `${(secondsPassed / totalSeconds) * 100}%` }} />
            </div>
            <span>{formatTime(totalSeconds)}</span>
        </div>
    );
};

export default ProgressBar;
