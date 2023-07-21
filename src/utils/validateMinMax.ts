export const validateMinMax = <T extends string | number>(
  currentValue: T,
  min: T,
  max: T
): T => {
  if (!+currentValue) return min;
  let resultValue = currentValue;
  if (+resultValue > +max) {
    resultValue = max;
  } else if (+resultValue < +min) {
    resultValue = min;
  }
  return resultValue;
};
