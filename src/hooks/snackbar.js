import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { dissoc } from "ramda";
import { hasData } from "utils";

export default function useMySnackbar() {
  const snackbar = useSnackbar();

  const handleClose = useCallback(
    (key, options) => () => {
      snackbar.closeSnackbar(key);

      if (typeof options.onClose === "function") options.onClose();
    },
    []
  );

  const closeIcon = (options) => (key) => (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={handleClose(key, options)}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );

  const send = useCallback((msg, options) => {
    snackbar.enqueueSnackbar(msg, {
      autoHideDuration: 5000,
      action: closeIcon(options),

      ...dissoc("onClose", options),
    });
  }, []);

  const info = useCallback((msg, options = {}) => {
    if (hasData(msg)) {
      send(msg, { ...options, variant: "info" });
    }
  }, []);

  const error = useCallback((msg, options = {}) => {
    if (hasData(msg)) {
      send(msg, { ...options, variant: "error" });
    }
  }, []);

  const warning = useCallback((msg, options = {}) => {
    if (hasData(msg)) {
      send(msg, { ...options, variant: "warning" });
    }
  }, []);

  const success = useCallback((msg, options = {}) => {
    if (hasData(msg)) {
      send(msg, { ...options, variant: "success" });
    }
  }, []);

  return { ...snackbar, info, error, warning, success };
}
