export const sort = (list, value) => {
  list.sort((a, b) => {
    const numA = parseFloat(a[value]);
    const numB = parseFloat(b[value]);
    if (numA > numB) {
      return -1;
    }
    if (numA < numB) {
      return 1;
    }
    return 0;
  });
  return list;
}