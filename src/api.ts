export const API_URL = 'http://localhost:3050/';

export const api = {
  tasks: API_URL + 'tasks',
  signIn: API_URL + 'authentication',
  logOut: API_URL + 'authentication/log-out',
  authenticate: API_URL + 'authentication/validate',
};
