// Property Types
export const PROPERTY_TYPES = [
  'flat', 'apartment', 'studio', 'villa', 'house', 'independent house', 'row house',
  'bungalow', 'penthouse', 'duplex', 'plot', 'land', 'commercial space',
  'office space', 'co-working space', 'retail space', 'warehouse',
  'industrial shed', 'farmhouse', 'hostel', 'PG', 'serviced apartment', 'hotel room'
] as const;

export type PROPERTY_TYPES = typeof PROPERTY_TYPES[number];

// Furnishing Types
export const FURNISHING_TYPES = ['furnished', 'unfurnished', 'partially'] as const;

export type FURNISHING_TYPES = typeof FURNISHING_TYPES[number];

// Property Status
export const PROPERTY_STATUS_TYPES = ['available', 'rented', 'pending', 'inactive'] as const;

export type PropertyStatus = typeof PROPERTY_STATUS_TYPES[number];

// Facing Types
export const PROPERTY_FACING_TYPES = [
  'north', 'south', 'east', 'west',
  'north-east', 'north-west', 'south-east', 'south-west'
] as const;

export type PROPERTY_FACING_TYPES = typeof PROPERTY_FACING_TYPES[number];

// Amenities
export const PROPERTY_AMENITIES = [
  'parking', 'pool', 'gym', 'balcony', 'elevator', 'security',
  'garden', 'terrace', 'concierge', 'laundry', 'wifi', 'furnished',
  'fireplace', 'study', 'servant room', 'play area', 'smart home',
  'high-speed internet', 'conference room', 'pantry', 'storage',
  'handicap accessible', 'rooftop', 'library', 'home theater'
] as const;

export type PROPERTY_AMENITIES = typeof PROPERTY_AMENITIES[number];









// export type PROPERTY_TYPES =
//   | 'flat' | 'apartment' | 'studio' | 'villa' | 'independent house' | 'row house'
//   | 'bungalow' | 'penthouse' | 'duplex' | 'plot' | 'land' | 'commercial space'
//   | 'office space' | 'co-working space' | 'retail space' | 'warehouse'
//   | 'industrial shed' | 'farmhouse' | 'hostel' | 'PG' | 'serviced apartment' | 'hotel room';

// export type FURNISHING_TYPES = 'furnished' | 'unfurnished' | 'partially';

// export type PropertyStatus = 'available' | 'rented' | 'pending' | 'inactive';

// export type PROPERTY_FACING_TYPES =
//   | 'north' | 'south' | 'east' | 'west'
//   | 'north-east' | 'north-west' | 'south-east' | 'south-west';


// export type PROPERTY_AMENITIES =
//   | 'parking' | 'gym' | 'swimming pool' | 'garden' | 'security';

