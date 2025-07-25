import api from '../api/apiClient';

// import { handleApiError } from './errorHandler';

// export type NotificationsPayload = {
//     title: string;
//     message: string;
//     type: 'payment' | 'visit' | 'approval' | 'other';
//     sender_id: string;
//     receiver_id: string;
//     property_id: string;
// };

// type myPropertiesPayload = {
//   id: string;
// }

export const getMyProperties = async (userId: any) => {
  const response = await api.get(`/properties/${userId}/my-properties`);
  return response.data?.data || {};
};

// Notifications
export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data?.data || {};
};
