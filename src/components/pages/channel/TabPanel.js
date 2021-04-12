import { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",

    "& > span": {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    minWidth: 0,
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(theme.fonts.bg),
    paddingTop: 0,

    "&:focus": {
      opacity: 1,
    },
  },
  wrapper: {
    padding: theme.spacing(0, 3),
  },
  selected: {
    "& > span": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const tabs = [
  { key: "home", label: "首頁" },
  { key: "movie", label: "影片" },
  { key: "playList", label: "播放清單" },
  { key: "community", label: "社群" },
  { key: "channel", label: "頻道" },
  { key: "introduction", label: "簡介" },
];

export default function TabPanel() {
  const [value, setValue] = useState(0);

  return (
    <StyledTabs
      value={value}
      onChange={(e, v) => setValue(v)}
      aria-label="styled tabs example"
    >
      {tabs.map(({ key, label }) => (
        <StyledTab label={label} key={key} />
      ))}
    </StyledTabs>
  );
}
