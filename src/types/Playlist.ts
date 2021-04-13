export interface IPlaylist {
    videos: IVideo[];
    currentVideoIndex: number;
}

export interface IVideo {
    url: string;
    title: string;
    channel: string;
    duration: number;
}
