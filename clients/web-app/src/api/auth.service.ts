import { authServiceInstance } from '.';

export function login(body: { username: string; password: string }): Promise<{ token: string }> {
  return authServiceInstance.post('/login', body);
}

export function register(body: { username: string; password: string }): Promise<{ token: string }> {
  return authServiceInstance.post('/register', body);
}
