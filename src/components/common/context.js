import { useState, useCallback, createContext, useContext } from "react";
import { useMediaQuery } from "@material-ui/core";
import { hasData } from "utils";

export const LayoutContext = createContext();

const defaultDrawer = { mobileOpen: false, desktopOpen: true };
export const LayoutProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(defaultDrawer);

  const handleDrawer = useCallback((key, value) => {
    if (hasData(key)) {
      setOpenDrawer((o) => ({ ...o, [key]: value ?? !o[key] }));
    }
  }, []);

  return (
    <LayoutContext.Provider value={{ ...openDrawer, handleDrawer }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isLgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <MediaContext.Provider
      value={{ isLgUp, isLgDown, isMdDown, isSmUp, isMdUp }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);

export const Providers = ({ children }) => {
  return (
    <MediaProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </MediaProvider>
  );
};
