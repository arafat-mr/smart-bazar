// src/Hooks/useUserInfo.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserInfo = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data, isLoading, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['userInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { userInfo: data, isLoading, refetch , };
};

export default useUserInfo;
