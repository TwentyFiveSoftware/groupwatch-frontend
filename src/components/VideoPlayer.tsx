import React, { useState } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player/youtube';
import screenfull from 'screenfull';
import { faExpand, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/VideoPlayer.module.scss';
import IconButton from './IconButton';
import ProgressBar from './ProgressBar';

const VideoPlayer = () => {
    const [player, setPlayer] = useState<ReactPlayer>();
    const [playerCurrentTime, setPlayerCurrentTime] = useState<number>(0);
    const [isPlayerPlaying, setIsPlayerPlaying] = useState<boolean>(false);

    const onReady = (player: ReactPlayer) => {
        setPlayer(player);
        // setIsPlayerPlaying(true);
    };

    const onProgress = ({ playedSeconds }: { playedSeconds: number }) => {
        setPlayerCurrentTime(playedSeconds);
    };

    const onPause = () => {
        if (isPlayerPlaying) setIsPlayerPlaying(false);
    };

    const onPlay = () => {
        if (!isPlayerPlaying) setIsPlayerPlaying(true);
    };

    const pauseVideo = (): void => {
        setIsPlayerPlaying(false);
    };

    const playVideo = (): void => {
        setIsPlayerPlaying(true);
    };

    const stepForward = (): void => {};
    const stepBackward = (): void => {};

    const requestFullscreen = async () => {
        const playerNode = findDOMNode(player);
        if (!playerNode || !screenfull.isEnabled) return;
        await screenfull.request(playerNode as Element);
    };

    return (
        <main className={styles.main}>
            <div className={styles.video}>
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=gA6ppby3JC8'}
                    width={'100%'}
                    height={'100%'}
                    config={{ playerVars: {} }}
                    controls={false}
                    progressInterval={500}
                    playing={isPlayerPlaying}
                    // @ts-ignore
                    onReady={onReady}
                    onProgress={onProgress}
                    onPlay={onPlay}
                    onPause={onPause}
                />
            </div>
            <section className={styles.controls}>
                <div className={styles.controlGroup}>
                    <IconButton icon={faStepBackward} onClick={stepForward} />

                    {isPlayerPlaying ? (
                        <IconButton icon={faPause} onClick={pauseVideo} />
                    ) : (
                        <IconButton icon={faPlay} onClick={playVideo} />
                    )}

                    <IconButton icon={faStepForward} onClick={stepBackward} />
                </div>
                <ProgressBar
                    secondsPassed={Math.floor(playerCurrentTime)}
                    totalSeconds={Math.floor(player?.getDuration() ?? 1)}
                />
                {screenfull.isEnabled && <IconButton icon={faExpand} onClick={requestFullscreen} />}
            </section>
        </main>
    );
};

export default VideoPlayer;
