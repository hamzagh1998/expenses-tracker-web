export function screenSizeInInches(screenWidthPixels: number) {
  const PPI = 96; // Standard Pixels Per Inch (PPI)
  const screenWidthInInches = screenWidthPixels / PPI;

  // Round to the nearest whole number
  const roundedScreenSize = Math.round(screenWidthInInches);

  return roundedScreenSize;
};
