import axiosInstance from 'utils/axios';

const version = "v1"

/**
 * 유저 정보 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 */
export const getUserInfoAPI = async (userId) => {
  try {
    const result = await axiosInstance({
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
export const patchUserInfoAPI = async (userId, nickname, preference, profileImageEnabled, emailAdsConsented, agreeToTerms, agreeToPrivacyPolicy) => {
  try {
    const result = await axiosInstance({
      method: 'patch',
      url: `/${version}/users/${userId}`,
      data: { nickname, preference, profileImageEnabled, emailAdsConsented, agreeToTerms, agreeToPrivacyPolicy }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 계정 탈퇴 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {integer} selectedNumber 선택한 탈퇴 사항
 * @param {string} detailReason 상세 탈퇴 사유
 */
export const deleteAccountAPI = async (userId, selectedNumber, detailReason) => {
  try {
    const result = await axiosInstance({
      method: 'delete',
      url: `/${version}/users/${userId}`,
      data: { selectedNumber, detailReason }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 계정 탈퇴 API
 *
 * @param {string} userId 유저 고유 아이디
 */

export const getUserLetterLimitAPI = async (userId) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/users/${userId}/usage`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}