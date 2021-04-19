import React, { FunctionComponent } from 'react';
import { io } from 'socket.io-client';
import { HashRouter } from 'react-router-dom';
import WatchPage from './components/WatchPage';

export const socket = io(process.env['SOCKET_ENDPOINT'] ?? '');

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    if (hours > 0)
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`;

    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
};

const App: FunctionComponent = (): JSX.Element => {
    return (
        <HashRouter basename={'/'}>
            <WatchPage />
        </HashRouter>
    );
};

export default App;
