export interface IPlaylist {
    videos: IVideo[];
}

export interface IVideo {
    url: string;
    title: string;
    channel: string;
    duration: number;
}
