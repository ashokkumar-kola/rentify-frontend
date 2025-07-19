import { useContext } from 'react';
import { EnumsContext } from '../context/EnumsContext';

export const useEnums = () => useContext(EnumsContext);
