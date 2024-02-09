import {Source} from 'react-native-fast-image';

export type ProfileListType = {
  id: number;
  addressType: string;
  apartmentNo: string;
  buildingNo:number;
  address1: string;
  name: string;
  icon: Source;
  navigateTo?: string;
  text: string;
  _id:string
};
