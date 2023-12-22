export const isValidRoute = (routeName) => {
  const validRoute = /^\/[a-zA-Z0-9_-]+$/;
  validRoute.lastIndex = 0;

  return routeName == "/" ? true : validRoute.test(routeName);
};