import { Location } from '../types/Property';

export const formatLocation = (location: Location): string => {
  if (!location) {return '';}

  const parts: string[] = [];

  if (location.nearby) {parts.push(location.nearby);}
  if (location.street) {parts.push(location.street);}
  if (location.locality) {parts.push(location.locality);}
  if (location.city) {parts.push(location.city);}
  if (location.district && location.district !== location.city) {parts.push(location.district);}
  if (location.state) {parts.push(location.state);}
  if (location.zip) {parts.push(location.zip);}

  return parts.filter(Boolean).join(', ');
};
