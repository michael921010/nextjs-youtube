import { useChannelSections } from "utils/hooks";
import { hasData } from "utils";
import PlayList from "./PlayList";

export default function ChannelSection(props) {
  const { channelSections } = useChannelSections(props?.id);

  return channelSections.map(({ id, contentDetails }) => {
    if (hasData(contentDetails?.playlists)) {
      return contentDetails.playlists.map((playlistId) => {
        return <PlayList id={playlistId} />;
      });
    } else {
      return null;
    }
  });
}
