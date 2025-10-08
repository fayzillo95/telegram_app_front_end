import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import * as api from '../api/getMyChats';
import * as createApi from '../api/createChat';

// === 1. Mening chatlarimni olish ===
export const useMyChats = (
  options?: UseQueryOptions<any, Error>
) =>
  useQuery({
    queryKey: ['userchats', 'my'],
    queryFn: api.getMyChats,
    ...options,
  });

// === 2. Yangi chat yaratish ===
export const useCreateChat = (
  options?: UseMutationOptions<any, Error, string>
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (user2Id: string) => createApi.createChat(user2Id),
    onSuccess: () => {
      // Chat yaratilgandan keyin cache-ni yangilash
      qc.invalidateQueries({ queryKey: ['userchats', 'my'] });
    },
    ...options,
  });
};
