import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from '../styles/WatchPage.module.scss';
import type { IRoom } from '../types/Room';
import { socket } from '../App';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';

export const RoomContext = createContext<IRoom | null>(null);

const WatchPage: FunctionComponent = (): JSX.Element | null => {
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
    }, [history, match, room]);

    useEffect(() => {
        socket.on('roomUpdate', (room: IRoom) => setRoom(room));
    }, []);

    if (room === null) return null;

    return (
        <RoomContext.Provider value={room}>
            <div className={styles.wrapper}>
                <div className={styles.layout}>
                    <VideoPlayer />
                    <Playlist />
                </div>
            </div>
        </RoomContext.Provider>
    );
};

export default WatchPage;
