import { GET } from "./common";

// const API_KEY = process.env.YOUTUBE_API_KEY;
const API_KEY = "AIzaSyBIjsExWcIVtcwR9OTgAFvPZ1mi5Y94s2I";
const API_DOMAIN = `https://www.googleapis.com/youtube/v3`;

const searchPart = ["id", "snippet"].join(",");

export const search = (params = {}) =>
  GET(`${API_DOMAIN}/search`, {
    part: searchPart, // 必填，把需要的資訊列出來
    q: params?.q ?? "", // 查詢文字
    id: params?.id,
    pageToken: params.pageToken,
    maxResults: params?.maxResults ?? 10, // 預設為五筆資料，可以設定1~50
    key: API_KEY, // 使用 API 只能取得公開的播放清單
  });

const videoPart = [
  "id",
  "snippet",
  "statistics",
  "player",
  "localizations",
  "recordingDetails",
  "topicDetails",
].join(",");

// const videoPart =
//   "contentDetails,fileDetails,liveStreamingDetails,processingDetails,status,suggestions,topicDetails";

export const videos = (id) =>
  GET(`${API_DOMAIN}/videos`, {
    part: videoPart, // 必填，把需要的資訊列出來
    id,
    key: API_KEY,
  });

const channelPart = [
  "id",
  "snippet",
  "statistics",
  "localizations",
  "topicDetails",
  // "auditDetails",
  "brandingSettings",
  "contentDetails",
  "contentOwnerDetails",
  "status",
].join(",");

export const channels = (id) =>
  GET(`${API_DOMAIN}/channels`, {
    part: channelPart, // 必填，把需要的資訊列出來
    id,
    key: API_KEY,
  });
