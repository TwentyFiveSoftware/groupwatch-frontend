import React, { FunctionComponent } from 'react';
import styles from './styles/App.module.scss';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';

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
