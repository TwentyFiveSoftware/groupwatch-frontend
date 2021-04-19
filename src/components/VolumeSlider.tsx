import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import styles from '../styles/VolumeSlider.module.scss';

interface Props {
    volume: number;
    setVolume: (volume: number) => void;
}

const VolumeSlider: FunctionComponent<Props> = ({ volume, setVolume }: Props): JSX.Element => {
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
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
                <div className={styles.overlay} style={{ width: `${volume}%` }} />
            </div>
        </div>
    );
};

export default VolumeSlider;
