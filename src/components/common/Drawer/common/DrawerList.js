import React from "react";
import { Divider, List } from "@material-ui/core";
import { Mail as MailIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "./DrawerListButton";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const blocks = [
  [
    {
      label: "Inbox",
      Icon: MailIcon,
    },
    {
      label: "Starred",
      Icon: MailIcon,
    },
    {
      label: "Send email",
      Icon: MailIcon,
    },
    {
      label: "Drafts",
      Icon: MailIcon,
    },
  ],
  [
    {
      label: "All mail",
      Icon: MailIcon,
    },
    {
      label: "Trash",
      Icon: MailIcon,
    },
    {
      label: "Spam",
      Icon: MailIcon,
    },
  ],
];

export default function DrawerList({ temporary }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      {blocks.map((block, iBlock) => (
        <div key={iBlock}>
          <Divider />
          <List>
            {block.map(({ label, Icon }) => (
              <Button
                key={label}
                text={label}
                temporary={temporary}
                Icon={Icon}
              />
            ))}
          </List>
        </div>
      ))}
    </div>
  );
}
