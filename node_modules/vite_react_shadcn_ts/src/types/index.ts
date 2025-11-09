export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  language_preference: 'en' | 'fr' | 'rw';
  created_at: string;
}

export interface TransportCompany {
  id: string;
  name: string;
  email: string;
  phone: string;
  logo_url?: string;
  rating?: number;
  is_verified: boolean;
  is_active: boolean;
}

export interface Vehicle {
  id: string;
  company_id: string;
  license_plate: string;
  vehicle_type: 'bus' | 'minibus' | 'express' | 'private';
  capacity: number;
  amenities: string[];
  is_active: boolean;
}

export interface Route {
  id: string;
  company_id: string;
  company?: TransportCompany;
  origin_city: string;
  destination_city: string;
  distance_km: number;
  estimated_duration_minutes: number;
  base_price: number;
  is_active: boolean;
}

export interface Trip {
  id: string;
  route_id: string;
  route?: Route;
  vehicle_id: string;
  vehicle?: Vehicle;
  departure_time: string;
  arrival_time: string;
  status: 'scheduled' | 'departed' | 'completed' | 'cancelled';
  current_price: number;
  available_seats: number;
}

export interface Seat {
  id: string;
  vehicle_id: string;
  seat_number: string;
  seat_type: 'regular' | 'premium' | 'vip';
  row_number: number;
  column_letter: string;
  is_available?: boolean;
}

export interface Booking {
  id: string;
  user_id: string;
  trip_id: string;
  trip?: Trip;
  booking_reference: string;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: 'mobile_money' | 'card' | 'cash';
  booking_status: 'confirmed' | 'cancelled' | 'completed';
  qr_code_url?: string;
  created_at: string;
  seats?: BookingSeat[];
}

export interface BookingSeat {
  id: string;
  booking_id: string;
  seat_id: string;
  seat?: Seat;
  passenger_name: string;
  passenger_phone: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export interface PaymentRequest {
  booking_id: string;
  amount: number;
  payment_method: 'mobile_money' | 'card';
  provider: 'mtn' | 'airtel' | 'bank';
  phone_number?: string;
}
