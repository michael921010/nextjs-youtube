import { useEffect, useState } from "react";
import { hasData, getBy } from "utils";
import * as youtube from "apis/youtube";

const skeleton = Boolean(process.env.ENV === "test");

const useYoutubeAPI = (func, args) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function () {
      if (skeleton) return;

      try {
        if (typeof func === "function") {
          setError(false);
          setLoading(true);

          const { status, data } = await func(args);

          if (status === 200) {
            setData(data);
          } else {
            throw `API success, status: ${status}`;
          }
        } else {
          throw "API function error!";
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [func, args]);

  return { loading, error, data };
};

export const useChannels = (channelId) => {
  return useYoutubeAPI(youtube.channels, channelId);
};

export const useChannel = (channelId) => {
  const { data: channels, ...args } = useChannels(channelId);
  const channel = getBy("find")({ id: channelId })(channels?.items ?? []);

  return { channel, ...args };
};

export const useVideos = (videoId) => {
  return useYoutubeAPI(youtube.videos, videoId);
};

export const useVideo = (videoId) => {
  const { data: videos, ...args } = useVideos(videoId);
  const video = getBy("find")({ id: videoId })(videos?.items ?? []);

  return { video, ...args };
};

export const useChannelSections = (channelId) => {
  const { data, ...args } = useYoutubeAPI(youtube.channelSections, channelId);
  const channelSections = data?.items ?? [];

  return { channelSections, ...args };
};

export const usePlaylists = (playlistId) => {
  return useYoutubeAPI(youtube.playlists, playlistId);
};

export const usePlaylist = (playlistId) => {
  const { data: playlists, ...args } = usePlaylists(playlistId);
  const playlist = getBy("find")({ id: playlistId })(playlists?.items ?? []);

  return { playlist, ...args };
};

export const usePlaylistItems = (playlistId) => {
  return useYoutubeAPI(youtube.playlistItems, playlistId);
};
