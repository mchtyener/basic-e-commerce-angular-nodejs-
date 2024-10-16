export interface EndpointsConfig {
  getProfile: string;
  updateProfile: string;
  authLogin: string;
  authRegister: string;
  authLogout: string;
  restaurants: string;
  restaurant_detail: string;
  create_restaurants: string;
  restaurant_remove: string;
  upload: string;
}

export const API_CONFIG = {
  ENDPOINTS: {
    getProfile: 'profile',
    updateProfile: 'profile/update',
    authLogin: 'auth/login',
    authRegister: 'auth/register',
    authLogout: 'auth/logout',
    restaurants: 'restaurants',
    restaurant_detail: 'restaurants/${id}',
    restaurant_remove: 'admin/restaurant/${id}',
    create_restaurants: 'admin/restaurant',
    upload: 'upload'
  }
};
