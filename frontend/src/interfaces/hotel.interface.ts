export interface IRoom {
  room_id: number;
  title: string;
  price: number;
  capacity: number;
  number_of_rooms: number;
  status: string;
  is_available?: boolean;
  booked_slots?: number;
  available_rooms?: number;
  description?: string;
  sale_price?: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
}

export type IHotel = {
  hotel_id: number;
  title: string;
  status: string;
  rooms?: IRoom[];
  description?: string;
  address?: number;
  image?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
};

export interface IRoomFilters {
  hotel_id?: number;
  capacity?: number;
  check_in_date?: string;
  check_out_date?: string;
}
