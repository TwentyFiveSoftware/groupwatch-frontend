import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import styles from '../styles/VolumeSlider.module.scss';

const VolumeSlider: FunctionComponent<{ volume: number; setVolume: Function }> = ({ volume, setVolume }) => {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faVolumeUp} className={styles.icon} />

            <div className={styles.wrapper}>
                <input
                    type={'range'}
                    min={0}
                    max={100}
                    value={volume}
                    className={styles.slider}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <div className={styles.overlay} style={{ width: `${volume}%` }} />
            </div>
        </div>
    );
};

export default VolumeSlider;
