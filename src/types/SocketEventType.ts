export enum SocketEventType {
    ROOM_JOIN = 'roomJoin',
    ROOM_JOIN_RESPONSE = 'roomJoinResponse',
    PLAYLIST_UPDATE = 'playlistUpdate',
    PLAYLIST_ADD_VIDEO = 'playlistAddVideo',
    PLAYLIST_SELECT_VIDEO = 'playlistSelectVideo',
    PLAYLIST_SET_VIDEO_PLAYING = 'playlistSetVideoPlaying',
    PLAYLIST_VIDEO_TIME_SYNC_REQUEST = 'videoTimeSyncRequest',
    PLAYLIST_VIDEO_TIME_SYNC_RESPONSE = 'videoTimeSyncResponse',
}
