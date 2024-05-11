//createError.js

export function createError(status, message) {
  const err = new Error();
  err.status = status;
  err.message = message;
  console.log('executing createError')
  return err;
}
