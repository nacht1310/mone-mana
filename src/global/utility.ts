export const extractTokenFromHeader = (request: Request): string | null => {
  const [type, token] = request.headers['authorization'].split(' ');

  return type === 'Bearer' ? token : null;
};
