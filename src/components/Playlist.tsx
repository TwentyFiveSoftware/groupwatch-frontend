import React from 'react';
import styles from '../styles/Playlist.module.scss';
import type { IPlaylist } from '../types/Playlist';
import InputBox from './InputBox';
import { formatTime } from '../App';

const Playlist = () => {
    const playlist: IPlaylist = {
        videos: [
            {
                url: 'https://www.youtube.com/watch?v=gA6ppby3JC8',
                title: 'Starship | SN10 | High-Altitude Flight Recap',
                channel: 'SpaceX',
                duration: 108,
            },
        ],
    };

    return (
        <aside className={styles.sidebar}>
            <InputBox placeholder={'Enter a YouTube video URL'} />

            <h3 className={styles.subtitle}>Playlist</h3>
            <ul className={styles.playlist}>
                {playlist.videos.map((video, index) => (
                    <li className={styles.entry} key={video.url}>
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
