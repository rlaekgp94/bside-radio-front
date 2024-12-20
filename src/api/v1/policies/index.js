import axiosInstance from 'utils/axios';

const version = "v1"


/**
 * 처리율 제한 정책 조회 API API
 *
 */
export const getPoliciesValueAPI = async () => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/policies`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}