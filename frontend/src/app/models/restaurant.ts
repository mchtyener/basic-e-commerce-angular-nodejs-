export interface Restaurant {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  banner?: string;
  opening_time?: string;
  closing_time?: string;
  description?: string;
  minimum_order_amount?: string;
  _id?: string
}

export interface RestaurantResponse {
  success?: boolean,
  restaurants?: Restaurant[]
}