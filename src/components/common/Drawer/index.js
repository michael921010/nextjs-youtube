import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Drawer, Hidden } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { LayoutContext, MediaContext } from "components/common";
import { DrawerList } from "./common";

const drawerWidth = { md: 92, lg: 240 };

const LgDrawer = withStyles((theme) => ({
  paper: {
    width: drawerWidth.lg,
  },
}))(Drawer);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const { isSmUp, isMdDown, isLgDown: keepMounted } = useContext(MediaContext);
  const { mobileOpen, desktopOpen, handleDrawer } = useContext(LayoutContext);

  const mdRef = useRef(null);
  const [mdWidth, setMdWidth] = useState(drawerWidth.md);

  const classes = useStyles({ mdWidth, desktopOpen });

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navWidth = useMemo(() => {
    if (!isSmUp) return 0;
    if (isMdDown) return mdWidth;
    return desktopOpen ? drawerWidth.lg : mdWidth;
  }, [isSmUp, isMdDown, mdWidth, desktopOpen]);

  const handleToggle = useCallback(() => {
    handleDrawer("mobileOpen");
  }, []);

  useEffect(() => {
    if (mdRef.current !== null) {
      setMdWidth(mdRef.current.getBoundingClientRect().width);
    }
  }, [mdRef.current, desktopOpen, isMdDown]);

  return (
    <div className={classes.root}>
      <nav
        className={classes.drawer}
        style={{ width: navWidth }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <LgDrawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleToggle}
            ModalProps={{ keepMounted }}
          >
            <DrawerList temporary />
          </LgDrawer>
        </Hidden>

        <Hidden xsDown lgUp={desktopOpen} implementation="css">
          <Drawer PaperProps={{ ref: mdRef }} variant="permanent" open>
            <DrawerList />
          </Drawer>
        </Hidden>

        <Hidden mdDown lgUp={!desktopOpen} implementation="css">
          <LgDrawer variant="permanent" open>
            <DrawerList />
          </LgDrawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
