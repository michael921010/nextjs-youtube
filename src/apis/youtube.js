import { GET } from "./common";

const API_KEY = process.env.YOUTUBE_API_KEY;
const API_DOMAIN = `https://www.googleapis.com/youtube/v3`;

const _search = ({ id, q, maxResults }) => {
  return GET(`${API_DOMAIN}/search`, {
    part: "id,snippet", // 必填，把需要的資訊列出來
    q, // 查詢文字
    id,
    maxResults, // 預設為五筆資料，可以設定1~50
    key: API_KEY, // 使用 API 只能取得公開的播放清單
  });
};

export const search = (q = "", maxResults = 10) => _search({ q, maxResults });

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

export const videos = (id) => {
  return GET(`${API_DOMAIN}/videos`, {
    part: videoPart, // 必填，把需要的資訊列出來
    id,
    key: API_KEY, // 使用 API 只能取得公開的播放清單
  });
};
