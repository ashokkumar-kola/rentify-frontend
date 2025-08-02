import api from '../api/apiClient';

export const fetchPropertyEnums = async () => {
    const response = await api.get('/properties/meta/property-enums');
    return response.data?.data || [];
};
