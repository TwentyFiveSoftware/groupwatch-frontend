import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import styles from '../styles/Playlist.module.scss';
import InputBox from './InputBox';
import { formatTime, socket } from '../App';
import { RoomContext } from './WatchPage';

const Playlist = () => {
    const room = useContext(RoomContext);

    const addVideoToPlaylist = (url: string) => {
        if (ReactPlayer.canPlay(url)) {
            socket.emit('addVideoToPlaylist', url);
            return;
        }

        alert("The video can't be played!");
    };

    return (
        <aside className={styles.sidebar}>
            <InputBox placeholder={'Enter a YouTube video URL'} onSubmit={addVideoToPlaylist} />

            <h3 className={styles.subtitle}>Playlist</h3>
            <ul className={styles.playlist}>
                {room?.playlist.videos.map((video, index) => (
                    <li className={styles.entry} key={index + video.url}>
                        <span className={styles.index}>{index + 1}</span>
                        <div className={styles.info}>
                            <p className={styles.videoCreator}>{video.channel}</p>
                            <p className={styles.videoTitle}>{video.title}</p>
                        </div>
                        <span>{formatTime(video.duration)}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Playlist;
