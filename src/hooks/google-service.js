import { createContext, useContext, useEffect, useState } from "react";
import { hasData } from "utils";
import useSnackbar from "./snackbar";

const Context = createContext();

const SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl";
const YOUR_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUR_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;

const initProfile = { id: null, name: null, avatar: null, email: null };

export const GoogleServiceProvider = ({ children }) => {
  const toast = useSnackbar();

  //   const GoogleAuth = useRef(null);
  const [GoogleAuth, setGoogleAuth] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [profile, setProfile] = useState(initProfile);
  const [currentApiRequest, setCurrentApiRequest] = useState(null);
  const [requesting, setRequesting] = useState(false);

  function updateSigninStatus(isSignedIn) {
    setIsAuthorized(isSignedIn);
  }

  function revokeAccess() {
    GoogleAuth.disconnect();
  }

  async function signOutAuth() {
    try {
      if (GoogleAuth.isSignedIn.get()) {
        setRequesting(true);

        const user = await GoogleAuth.signOut();
        setProfile(initProfile);

        toast.success("Sign out successful.");
        setRequesting(false);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      toast.error("Sign out failed.");
      console.log("[Google Service] signOutAuth: ", err);
    }
  }

  async function signInAuth() {
    try {
      if (GoogleAuth.isSignedIn.get()) {
        setIsAuthorized(true);
      } else {
        setRequesting(true);

        const user = await GoogleAuth.signIn();

        // 查看個人身份資料
        const profile = user.getBasicProfile();
        if (hasData(profile)) {
          setProfile({
            id: profile.getId(),
            name: profile.getName(),
            avatar: profile.getImageUrl(),
            email: profile.getEmail(),
          });
        }

        toast.success("Sign in successful.");
        setRequesting(false);
      }
    } catch (err) {
      toast.error("Sign in failed.");
      console.log("[Google Service] signInAuth: ", err);
    }
  }

  async function initClient() {
    try {
      // In practice, your app can retrieve one or more discovery documents.
      const discoveryUrl =
        "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

      // Initialize the gapi.client object, which app uses to make API requests.
      // Get API key and client ID from API Console.
      // 'scope' field specifies space-delimited list of access scopes.
      await gapi.client.init({
        apiKey: YOUR_API_KEY,
        clientId: YOUR_CLIENT_ID,
        discoveryDocs: [discoveryUrl],
        scope: SCOPE,
      });
      const _GoogleAuth = gapi.auth2.getAuthInstance();

      setGoogleAuth(_GoogleAuth);

      const user = _GoogleAuth.currentUser.get();

      // 查看個人身份資料
      const profile = user.getBasicProfile();
      if (hasData(profile)) {
        setProfile({
          id: profile.getId(),
          name: profile.getName(),
          avatar: profile.getImageUrl(),
          email: profile.getEmail(),
        });
      }

      // 查看是否 有授權(已登入)
      const isAuthorized = user.hasGrantedScopes(SCOPE);
      setIsAuthorized(isAuthorized);
      setAuthChecked(true);
    } catch (err) {
      console.log("[Google Service] initClient: ", err);
    }
  }

  useEffect(() => {
    (() => {
      gapi.load("client:auth2", initClient);
    })();
    return () => {
      revokeAccess();
    };
  }, []);

  useEffect(() => {
    if (GoogleAuth !== null) {
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
    }
  }, [GoogleAuth]);

  return (
    <Context.Provider
      value={{
        authChecked,
        isAuthorized,
        GoogleAuth,
        signOutAuth,
        signInAuth,
        requesting,
        profile,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGoogleService = () => useContext(Context);
