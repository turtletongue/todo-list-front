export interface SignInPageState {
  username: string;
  password: string;

  loading: 'idle' | 'pending';
  isLoggedIn: boolean;
  error: string | null;
}

export interface SignInParams {
  username: string;
  password: string;
}
