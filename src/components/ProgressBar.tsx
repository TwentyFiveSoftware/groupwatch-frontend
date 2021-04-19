import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from '../styles/ProgressBar.module.scss';
import { formatTime } from '../App';

interface Props {
    secondsPassed: number;
    totalSeconds: number;
    onSeekStart: () => void;
    onSeekEnd: (seconds: number) => void;
}

const ProgressBar: FunctionComponent<Props> = ({
    secondsPassed,
    totalSeconds,
    onSeekStart,
    onSeekEnd,
}: Props): JSX.Element => {
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
                    onChange={(e) => setCurrentTime(Number(e.target.value))}
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
