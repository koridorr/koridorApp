export interface User {
  roomNo(roomNo: any): string | (() => string | null) | null;
  latitude: string;
  longitude: string;
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  email?: string;
  dialCode?: string;
  emergencyDialCode?: string;
  emergencyPhoneNo?: string;
  accessToken?: string;
  isProfileCompleted?: boolean;
  image?: string | undefined;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  emergengyIsoCode?: string;
  deviceToken: string,
  deviceType:string,
  isoCode?: string;
  city?: string;
  hesh?: string;
  sek?: string;
  vendorId:string
  hash: string,
}

export interface ImageResponse {
  image: string;
}

export interface CartDataTypes {
  deliveryCharges: number;
  _id: string;
  quantity: number;
  images: [];
  productName: string;
  isDeleted: boolean;
  vendorId: string;
  products:[];
  productId: {
    _id: string;
    productImages: ImageResponse[];
    name: Megi;
    brandId: string;
    productWarranty: sasd;
    tax: number;
    deliveryCharges: number;

    isDeleted: false;
    discount: number;
    quantity: number;
    price: number;
    purchaseLimit: number;
    description: string;
    vendorId: string;
    products:any
  };
}


export interface socialLoginType {
email: string;
fullName: string;

user:{
  email: string;
  emai:string,
  familyName:string,
  givenName:string,
  id:number,
  name:string,
  photo:string
}
}