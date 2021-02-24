import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.178.30:9000/api", // LAN
    // apiUrl: "http://192.168.178.29:9000/api", // WLAN
  },
  staging: {
    // apiUrl: "http://192.168.178.30:9000/api",
    apiUrl: "http://localhost:9000/api",
  },
  prod: {
    apiUrl: "http://192.168.178.30:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
