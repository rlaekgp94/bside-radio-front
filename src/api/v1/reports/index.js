import axiosInstance from 'utils/axios';

const version = "v1"


/**
 * 데일리 리포트 상태 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} yearMonth yyyy-mm
 */
export const getReportDailyStatusAPI = async (userId, yearMonth) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/reports/daily/status/${userId}?yearMonth=${yearMonth}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


/**
 * 위클리 리포트 상태 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} yearMonth yyyy-mm
 */
export const getReportWeeklyStatusAPI = async (userId, yearMonth) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/reports/weekly/status/${userId}?yearMonth=${yearMonth}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
