import React, { useContext, useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player/youtube';
import screenfull from 'screenfull';
import { faExpand, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/VideoPlayer.module.scss';
import IconButton from './IconButton';
import ProgressBar from './ProgressBar';
import { RoomContext } from './WatchPage';
import { socket } from '../App';
import VolumeSlider from './VolumeSlider';

const VideoPlayer = () => {
    const room = useContext(RoomContext);
    if (room === null) return null;

    const [player, setPlayer] = useState<ReactPlayer>();
    const [playerCurrentTime, setPlayerCurrentTime] = useState<number>(0);
    const [isPlayerPlaying, setIsPlayerPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(70);

    useEffect(() => {
        if (!isPlayerPlaying === room.playlist.isVideoPlaying) {
            setIsPlayerPlaying(room.playlist.isVideoPlaying);
        }
    }, [room.playlist.isVideoPlaying]);

    useEffect(() => {
        player?.seekTo(room.playlist.currentVideoTime, 'seconds');
    }, [room.playlist.currentVideoTime]);

    useEffect(() => {
        socket.on('videoTimeSync', () => {
            if (!player) return;
            socket.emit('videoTimeSyncResponse', player.getCurrentTime());
        });
    }, [player]);

    const onReady = (player: ReactPlayer) => {
        setPlayer(player);
        setIsPlayerPlaying(room.playlist.isVideoPlaying);
        player.seekTo(room.playlist.currentVideoTime, 'seconds');

        socket.emit('requestVideoTimeSync');
    };

    const onProgress = ({ playedSeconds }: { playedSeconds: number }) => {
        setPlayerCurrentTime(playedSeconds);
    };

    const onPause = () => {
        if (isPlayerPlaying) {
            setIsPlayerPlaying(false);
            socket.emit('setVideoPlaying', false, player?.getCurrentTime());
        }
    };

    const onPlay = () => {
        if (!isPlayerPlaying) {
            setIsPlayerPlaying(true);
            socket.emit('setVideoPlaying', true);
        }
    };

    const pauseVideo = (): void => {
        socket.emit('setVideoPlaying', false);
        setIsPlayerPlaying(false);
    };

    const playVideo = (): void => {
        socket.emit('setVideoPlaying', true);
        setIsPlayerPlaying(true);
    };

    const changeVideoIndex = (delta: 1 | -1): void => {
        if (room === null) return;
        socket.emit('selectVideoIndex', room.playlist.currentVideoIndex + delta);
    };

    const requestFullscreen = async () => {
        const playerNode = findDOMNode(player);
        if (!playerNode || !screenfull.isEnabled) return;
        await screenfull.request(playerNode as Element);
    };

    const onSeekStart = (): void => {
        setIsPlayerPlaying(false);
        socket.emit('setVideoPlaying', false);
    };

    const onSeekEnd = (seconds: number): void => {
        player?.seekTo(seconds, 'seconds');
        setIsPlayerPlaying(true);

        socket.emit('setVideoPlaying', true, seconds);
    };

    return (
        <main className={styles.main}>
            <div className={styles.video}>
                <ReactPlayer
                    url={room.playlist.videos[room.playlist.currentVideoIndex]?.url}
                    width={'100%'}
                    height={'100%'}
                    config={{ playerVars: {} }}
                    controls={false}
                    progressInterval={500}
                    playing={isPlayerPlaying}
                    volume={volume / 100}
                    // @ts-ignore
                    onReady={onReady}
                    onProgress={onProgress}
                    onPlay={onPlay}
                    onPause={onPause}
                />
            </div>
            <section className={styles.controls}>
                <div className={styles.controlGroup}>
                    <IconButton
                        icon={faStepBackward}
                        onClick={() => changeVideoIndex(-1)}
                        disabled={(room.playlist.currentVideoIndex ?? 0) <= 0}
                    />

                    {isPlayerPlaying ? (
                        <IconButton icon={faPause} onClick={pauseVideo} />
                    ) : (
                        <IconButton icon={faPlay} onClick={playVideo} />
                    )}

                    <IconButton
                        icon={faStepForward}
                        onClick={() => changeVideoIndex(1)}
                        disabled={(room.playlist.currentVideoIndex ?? 0) >= (room.playlist.videos.length ?? 0) - 1}
                    />
                </div>
                <ProgressBar
                    secondsPassed={Math.floor(playerCurrentTime)}
                    totalSeconds={Math.floor(player?.getDuration() ?? 0.1)}
                    onSeekStart={onSeekStart}
                    onSeekEnd={onSeekEnd}
                />
                {screenfull.isEnabled && <IconButton icon={faExpand} onClick={requestFullscreen} />}
                <VolumeSlider volume={volume} setVolume={setVolume} />
            </section>
        </main>
    );
};

export default VideoPlayer;
