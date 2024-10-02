export const toNumberFormat = (number, decimal) => {
  const decimalPlaces = decimal || 8;
  const power = Math.pow(10, decimalPlaces);
  const formattedNumber = (Math.round(number * power) / power).toFixed(decimalPlaces);

  // 콤마 추가
  const parts = formattedNumber.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}