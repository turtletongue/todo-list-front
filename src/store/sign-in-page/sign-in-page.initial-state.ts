import { SignInPageState } from './sign-in-page.declarations';

export const signInPageInitialState: SignInPageState = {
  username: '',
  password: '',

  loading: 'idle',
  isLoggedIn: false,
  error: null,
};
