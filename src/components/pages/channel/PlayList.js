import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePlaylistItems, usePlaylist } from "utils/hooks";
import { hasData } from "utils";
import PlayListHeader from "./PlayListHeader";
import PlaylistItemCard from "./PlaylistItemCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  playlistHeader: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3, 0),
  },
  playlistTitle: {
    fontSize: theme.fonts.bg,
    fontWeight: theme.typography.fontWeightMedium,
  },
  description: {
    marginTop: theme.spacing(0.8),
    color: theme.palette.text.secondary,
  },
  playlistContent: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  divider: {
    margin: theme.spacing(3.5, 0),
  },
}));

export default function PlayList({ id }) {
  const { data } = usePlaylistItems(id);
  const resultsPerPage = data?.pageInfo?.resultsPerPage ?? null;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PlayListHeader id={id} />

      <div className={classes.playlistContent}>
        {data?.items?.map(({ snippet }) => {
          return (
            <PlaylistItemCard
              videoId={snippet?.resourceId?.videoId}
              resultsPerPage={resultsPerPage}
            />
          );
        }) ?? null}
      </div>
      <Divider className={classes.divider} />
    </div>
  );
}
