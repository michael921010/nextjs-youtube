import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePlaylist } from "utils/hooks";
import { hasData } from "utils";

const useStyles = makeStyles((theme) => ({
  playlistHeader: {
    display: "flex",
    flexDirection: "column",
    // padding: theme.spacing(3, 0),
    marginBottom: theme.spacing(3.5),
  },
  playlistTitle: {
    fontSize: theme.fonts.bg,
    fontWeight: theme.typography.fontWeightMedium,
  },
  description: {
    marginTop: theme.spacing(0.8),
    color: theme.palette.text.secondary,
  },
}));

export default function PlayListHeader({ id }) {
  const { error, loading, playlist } = usePlaylist(id);

  const classes = useStyles();

  return (
    <div className={classes.playlistHeader}>
      <Typography variant="span" className={classes.playlistTitle}>
        {playlist?.snippet?.title}
      </Typography>
      {hasData(playlist?.snippet?.description) && (
        <Typography variant="span" className={classes.description}>
          {playlist?.snippet?.description}
        </Typography>
      )}
    </div>
  );
}
