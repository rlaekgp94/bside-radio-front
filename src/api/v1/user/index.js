import { apiRequest } from 'utils/axios';

const version = "v1"

/**
 * 유저 정보 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 */
export const getUserInfoAPI = async (userId) => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `/${version}/users/${userId}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 유저 정보 변경 API
 *
 * @param {string} userId 유저 고유 아이디
 */
export const patchUserInfoAPI = async (userId, nickname, preference, profileImageDisable) => {
  try {
    const result = await apiRequest({
      method: 'patch',
      url: `/${version}/users/${userId}`,
      data: { nickname, preference, profileImageDisable }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}