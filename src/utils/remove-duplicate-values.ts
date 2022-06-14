export const removeDuplicateValues = (
  firstObj: Record<string, any>,
  secondObj: Record<string, any>
) => {
  return Object.fromEntries(
    Object.entries(firstObj).filter(([key, value]) => value !== secondObj[key])
  );
};
