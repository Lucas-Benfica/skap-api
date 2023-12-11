export function NotFoundError(message = "Not Found") {
  return {
    name: 'NotFoundError',
    message, 
  };
}
