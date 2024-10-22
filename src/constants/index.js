import PROFILE_IMG from "assets/Content/default-profile.svg"


export const DATA = {
  BASE_URL: process.env.REACT_APP_ENV === "production" ? "https://upup-radio.site" : "http://localhost:8080",
  defaultProfile: PROFILE_IMG,
  PRIVACY_POLICY_URL: "https://tetroco.notion.site/11c79bf3bae180a5bf27e47492311a39"
};