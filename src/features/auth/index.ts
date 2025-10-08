// src/features/auth/index.ts

// === API functions ===
export { existsVerification } from './api/existsVerification';
export { registerVerification } from './api/registerVerification';
export { sendOtp } from './api/sendOtp';

// === Hooks ===
export {
  useExistsVerification,
  useRegisterVerification,
  useSendOtp,
  type AuthHookOptions,
} from './hooks/useAuth';

// === Types ===
export type {
  ExistsVerificationDto,
  RegisterVerificationDto,
  OtpResponse,
  SendOtpDto,
} from './types';
