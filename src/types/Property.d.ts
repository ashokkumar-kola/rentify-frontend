export type PropertyType =
  | 'flat' | 'apartment' | 'studio' | 'villa' | 'independent house' | 'row house'
  | 'bungalow' | 'penthouse' | 'duplex' | 'plot' | 'land' | 'commercial space'
  | 'office space' | 'co-working space' | 'retail space' | 'warehouse'
  | 'industrial shed' | 'farmhouse' | 'hostel' | 'PG' | 'serviced apartment' | 'hotel room';

export type FurnishingType = 'furnished' | 'unfurnished' | 'partially';

export type PropertyStatus = 'available' | 'rented' | 'pending' | 'inactive';

export type PropertyFacing =
  | 'north' | 'south' | 'east' | 'west'
  | 'north-east' | 'north-west' | 'south-east' | 'south-west';

export interface Location {
  nearby?: string;
  street?: string;
  locality?: string;
  city: string;
  district?: string;
  state: string;
  zip?: string;
  geo?: {
    lat?: number;
    lng?: number;
  };
}

export interface Property {
  _id: string;
  landlord_id: string;
  title: string;
  price: number;
  deposit: number;
  property_type: PropertyType;
  floor_no: number;
  total_floors: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  carpet_area?: number;
  images: string[];
  furnishing: FurnishingType;
  amenities: string[];
  facing?: PropertyFacing;
  built_year?: number;
  description?: string;
  location: Location;
  available_from: string;
  status: PropertyStatus;
  is_verified: boolean;
  is_popular: boolean;
  is_featured: boolean;
  video_url?: string;
  virtual_tour_url?: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
