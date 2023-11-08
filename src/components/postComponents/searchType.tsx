export type videoType =  {
  videoId:string,
  videoTitle:string,
  videoDescription:string,
  channelId:string,
  channelTitle:string,
  ThumbnailsDefaultUrl:string,
  ThumbnailsMediumUrl:string,
  ThumbnailsHighUrl:string,
}

export type formType = {
  playlistThumbnails:File | null,
  playlistTitle:string,
  categoryCode:string,
  videos:videoType[],
  postTimestamp:number
}
export type formResponseType = {
  CODE:number,
  RESULT:any,
  MESSAGE:string | null
}