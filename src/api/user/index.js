// import { apiRequest } from 'utils/axios';

// /**
//  * 유저 Access 토큰 비활성화
//  */
// export const disableAllAccessTokenAPI = async (email) => {
//   try {
//     const result = await apiRequest({
//       method: 'post',
//       url: `/user/disableAllAccessToken`,
//       data: { email }
//     });
//     return result;
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }

// /**
//  * 유저 생성 API
//  *
//  * @param {string} email 유저 이메일
//  * @param {string} name 유저 이름
//  * @param {string} birthday 유저 생년월일 (1900-01-01)
//  */
// export const addUserCreateAPI = async (email, name, birthday) => {
//   try {
//     const result = await apiRequest({
//       method: 'post',
//       url: `/user/create`,
//       data: { email, name, birthday }
//     });
//     return result;
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }


// /**
//  * 유저 정보 조회 API
//  *
//  * @param {string} email 유저 이메일
//  */
// export const getUserInfoAPI = async (email) => {
//   try {
//     const result = await apiRequest({
//       method: 'get',
//       url: `/user?email=${email}`,
//     });
//     return result;
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }

