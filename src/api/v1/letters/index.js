import { apiRequest } from 'utils/axios';

const version = "/v1"

/**
 * 유저의 사연이 담긴 편지를 접수받는 API
 *
 * @param {string} email 유저 이메일
 * @param {string} message 유저가 작성한 메시지 내용
 * @param {string} preference 유저가 선호하는 답변 유형 F/T
 */
export const letterResponseAPI  = async (email, message, preference) => {
  try {
    const result = await apiRequest({
      method: 'post',
      url: `${version}/letters/receipt`,
      data: { email, message, preference }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


/**
 * 유저 정보 조회 API
 *
 * @param {string} email 유저 이메일
 */
export const getUserInfoAPI = async (email) => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `/user?email=${email}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

