import { apiRequest } from 'utils/axios';

const version = "v1"

/**
 * 편지 쓰기 후 답장 리턴 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} message 유저가 작성한 메시지 내용
 * @param {string} preference 유저가 선호하는 답변 유형 F/T
 */
export const letterResponseAPI  = async (userId, message, preference) => {
  try {
    const result = await apiRequest({
      method: 'post',
      url: `/${version}/letters`,
      data: { userId, message, preference }
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
- 유저 편지함: `/api/v1/replies/{userUUID}?{lastLetterId}={UUID}&size=10`
  - **유저 편지함 첫 진입 시**: `/api/v1/replies/{userUUID}?size=10`
유저 편지함 첫 진입 시는 lastLetterId 필요없기 땜에 저렇게 해주심 되요
size 도 안넘기시면 기본값 10입니다
 */
export const getUserLetterListAPI = async (userId, page, size) => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `/${version}/replies/${userId}?size=${size}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 커뮤니티 최신 리스트 API
 *
 */
export const getLatestCommunityListAPI = async () => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `/${version}/letters/latest`,
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
      url: `/${version}/replies/${letterId}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


/**
 * 최신 캐러셀 편지 목록 리스트 API
 *
 * @param {string} userId 유저 고유 아이디
 */
export const getLatestLetterListAPI = async (size) => {
  try {
    const result = await apiRequest({
      method: 'get',
      url: `/${version}/replies?size=${size}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
