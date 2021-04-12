import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from '../styles/ProgressBar.module.scss';
import { formatTime } from '../App';

const ProgressBar: FunctionComponent<{
    secondsPassed: number;
    totalSeconds: number;
    onSeekStart: Function;
    onSeekEnd: Function;
}> = ({ secondsPassed, totalSeconds, onSeekStart, onSeekEnd }) => {
    const [currentTime, setCurrentTime] = useState<number>(secondsPassed);

    useEffect(() => setCurrentTime(secondsPassed), [secondsPassed]);

    return (
        <div className={styles.container}>
            <span>{formatTime(currentTime)}</span>

            <div className={styles.barWrapper}>
                <input
                    type={'range'}
                    min={0}
                    max={totalSeconds}
                    value={currentTime}
                    className={styles.bar}
                    // @ts-ignore
                    onChange={(e) => setCurrentTime(e.target.value)}
                    onMouseDown={() => onSeekStart()}
                    onMouseUp={() => onSeekEnd(currentTime)}
                />
                <div className={styles.barProgress} style={{ width: `${(currentTime / totalSeconds) * 100}%` }} />
            </div>

            <span>{formatTime(totalSeconds)}</span>
        </div>
    );
};

export default ProgressBar;
