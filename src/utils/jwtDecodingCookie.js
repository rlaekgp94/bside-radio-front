import { setCookie } from 'utils/cookie';
import base64 from "base-64";

export const jwtDecodingCookie = (tokenName, tokenData) => {    
  const payload = tokenData.substring(tokenData.indexOf(".") + 1, tokenData.lastIndexOf("."));
  const decodingInfo = base64.decode(payload);
  const jwtToken = decodingInfo ? JSON.parse(decodingInfo) : null;
  // console.log("api 호출 갱신 토큰 ------------",tokenName, tokenData, jwtToken, jwtToken.exp)
  setCookie(tokenName, tokenData, jwtToken.exp)
} 