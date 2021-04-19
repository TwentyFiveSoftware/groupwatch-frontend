import React, { createRef, FunctionComponent, useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { faExpand, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/VideoPlayer.module.scss';
import IconButton from './IconButton';
import ProgressBar from './ProgressBar';
import { RoomContext } from './WatchPage';
import { socket } from '../App';
import VolumeSlider from './VolumeSlider';

const VideoPlayer: FunctionComponent = (): JSX.Element => {
    const [player, setPlayer] = useState<ReactPlayer>();
    const [playerCurrentTime, setPlayerCurrentTime] = useState<number>(0);
    const [isPlayerPlaying, setIsPlayerPlaying] = useState<boolean>(true);
    const [volume, setVolume] = useState<number>(70);

    const room = useContext(RoomContext);
    const playerRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (!isPlayerPlaying === room?.playlist.isVideoPlaying) {
            setIsPlayerPlaying(room?.playlist.isVideoPlaying);
        }
    }, [room?.playlist.isVideoPlaying]);

    useEffect(() => {
        if (!player || !room?.playlist.currentVideoTime) return;
        player.seekTo(room.playlist.currentVideoTime, 'seconds');
    }, [player, room?.playlist.currentVideoTime]);

    useEffect(() => {
        socket.on('videoTimeSync', () => {
            if (!player) return;
            socket.emit('videoTimeSyncResponse', player.getCurrentTime());
        });
    }, [player]);

    const onReady = (player: ReactPlayer): void => {
        setPlayer(player);
        setIsPlayerPlaying(room?.playlist.isVideoPlaying ?? true);
        player.seekTo(room?.playlist.currentVideoTime ?? 0, 'seconds');

        socket.emit('requestVideoTimeSync');
    };

    const onProgress = ({ playedSeconds }: { playedSeconds: number }): void => {
        setPlayerCurrentTime(playedSeconds);
    };

    const onPause = (): void => {
        if (!isPlayerPlaying || !player) return;

        setIsPlayerPlaying(false);
        socket.emit('setVideoPlaying', false, player.getCurrentTime());
    };

    const onPlay = (): void => {
        if (isPlayerPlaying) return;

        setIsPlayerPlaying(true);
        socket.emit('setVideoPlaying', true);
    };

    const onEnded = (): void => changeVideoIndex(1);

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
        if (!playerRef.current || !screenfull.isEnabled) return;
        await screenfull.request(playerRef.current);
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
            <div className={styles.videoWrapper}>
                <div className={styles.video} ref={playerRef}>
                    <ReactPlayer
                        url={room?.playlist.videos[room?.playlist.currentVideoIndex]?.url}
                        width={'100%'}
                        height={'100%'}
                        controls={false}
                        progressInterval={500}
                        playing={isPlayerPlaying}
                        volume={volume / 100}
                        onReady={onReady}
                        onProgress={onProgress}
                        onPlay={onPlay}
                        onPause={onPause}
                        onEnded={onEnded}
                    />
                </div>
            </div>
            <section className={styles.controls}>
                <div className={styles.controlGroup}>
                    <IconButton
                        icon={faStepBackward}
                        onClick={() => changeVideoIndex(-1)}
                        disabled={(room?.playlist.currentVideoIndex ?? 0) <= 0}
                    />

                    {isPlayerPlaying ? (
                        <IconButton icon={faPause} onClick={pauseVideo} />
                    ) : (
                        <IconButton icon={faPlay} onClick={playVideo} />
                    )}

                    <IconButton
                        icon={faStepForward}
                        onClick={() => changeVideoIndex(1)}
                        disabled={(room?.playlist.currentVideoIndex ?? 0) >= (room?.playlist.videos.length ?? 0) - 1}
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
