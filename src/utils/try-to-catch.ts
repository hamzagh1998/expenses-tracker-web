export async function tryToCatch(fn: Function, ...args: any[]) {
  try {
    return [null, await fn(...args)];
  } catch (err) {
    return [err, null];
  };
};