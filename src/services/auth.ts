import {END_POINTS} from '../helpers/constants/urls';
import type {User} from '../types/User';
import emptySplitApi from '../utils/rtk';

type PostSignUpBody = {
  phoneNo?: string;
  verify?: number;
  password?: string;
  email?: string;
  dialCode?: string;
  deviceToken:string;
  deviceType:string;
  hesh?:string
  sek?:string
};

type PostSignUpResponse = {
  statusCode: number;
  data?: User;
  message: string;
};

type PutProfileSetupBody = User;

type PostForgotPasswordBody = {
  phoneNo?: string;
  dialCode?: string;
  hesh?:string
  sek?:string
};

type PostForgotPasswordResponse = {
  statusCode: number;
  message: string;
};

type UpdateCmsResponse = {
  statusCode: number;
  message: string;
};

type UpdateCmsBody = {
  aboutUs: string;
  cancellation: string;
  email: string;
  phone: string;
  privacy: string;
  terms: string;
  countryCode: string;
};

type CommonResponse = {
  statusCode: number;
  message: string;
  data?: User;
  accessToken?: string;
};

type OtpVerifyBody = {
  phoneNo?: string;
  otp?: string;
  dialCode?: string;
  email?: string;
  hesh?:string
  sek?:string
};

type GetProfileResponse = {
  statusCode: number;

  data: User;
};

type ResetPasswordBody = {newPassword?: string; oldPassword?: string;  hesh?:string
  sek?:string};

type ResetPasswordResponse = {
  statusCode: number;
  message: string;
};
type UpdateProfileResponse = {
  statusCode: number;
};

type PutProfileSetupResponse = {
  statusCode: number;
  message: string;
  data?: User;
};

type PostResendOtpResponse = {
  message: string;
  statusCode: number;
};

type PostResendOtpBody = {
  email?: string;
  phoneNo?: string;
  dialCode?: string;
  hesh?:string
  sek?:string

};

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    postSignUp: builder.mutation<PostSignUpResponse, PostSignUpBody>({
      query: body => ({
        url: END_POINTS.signUp,
        method: 'POST',
        body,
      }),
    }),

    postSocialLogin: builder.mutation<PostSignUpResponse, PostSignUpBody>({
      query: body => ({
        url: END_POINTS.socialLogin,
        method: 'POST',
        body,
      }),
    }),


    postForgetPassword: builder.mutation<
      PostForgotPasswordResponse,
      PostForgotPasswordBody
    >({
      query: body => ({
        url: END_POINTS.forgetPassword,
        method: 'POST',
        body,
      }),
    }),
    postResetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordBody
    >({
      query: body => ({
        url: `${END_POINTS.resetPassword}`,
        method: 'POST',
        body,
      }),
    }),
    postLogin: builder.mutation<PostSignUpResponse, PostSignUpBody>({
      query: body => ({
        url: END_POINTS.login,
        method: 'POST',
        body,
      }),
    }),

    getProfile: builder.query<GetProfileResponse, {}>({
      query: () => ({
        url: END_POINTS.getProfile,
        method: 'GET',
      }),
    }),

    postResendOtp: builder.mutation<PostResendOtpResponse, PostResendOtpBody>({
      query: body => ({
        url: END_POINTS.resendOtp,
        method: 'POST',
        body,
      }),
    }),

    putProfileSetup: builder.mutation<
      PutProfileSetupResponse,
      PutProfileSetupBody
    >({
      query: body => ({
        url: END_POINTS.profile,
        method: 'PUT',
        body,
      }),
    }),
    postOtpVerify: builder.mutation<CommonResponse, OtpVerifyBody>({
      query: body => ({
        url: END_POINTS.otp,
        method: 'POST',
        body,
      }),
    }),
    changePasswordPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordBody
    >({
      query: body => ({
        url: `${END_POINTS.changePassword}`,
        method: 'PUT',
        body,
      }),
    }),
    getLogout: builder.query<CommonResponse, {}>({
      query: () => ({
        url: END_POINTS.logout,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  usePostSignUpMutation,
  usePostSocialLoginMutation,
  usePostOtpVerifyMutation,
  usePostForgetPasswordMutation,
  usePutProfileSetupMutation,
  usePostResetPasswordMutation,
  usePostLoginMutation,
  useLazyGetProfileQuery,
  useChangePasswordPasswordMutation,
  usePostResendOtpMutation,
  useLazyGetLogoutQuery,
} = authApi;
