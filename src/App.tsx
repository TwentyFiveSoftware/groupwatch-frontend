import React, { FunctionComponent } from 'react';
import styles from './styles/App.module.scss';
import VideoPlayer from './components/VideoPlayer';

const App: FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.layout}>
                <VideoPlayer />
                <aside></aside>
            </div>
        </div>
    );
};

export default App;
