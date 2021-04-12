import React, { FunctionComponent } from 'react';
import styles from './styles/App.module.scss';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
};

const App: FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.layout}>
                <VideoPlayer />
                <Playlist />
            </div>
        </div>
    );
};

export default App;
