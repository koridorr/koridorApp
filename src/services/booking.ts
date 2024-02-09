import {END_POINTS} from '../helpers/constants/urls';
import emptySplitApi from '../utils/rtk';

type GetCMSResponse = {
  statusCode: number;
  code?: number;
  data?: any;
};
type PostAddWishlistBody = {
  question: string;
  answer: string;
  body: any;
  type: string;
};

type PostAddWishlistResponse = {
  statusCode: number;
  message: string;
};

type PlaceOrderResponse = {
  statusCode: number;
  message: string;
};
type PlaceOrderBody = {
  body: '';
  code: string | null;
};
type GiveRatingBody = {};
type GiveRatingResponce = {
  statusCode: number;
  message: string;
};

type reOrderBody = {
  products: [];
  appkey: any;
};

type CancelOrderResponse = {
  statusCode: number;
  message: string;
  data: any;
};

type CommaonResponse = {
  statusCode: number;
  message: string;
  data: any;
};

type commanBody = {
  hash: string;
  sek: string;
  body: any;
};

type orderParams = {
  body: any;
};

type orderBody = {
  limit: number;
};
export const bookingApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    addToWishlist: builder.mutation<
      PostAddWishlistResponse,
      PostAddWishlistBody
    >({
      query: ({body, type}) => ({
        url: END_POINTS.addWishlist + `?type=${type}`,
        method: 'POST',
        body,
      }),
    }),

    getWishlist: builder.query<GetCMSResponse, {}>({
      query: () => ({
        url: END_POINTS.getCms,
        method: 'GET',
      }),
    }),

    postPlaceOrder: builder.mutation<PlaceOrderResponse, PlaceOrderBody>({
      query: ({body, code}) => ({
        url:
          code !== null
            ? END_POINTS.placeOrder + `?code=${code}`
            : END_POINTS.placeOrder,
        method: 'POST',
        body,
      }),
    }),

    getOrder: builder.query<GetCMSResponse, orderBody>({
      query: body => ({
        url: `${END_POINTS.getOrder}?limit=${body?.limit}`,
        method: 'GET',
      }),
    }),

    postGiveRating: builder.mutation<GiveRatingResponce, GiveRatingBody>({
      query: body => ({
        url: END_POINTS.rating,
        method: 'POST',
        body,
      }),
    }),

    postCancelOrder: builder.mutation<CancelOrderResponse, orderParams>({
      query: ({body}) => ({
        url: END_POINTS.orderStatus,
        method: 'POST',
        body,
      }),
    }),

    postAddCard: builder.mutation<CommaonResponse, commanBody>({
      query: body => ({
        url: END_POINTS.addcard,
        method: 'POST',
        body,
      }),
    }),
    deleteCard: builder.mutation<CommaonResponse, commanBody>({
      query: body => ({
        url: `${END_POINTS.deleteCard}?cardId=${body}`,
        method: 'DELETE',
        body,
      }),
    }),

    getCard: builder.query<CommaonResponse, {}>({
      query: () => ({
        url: END_POINTS.getCard,
        method: 'GET',
      }),
    }),

    reOrder: builder.mutation<GiveRatingResponce, reOrderBody>({
      query: body => ({
        url: END_POINTS.reOrder,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useLazyGetWishlistQuery,
  usePostPlaceOrderMutation,
  useLazyGetOrderQuery,
  usePostGiveRatingMutation,
  usePostCancelOrderMutation,
  usePostAddCardMutation,
  useDeleteCardMutation,
  useLazyGetCardQuery,
  useReOrderMutation,
} = bookingApi;
