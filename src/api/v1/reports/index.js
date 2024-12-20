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

/**
 * 데일리 리포트 결과 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} targetDate yyyy-mm-dd
 */
export const getReportDailyResultAPI = async (userId, targetDate) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/reports/daily/${userId}?targetDate=${targetDate}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 데일리 리포트 생성 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} targetDate yyyy-mm-dd
 */
export const createReportDailyAPI  = async (userId, targetDate) => {
  try {
    const result = await axiosInstance({
      method: 'post',
      url: `/${version}/reports/daily`,
      data: { userId, targetDate }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 위클리 리포트 결과 조회 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} startDate yyyy-mm-dd
 * @param {string} endDate yyyy-mm-dd
 */
export const getReportWeeklyResultAPI = async (userId, startDate, endDate) => {
  try {
    const result = await axiosInstance({
      method: 'get',
      url: `/${version}/reports/weekly/${userId}?startDate=${startDate}&endDate=${endDate}`,
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * 위클리 리포트 생성 API
 *
 * @param {string} userId 유저 고유 아이디
 * @param {string} startDate yyyy-mm-dd
 */
export const createReportWeeklyAPI  = async (userId, startDate) => {
  try {
    const result = await axiosInstance({
      method: 'post',
      url: `/${version}/reports/weekly`,
      data: { userId, startDate }
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
