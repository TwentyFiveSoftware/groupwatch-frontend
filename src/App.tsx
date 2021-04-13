import React, { FunctionComponent } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter as Router } from 'react-router-dom';
import WatchPage from './components/WatchPage';

export const socket = io(process.env['SOCKET_ENDPOINT'] ?? '');

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
};

const App: FunctionComponent = () => {
    return (
        <Router>
            <WatchPage />
        </Router>
    );
};

export default App;
