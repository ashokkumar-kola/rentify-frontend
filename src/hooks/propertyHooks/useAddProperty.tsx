import { useState } from 'react';
import { addProperty } from '../../services/PropertyServices';
import type { Property, Location } from '../../types/Property';

const initialData: Property = {
  title: '',
  price: 0,
  deposit: 0,
  property_type: 'flat',
  location: {
    nearby: '',
    street: '',
    locality: '',
    city: '',
    district: '',
    state: '',
    country: '',
    zip: '',
    geo: {
      lat: null,
      lng: null,
    },
  },
  floor_no: '',
  total_floors: '',
  bedrooms: 1,
  bathrooms: 1,
  area: '',
  carpet_area: '',
  furnishing: 'furnished',
  amenities: [],
  status: 'pending',
  facing: 'east',
  built_year: '',
  description: '',
  // video_url: '',
};

// const Errors = {
//   title: '',
//   price: '',
//   deposit: '',
//   property_type: '',
//   floor_no: '',
//   total_floors: '',
//   bedrooms: 0,
//   bathrooms: 0,
//   // area: '',
//   // carpet_area: '',
//   // furnishing: '',
//   // amenities: [],
//   // facing: '',
//   // built_year: '',
//   // description: '',
//   // video_url: '',
// };

const useAddProperty = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle field changes
  const handleChange = (key: keyof typeof initialData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  // Validate required fields
  const validate = () => {
    const newErrors: any = {};
    if (!data.title?.trim()) {newErrors.title = 'Title is required';}
    if (!data.price) {newErrors.price = 'Price is required';}
    if (!data.deposit) {newErrors.deposit = 'Deposit is required';}
    if (!data.property_type?.trim()) {newErrors.property_type = 'Property type is required';}
    if (!data.bedrooms) {newErrors.bedrooms = 'Bedrooms are required';}
    if (!data.bathrooms) {newErrors.bathrooms = 'Bathrooms are required';}
    console.log('validate :', data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mapFormToPayload = (
    form: Property,
  ): Property => ({
    title: form.title.trim(),
    price: Number(form.price),
    deposit: Number(form.deposit),
    property_type: form.property_type,
    location: form.location,
    floor_no: Number(form.floor_no),
    total_floors: Number(form.total_floors),
    bedrooms: Number(form.bedrooms),
    bathrooms: Number(form.bathrooms),
    area: form.area ? Number(form.area) : '',
    carpet_area: form.carpet_area ? Number(form.carpet_area) : '',
    furnishing: form.furnishing,
    amenities: form.amenities,
    facing: form.facing,
    status: form.status,
    built_year: form.built_year ? Number(form.built_year) : null,
    description: form.description,
    // video_url: form.video_url,
  });

  // Submit form
  const handleAddProperty = async () => {
    // console.log(data);
    if (!validate()) {return { success: false };}

    try {
      setLoading(true);
      // console.log(data);

      //  const payload = {
      //   ...data,
      //   price: Number(data.price),
      //   deposit: Number(data.deposit),
      // };
      const payload = mapFormToPayload(data);
      console.log(JSON.stringify(payload));

      const response = await addProperty(payload);
      setMessage(response.data.message);
      console.log(response.data);
      return {
        success: response.success,
        message: response.data.message,
      };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to add property';
      setMessage(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    errors,
    loading,
    message,
    handleChange,
    handleAddProperty,
  };
};

export default useAddProperty;


// import { useState } from 'react';
// import { addProperty } from '../../services/PropertyServices';
// import { Property } from '../../types/Property';

// const initialData: Partial<Property> = {
//   title: '', // required
//   price: '', // required
//   deposit: '', // required
//   property_type: '', // required
//   floor_no: 0,
//   total_floors: 0,
//   bedrooms: 1, // required
//   bathrooms: 1, // required
//   area: 0,
//   carpet_area: 0,
//   images: [],
//   furnishing: '', // optional
//   amenities: [],
//   facing: '',
//   built_year: 0,
//   description: '',
//   location: {
//     nearby: '',
//     street: '',
//     locality: '',
//     city: '', // required
//     district: '',
//     state: '', // required
//     zip: '',
//     geo: {
//       lat: 0,
//       lng: 0,
//     },
//   },
//   available_from: '', // optional
//   status: 'available',
//   video_url: '',
// };

// type Errors = {
//   [K in keyof typeof initialData]?: string;
// } & { location?: string };

// const useAddProperty = () => {
//   const [data, setData] = useState(initialData);
//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   // Handle top-level field changes
//   const handleChange = (key: keyof Property, value: any) => {
//     setData(prev => ({ ...prev, [key]: value }));
//     setErrors(prev => ({ ...prev, [key]: '' }));
//   };

//   // Handle nested location changes
//   const handleLocationChange = (key: keyof Property['location'], value: any) => {
//     setData(prev => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         [key]: value,
//       },
//     }));
//     setErrors(prev => ({ ...prev, location: '' }));
//   };

//   // Validate required fields
//   const validate = () => {
//     const newErrors: Errors = {};

//     if (!data.title?.trim()) {newErrors.title = 'Title is required';}
//     if (!data.price) {newErrors.price = 'Price is required';}
//     if (!data.deposit) {newErrors.deposit = 'Deposit is required';}
//     if (!data.property_type?.trim()) {newErrors.property_type = 'Property type is required';}
//     if (!data.bedrooms) {newErrors.bedrooms = 'Bedrooms are required';}
//     if (!data.bathrooms) {newErrors.bathrooms = 'Bathrooms are required';}
//     if (!data.location?.city?.trim()) {newErrors.location = 'City is required';}
//     if (!data.location?.state?.trim()) {newErrors.location = 'State is required';}

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit the property data
//   const handleAddProperty = async () => {
//     if (!validate()) {return { success: false };}

//     try {
//       setLoading(true);
//       const response = await addProperty(data); // Assumes service includes token
//       setMessage('Property added successfully');
//       return { success: true, message: response.data.message };
//     } catch (err: any) {
//       const msg = err?.response?.data?.message || 'Failed to add property';
//       setMessage(msg);
//       return { success: false, message: msg };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     data,
//     errors,
//     loading,
//     message,
//     setData,
//     handleChange,
//     handleLocationChange,
//     handleAddProperty,
//   };
// };

// export default useAddProperty;


// import { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { Property } from '../../types/Property';
// import { addProperty } from '../../services/PropertyServices';
import { Location } from '../../types/Property.d';

// const initialData: Partial<Property> = {
//   title: '',
//   price: '',
//   deposit: '',
//   property_type: '',
//   bedrooms: 1,
//   bathrooms: 1,
//   area: 0,
//   carpet_area: 0,
//   images: [],
//   furnishing: '',
//   amenities: [],
//   facing: undefined,
//   built_year: 0,
//   description: '',
// //   available_from: new Date().toISOString(),
//   location: {
//     nearby: '',
//     street: '',
//     locality: '',
//     city: '',
//     district: '',
//     state: '',
//     zip: '',
//     geo: { lat: 0, lng: 0 },
//   },
//   status: 'available',
//   video_url: '',
// //   virtual_tour_url: '',
// //   is_popular: false,
// //   is_featured: false,
// };

// type Errors = {
//   [K in keyof typeof initialData]?: string;
// };

// const useAddProperty = () => {
//   const [data, setData] = useState(initialData);
//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (key: string, value: any) => {
//     setData(prev => ({ ...prev, [key]: value }));
//     setErrors(prev => ({ ...prev, [key]: '' }));
//   };

//   const handleLocationChange = (key: string, value: any) => {
//     setData(prev => ({
//       ...prev,
//       location: { ...prev.location, [key]: value },
//     }));
//     setErrors(prev => ({ ...prev, location: '' }));
//   };

//   const validate = () => {
//     const newErrors: Errors = {};

//     if (!data.title?.trim()) {newErrors.title = 'Title is required';}
//     if (!data.price) {newErrors.price = 'Price is required';}
//     if (!data.deposit) {newErrors.deposit = 'Deposit is required';}
//     if (!data.property_type) {newErrors.property_type = 'Property type is required';}
//     if (!data.bedrooms) {newErrors.bedrooms = 'Bedrooms required';}
//     if (!data.bathrooms) {newErrors.bathrooms = 'Bathrooms required';}
//     if (!data.furnishing) {newErrors.furnishing = 'Furnishing is required';}
//     if (!data.location?.city?.trim()) {newErrors.location = 'City is required';}
//     if (!data.location?.state?.trim()) {newErrors.location = 'State is required';}

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleAddProperty = async () => {
//     if (!validate()) {return { success: false };}

//     try {
//       setLoading(true);
//       const response = await addProperty(data);

//       setMessage('Property added successfully');
//       return { success: true, message: response.data.message };
//     } catch (err: any) {
//       const msg = err?.response?.data?.message || 'Failed to add property';
//       setMessage(msg);
//       return { success: false, message: msg };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     data,
//     errors,
//     loading,
//     message,
//     setData,
//     handleChange,
//     handleLocationChange,
//     handleAddProperty,
//   };
// };

// export default useAddProperty;
