import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as api from '../api/getAllUsers';
import * as myApi from '../api/getMyUser';
import * as privateApi from '../api/getPrivateUser';

// === 1. Barcha foydalanuvchilarni olish ===
export const useAllUsers = (options?: UseQueryOptions<any, Error>) =>
  useQuery({
    queryKey: ['users', 'all'],
    queryFn: api.getAllUsers,
    ...options,
  });

// === 2. Mening foydalanuvchi ma’lumotimni olish ===
export const useMyUser = (options?: UseQueryOptions<any, Error>) =>
  useQuery({
    queryKey: ['users', 'me'],
    queryFn: myApi.getMyUser,
    ...options,
  });

// === 3. Maxfiy (private) foydalanuvchini olish ===
export const usePrivateUser = (
  userId?: string,
  options?: UseQueryOptions<any, Error>
) =>
  useQuery({
    queryKey: ['users', userId],
    queryFn: () => privateApi.getPrivateUser(userId as string),
    enabled: !!userId,
    ...options,
  });
