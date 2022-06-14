import { Admin } from '../../declarations';

export interface CoreState {
  admin: Admin | null;
  isAuthenticated: boolean;
}
