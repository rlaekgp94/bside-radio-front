import { apiRequest } from 'utils/axios';

const version = "/v1"

/**
 * 편지 쓰기 후 답장 리턴 API
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
 * 내 편지함 리스트 API
 *
 * @param {string} userId 유저 고유 아이디
 */
export const getUserLetterListAPI = async (userId) => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `${version}/letters/${userId}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


/**
 * 답장 개별 조회 API
 *
 * @param {string} letterId 편지 고유 아이디
 */ 
export const getLetterIdRepliesAPI = async (letterId) => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `${version}/replies/${letterId}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

