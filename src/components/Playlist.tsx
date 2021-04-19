import React, { FunctionComponent, useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import styles from '../styles/Playlist.module.scss';
import { SocketEventType } from '../types/SocketEventType';
import InputBox from './InputBox';
import { formatTime, socket } from '../App';
import { RoomContext } from './WatchPage';

const Playlist: FunctionComponent = (): JSX.Element => {
    const [videoUrlInput, setVideoUrlInput] = useState<string>('');
    const room = useContext(RoomContext);

    const addVideoToPlaylist = (url: string): void => {
        if (url.length === 0) return;

        if (ReactPlayer.canPlay(url)) {
            socket.emit(SocketEventType.PLAYLIST_ADD_VIDEO, url);
            setVideoUrlInput('');
            return;
        }

        alert("The video can't be played!");
    };

    const selectVideoIndex = (index: number): void => {
        socket.emit(SocketEventType.PLAYLIST_SELECT_VIDEO, index);
    };

    return (
        <aside className={styles.sidebar}>
            <InputBox
                placeholder={'Enter a YouTube video URL'}
                value={videoUrlInput}
                onInput={setVideoUrlInput}
                onSubmit={addVideoToPlaylist}
            />

            <h3 className={styles.subtitle}>Playlist</h3>
            <ul className={styles.playlist}>
                {room?.playlist.videos.map((video, index) => (
                    <li
                        className={index === room?.playlist.currentVideoIndex ? styles.entry__current : styles.entry}
                        key={index + video.url}
                        onClick={() => selectVideoIndex(index)}
                    >
                        <span className={styles.index}>{index + 1}</span>
                        <div className={styles.info}>
                            <p className={styles.videoCreator}>{video.channel}</p>
                            <p className={styles.videoTitle}>
                                <abbr title={video.title}>{video.title}</abbr>
                            </p>
                        </div>
                        <span>{formatTime(video.duration)}</span>
                    </li>
                ))}

                {room?.playlist.videos.length === 0 && <p className={styles.emptyMessage}>NO VIDEOS IN PLAYLIST</p>}
            </ul>
        </aside>
    );
};

export default Playlist;
