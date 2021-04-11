import React from 'react';
import styles from '../styles/Playlist.module.scss';
import InputBox from './InputBox';

const Playlist = () => {
    return (
        <aside className={styles.sidebar}>
            <InputBox placeholder={'Enter a YouTube video URL'} />

            <h3 className={styles.subtitle}>Playlist</h3>
            <ul className={styles.playlist}>
                <li className={styles.entry}>
                    <span className={styles.index}>1</span>
                    <div className={styles.info}>
                        <p className={styles.videoCreator}>#CHANNEL</p>
                        <p className={styles.videoTitle}>xxxx</p>
                    </div>
                    <span>12:34</span>
                </li>
                <li className={styles.entry}>
                    <span className={styles.index}>2</span>
                    <div className={styles.info}>
                        <p className={styles.videoCreator}>#CHANNEL</p>
                        <p className={styles.videoTitle}>xxxxx</p>
                    </div>
                    <span>12:34</span>
                </li>
            </ul>
        </aside>
    );
};

export default Playlist;
