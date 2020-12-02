import { createContext } from "react";
import { useMediaQuery } from "@material-ui/core";

export const LayoutContext = createContext();

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
