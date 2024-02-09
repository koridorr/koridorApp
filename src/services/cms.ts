import {END_POINTS} from '../helpers/constants/urls';
import emptySplitApi from '../utils/rtk';

type GetCMSResponse = {
  statusCode: number;
  code?: number;
  data?: any;
};
type PostAddFaqsBody = {
  question: string;
  answer: string;
};

type PostAddFaqsResponse = {
  statusCode: number;
  message: string;
};

export const cmsApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    // addFaqs: builder.mutation<PostAddFaqsResponse, PostAddFaqsBody>({
    //   query: body => ({
    //     url: END_POINTS.faqs,
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    getcms: builder.query<GetCMSResponse, {}>({
      query: () => ({
        url: END_POINTS.getCms,
        method: 'GET',
      }),
    }),
  }),
});

export const {useLazyGetcmsQuery} = cmsApi;
