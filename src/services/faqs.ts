import {END_POINTS} from '../helpers/constants/urls';
import emptySplitApi from '../utils/rtk';

type GetAllFaqsResponse = {
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

type CommonResponse = {
  statusCode?: number;
  message: string;
};

export const faqsApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    addFaqs: builder.mutation<PostAddFaqsResponse, PostAddFaqsBody>({
      query: body => ({
        url: END_POINTS.faqs,
        method: 'POST',
        body,
      }),
    }),

    getAllFaqs: builder.query<GetAllFaqsResponse, {}>({
      query: () => ({
        url: END_POINTS.faqs,
        method: 'GET',
      }),
    }),
    deleteFaq: builder.mutation<CommonResponse, {faq_id: string | undefined}>({
      query: ({faq_id}) => ({
        url: `${END_POINTS.faqs}/${faq_id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetAllFaqsQuery,
  useAddFaqsMutation,
  useDeleteFaqMutation,
} = faqsApi;
