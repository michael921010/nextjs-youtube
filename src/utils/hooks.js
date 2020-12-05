import { useEffect, useState } from "react";
import { hasData, getBy } from "utils";
import { config } from "@next";
import * as youtube from "apis/youtube";

const skeleton = Boolean(config.ENV_NAME === "test");

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
