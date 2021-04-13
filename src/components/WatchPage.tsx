import React, { useEffect, useState } from 'react';
import styles from '../styles/WatchPage.module.scss';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import { useHistory, useRouteMatch } from 'react-router-dom';
import type { IRoom } from '../types/Room';
import { socket } from '../App';

const WatchPage = () => {
    const history = useHistory();
    const match = useRouteMatch('/:id');

    const [room, setRoom] = useState<IRoom | null>(null);

    useEffect(() => {
        if (match !== null && room !== null) return;

        const id: string | null = match?.params ? (match.params as { id: string }).id : null;

        socket.emit('join', id);

        socket.on('joinResponse', (joinedRoom: IRoom) => {
            if (room !== null) return;

            if (joinedRoom.id !== id) {
                history.replace(`/${joinedRoom.id}`);
                return;
            }

            setRoom(joinedRoom);
        });
    }, [match]);

    if (room === null) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.layout}>
                <VideoPlayer />
                <Playlist />
            </div>
        </div>
    );
};

export default WatchPage;
