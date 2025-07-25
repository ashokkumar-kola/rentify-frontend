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

export type GeoLocation = {
  lat?: number;
  lng?: number;
};

export type Location = {
  nearby?: string;
  street?: string;
  locality?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  zip?: string;
  geo: GeoLocation;
};

export type Property = {
  id: string;
  landlord_id: string | null;

  title: string;
  price: number | null;
  deposit: number | null;

  location: Location | null;

  property_type: PropertyType | null;
  floor_no: number;
  total_floors: number;
  bedrooms: number;
  bathrooms: number;

  area: number | null;
  carpet_area: number | null;

  images: string[];

  status: PropertyStatus;

  description: string;

  furnishing: FurnishingType;

  amenities: string[];

  facing: PropertyFacing | null;

  built_year: number | null;

  video_url: string | null;

  is_deleted: boolean;
  createdAt: string | null; // ISO string
  updatedAt: string | null; // ISO string
};



export interface FilterPropertiesParams {
  location?: string;
  min_price?: number;
  max_price?: number;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  furnishing?: string;
  amenities?: string[];
  min_size?: number;
  max_size?: number;
  status?: string;
  is_verified?: boolean;
  is_popular?: boolean;
  is_featured?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface Location {
  street?: string;
  locality?: string;
  nearby?: string;
  city?: string;
  district?: string;
  state?: string;
  zip?: string;
}

export interface Tag {
  label: string;
  color: string;
  icon: string;
}

export interface FeatureItemProps {
  icon: string;
  text: string;
}





















// export enum PropertyType {
//   Flat = 'flat',
//   Apartment = 'apartment',
//   Studio = 'studio',
//   Villa = 'villa',
//   IndependentHouse = 'independent house',
//   RowHouse = 'row house',
//   Bungalow = 'bungalow',
//   Penthouse = 'penthouse',
//   Duplex = 'duplex',
//   Plot = 'plot',
//   Land = 'land',
//   CommercialSpace = 'commercial space',
//   OfficeSpace = 'office space',
//   CoWorkingSpace = 'co-working space',
//   RetailSpace = 'retail space',
//   Warehouse = 'warehouse',
//   IndustrialShed = 'industrial shed',
//   Farmhouse = 'farmhouse',
//   Hostel = 'hostel',
//   PG = 'PG',
//   ServicedApartment = 'serviced apartment',
//   HotelRoom = 'hotel room',
// }

// export enum FurnishingType {
//   Furnished = 'furnished',
//   Unfurnished = 'unfurnished',
//   Partially = 'partially',
// }

// export enum PropertyStatus {
//   Available = 'available',
//   Rented = 'rented',
//   Pending = 'pending',
//   Inactive = 'inactive',
// }

// export enum PropertyFacing {
//   North = 'north',
//   South = 'south',
//   East = 'east',
//   West = 'west',
//   NorthEast = 'north-east',
//   NorthWest = 'north-west',
//   SouthEast = 'south-east',
//   SouthWest = 'south-west',
// }
