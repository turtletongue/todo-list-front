import { selectAdmin } from '../store/core/core.slice';
import { useAppSelector } from '../store/hooks';

export const useAdmin = () => {
  const admin = useAppSelector(selectAdmin);

  return { admin };
};

export default useAdmin;
