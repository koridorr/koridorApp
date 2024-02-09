import AuthScreens from './authScreens';
import {
  HomeScreen,
  SeeAllCategory,
  SeeAllRecentlyVisited,
  SeeAllBestSelling,
  MyWishlist,
  ProfileScreen,
  MyOrderTabs,
  Notification,
  GetDirection,
  PaymentCompleted,
  ChangeAddress,
  SearchScreen,
  AllCategories,
  FilterScreen,
  
} from './mainFlow';

import ProfileFlow from './mainFlow/Profile';
import OrderFlow from './mainFlow/MyOrders';
export default {
  ...AuthScreens,
  ...ProfileFlow,
  ...OrderFlow,
  HomeScreen,
  SeeAllCategory,
  SeeAllRecentlyVisited,
  SeeAllBestSelling,
  MyWishlist,
  ProfileScreen,
  MyOrderTabs,
  Notification,
  GetDirection,
  PaymentCompleted,
  ChangeAddress,
  SearchScreen,
  AllCategories,
  FilterScreen,
};
