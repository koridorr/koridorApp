import { CouponTypes } from '../helpers/constants/types';
import { END_POINTS } from '../helpers/constants/urls';
import { ImageResponse } from '../types/User';
import emptySplitApi from '../utils/rtk';

// type HomeResponse = {
//     code: number;
//     count: number;
//     data: Category[];
// };

type CategoryResponse = {
  data: any;
  statusCode: number;
  code: number;
  count: number;
  // data: Category[];
};

type UpdateDocumentBody = {
  document_full_name: string;
  dob: string;
  document_address_id: number | undefined;
  document_ssn: string;
  upload_document_photo: ImageResponse;
  notary_method: number | any;
  pickup_method: number;
};

type CreateDocument = {
  document_photo: ImageResponse;
  sub_category: number;
  signed_by: number;
};

type CreateDocumentResponse = {
  code: number;
  data: any;
  message: string;
};

type UpdateDocument = {
  doc_id: number;
  body: UpdateDocumentBody;
};
type CategoriesType = {
  categories_type: number;
};

type CategoryBody = {};
type BrandsResponse = {
  statusCode: number;
  message: string;
  data: {};
};

type BrandBody = {};

type ProductResponse = {
  statusCode: number;
  message: string;
  product:any,
  data: {};
};

type ProductBody = {};

type VendorResponse = {
  statusCode: number;
  message: string;
  data: {};
};

type VendorBody = {};

type AddressResponse = {
  statusCode: number;
  message: string;
  data: {};
};

type AddressBody = {
  // address1: string,
  // buildingNo: number,
  // apartmentNo: number,
  // latitude: number,
  // longitude: number,
  // addressType: number,
  sek: string;
  hash: string;
};

type AddressParams = {
  body: AddressBody;
  id: string;
};

type AddFavoriteBody = {
  body: {};
  type: string;
};

type AddFavoriteResponse = {
  statusCode: number;
  data?: any;
};

type AddCartParams = {};
type cartData = {
  _id: string;
  quantity: number;
  productName: string;
};
type AddCartResponse = {
  data: cartData[];
  statusCode: number;
  message: string;
};

type GetCouponsResponse = {
  statusCode: number;
  data?: {
    coupons: CouponTypes[];
  };
};

type GetCouponsBody = {
  hash: string;
  sek: string;
};

type GetCartCouponDetailResponse = {
  statusCode: number;
  data: any[];
  
};

type AddFilterResponse = {
  data: any;
  statusCode: number;
  message: string;
};
type SubCategoryResponse = {
  statusCode: number;
  message: string;
}
type SubCategoryBody = {

}

type NotificationResponse = {
  statusCode: number;
  message: string;
  data: []
}
type NotificationBody = {

}
type CommaonResponse ={
  statusCode: number;
  message: string;
  data:any
}

type commanBody = {
  hash: string;
  sek:string,
};
type commanBody2 = {
 
};
export const homeApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    postProduct: builder.mutation<ProductResponse, ProductBody>({
      query: body => ({
        url: END_POINTS.getProduct,
        method: 'POST',
        body,
      }),
    }),
    postCategoryProduct: builder.mutation<ProductResponse, ProductBody>({
      query: body => ({
        url: END_POINTS.getProduct,
        method: 'POST',
        body,
      }),
    }),
    postCategory: builder.mutation<CategoryResponse, CategoryBody>({
      query: body => ({
        url: END_POINTS.getCategory,
        method: 'POST',
        body,
      }),
    }),
    getSubCategory: builder.mutation<SubCategoryResponse, SubCategoryBody>({
      query: body => ({
        url: END_POINTS.getSubCategory + `/${body}`,
        method: 'GET',
      }),
    }),

    postBrands: builder.mutation<BrandsResponse, BrandBody>({
      query: body => ({
        url: END_POINTS.getBrand,
        method: 'POST',
        body,
      }),
    }),

    postVendor: builder.mutation<VendorResponse, VendorBody>({
      query: body => ({
        url: END_POINTS.getVendor,
        method: 'POST',
        body,
      }),
    }),

    // MANAGE ADDRESS ===>>>>>>>

    postaddAddress: builder.mutation<AddressResponse, AddressBody>({
      query: body => ({
        url: END_POINTS.addAddress,
        method: 'POST',
        body,
      }),
    }),
    postgetAddress: builder.mutation<AddressResponse, AddressBody>({
      query: body => ({
        url: END_POINTS.getAddress,
        method: 'POST',
        body,
      }),
    }),

    postupdateAddress: builder.mutation<AddressResponse, AddressParams>({
      query: ({ body, id }) => ({
        url: END_POINTS.updatedAddress + `/${id}`,
        method: 'POST',
        body,
      }),
    }),
    deleteAddress: builder.mutation<AddressResponse, AddressBody>({
      query: body => ({
        url: END_POINTS.deleteAddress + `/${body}`,
        method: 'DELETE',
      }),
    }),
    // ADD CART ========>>>>>>>>>>

    postaddCart: builder.mutation<AddCartResponse, AddCartParams>({
      query: body => ({
        url: END_POINTS.addToCart,
        method: 'POST',
        body,
      }),
    }),
    postremoveCart: builder.mutation<AddCartResponse, AddCartParams>({
      query: body => ({
        url: END_POINTS.removeCart,
        method: 'POST',
        body,
      }),
    }),
    postgetCart: builder.mutation<AddCartResponse, AddCartParams>({
      query: () => ({
        url: END_POINTS.getCart,
        method: 'GET',
      }),
    }),
    getCoupons: builder.mutation<GetCouponsResponse, GetCouponsBody>({
      query: body => ({
        url: END_POINTS.getCoupons,
        method: 'POST',
        body,
      }),
    }),

    addFavoriteProduct: builder.mutation<AddFavoriteResponse, AddFavoriteBody>({
      query: ({ body, type }) => ({
        url: `${END_POINTS.addWishlist}?type=${type}`,
        method: 'POST',
        body,
      }),
    }),

    getFavoriteProduct: builder.mutation<AddFavoriteResponse, AddFavoriteBody>({
      query: ({ type }) => ({
        url: `${END_POINTS.addWishlist}?type=${type}`,
        method: 'GET',
      }),
    }),

    getCartCouponDetails: builder.query<
      GetCartCouponDetailResponse,
      { code: string }
    >({
      query: ({ code }) => ({
        url: `${END_POINTS.getCart}?code=${code}`,
        method: 'GET',
      }),
    }),
    postAddFilter: builder.mutation<AddFilterResponse, GetCouponsBody>({
      query: body => ({
        url: END_POINTS.filter,
        method: 'POST',
        body,
      }),
    }),

    getNotification: builder.mutation<NotificationResponse, NotificationBody>({
      query: () => ({
        url: `${END_POINTS.getUserNotification}`,
        method: 'GET',
      }),
    }),
    getClearNotification: builder.mutation<NotificationResponse, NotificationBody>({
      query: () => ({
        url: `${END_POINTS.clearNotification}`,
        method: 'GET',
      }),
    }),

    DeleteAccount: builder.mutation<CommaonResponse, commanBody2>({
      query: () => ({
        url: `${END_POINTS.deleteAccount}`,
        method: 'GET',
      }),
    }),

    getGetAllVendors: builder.mutation<AddFilterResponse, commanBody2>({
      query: () => ({
        url: END_POINTS.getAllVendors,
        method: 'GET',
    
      }),
    }),

  }),
});

export const {
  useGetGetAllVendorsMutation,
  useDeleteAccountMutation,
  usePostCategoryMutation,
  usePostBrandsMutation,
  usePostProductMutation,
  usePostVendorMutation,
  usePostaddAddressMutation,
  usePostgetAddressMutation,
  usePostupdateAddressMutation,
  useDeleteAddressMutation,
  useAddFavoriteProductMutation,
  usePostaddCartMutation,
  usePostgetCartMutation,
  usePostCategoryProductMutation,
  useGetFavoriteProductMutation,
  useLazyGetCartCouponDetailsQuery,
  useGetCouponsMutation,
  usePostAddFilterMutation,
  useGetSubCategoryMutation,
  useGetNotificationMutation,
  useGetClearNotificationMutation

} = homeApi;
