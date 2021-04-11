import React from 'react';
import styles from '../styles/VideoPlayer.module.scss';
import IconButton from './IconButton';
import { faExpand, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './ProgressBar';

const VideoPlayer = () => {
    return (
        <main className={styles.main}>
            <iframe src={''} className={styles.video} />
            <section className={styles.controls}>
                <div className={styles.controlGroup}>
                    <IconButton icon={faStepBackward} />
                    <IconButton icon={faPause} />
                    <IconButton icon={faStepForward} />
                </div>
                <ProgressBar secondsPassed={25} totalSeconds={205} />
                <IconButton icon={faExpand} />
            </section>
        </main>
    );
};

export default VideoPlayer;
