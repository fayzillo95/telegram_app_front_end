import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import * as api from '../api';

// === 1. Foydalanuvchining chatdagi barcha xabarlarini olish ===
export const useUserMessages = (
  type : string,
  chatId: string,
  options?: UseQueryOptions<any, Error>
) =>
  useQuery({
    queryKey: ['messages', 'user', chatId],
    queryFn: () => api.getMessages(chatId,type),
    enabled: !!chatId, // faqat chatId bo‘lsa so‘rov yuboriladi
    ...options,
  });

// === 2. Xabar yuborish ===
export const useSendUserMessage = (
  chatId: string, type: string,
  options?: UseMutationOptions<any, Error>
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.sendMessage({chatId : chatId},type),
    onSuccess: (_data, variables) => {
      // Xabar yuborilganda shu chatdagi cache yangilanadi
      if (chatId) {
        qc.invalidateQueries({ queryKey: ['messages', 'user', chatId] });
      }
    },
    ...options,
  });
};
