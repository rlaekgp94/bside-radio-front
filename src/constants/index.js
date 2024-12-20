import PROFILE_IMG from "assets/Content/default-profile.svg"


export const DATA = {
  BASE_URL: process.env.REACT_APP_ENV === "production" ? "https://upup-radio.site" : "https://dev.upup-radio.site",
  // BASE_URL: process.env.REACT_APP_ENV === "production" ? "https://upup-radio.site" : "http://localhost:8080",
  MIXPANEL_CLIENT_ID: "e6769d0990d9d69011e4902258f94ad6",
  defaultProfile: PROFILE_IMG,
  NOTICE_BOARD_URL: "https://www.notion.so/tetroco/00-00-12879bf3bae1804b9a9ef21b633ba21e", // 공지사항
  TERMS_OF_SERVICE_URL: "https://www.notion.so/tetroco/11f79bf3bae1804284adda6985f40f95", // 이용약관
  PRIVACY_POLICY_URL: "https://tetroco.notion.site/11c79bf3bae180a5bf27e47492311a39", // 개인정보처리방침
};