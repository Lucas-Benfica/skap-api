export function conflictError(message) {
  return {
    name: 'ConflictError',
    message,
  };
}
