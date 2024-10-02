export const movePath = (nav, path, state = {}) => {
  nav(path, { state });
};