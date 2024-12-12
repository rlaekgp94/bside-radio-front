import axiosInstance from 'utils/axios';

const version = "v1"


/**
 * 월간 현황 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} yearMonth yyyy-MM
 */
export const getMonthlyOverviewAPI = async (userId, yearMonth) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/reports/monthly/${userId}?yearMonth=${yearMonth}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 주간 리포트 생성 가능 여부 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 */
export const getWeeklyReportCreationStatusAPI  = async (userId, date) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/reports/weekly/status?date=${date}`,
      body: { userId }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}