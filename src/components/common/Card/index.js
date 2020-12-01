import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: ({ width }) => ({
    width,
  }),
  media: ({ width, height }) => ({
    width,
    height,
  }),
  title: {
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 2,
  },
}));

export default function MyCard({ title, channelTitle, image }) {
  const width = image?.width ?? 0;
  const height = image?.height ?? 0;

  const classes = useStyles({ width, height });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          width={width}
          height={height}
          image={image?.src}
          title={title}
        />

        <CardContent>
          <Typography gutterBottom component="p" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {channelTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
