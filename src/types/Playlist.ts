export interface IPlaylist {
    videos: IVideo[];
    currentVideoIndex: number;
    isVideoPlaying: boolean;
    currentVideoTime: number;
}

export interface IVideo {
    url: string;
    title: string;
    channel: string;
    duration: number;
}
