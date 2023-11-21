
export type TabData = {
  name:string,
  content: React.ReactNode;
}
export type playlistData = {
  ID:number,
  USER_ID:string,
  USER_NAME:string,
  PLAYLIST_UID:string,
  PLAYLIST_NAME:string,
  PLAYLIST_THUMBNAIL:string,
  PLAYLIST_UPDATED_AT:string,
  PLAYLIST_CREATED_AT:string,
  VIDEO_COUNT:number,
  CATEGORY_NAME:number,
  COMMENT_COUNT:number,
  LIKE_COUNT:number,
  IS_LIKED:string,
  IS_FOLLOW:string,
  IS_FOLLOWER:string
}
export type UserData = {
  USER_ID:string,
  USER_NAME:string,
  FOLLOWER_COUNT:string,
  FOLLOWING_COUNT:string,
  IS_FOLLOWING:string | null,
  IS_FOLLOWED_BY:string | null,
  IS_SELF:string | null
}
export type ListItem =  {
  TAB_TITLE:string
}