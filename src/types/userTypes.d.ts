export type UserRole = 'tenant' | 'landlord' | 'admin';

export type User = {
  id: string;
  full_name: string;
  email: string;
  phone_no?: string;

  role: UserRole[];

  profile_image?: string;

  is_verified: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;

//   createdAt: string;
//   updatedAt: string;
};

export type UserPayLoad = {
	id: string;
	email?: string;
	role?: string;
	exp?: number;
	iat?: number;
};

export type TokenPayload = {
	id: string;
	email?: string;
	role?: string;
	exp?: number;
	iat?: number;
};

interface Landlord {
  id: string;
  full_name: string;
  email: string;
  phone_no?: string;
  profile_image?: string;
  is_verified: boolean;
}
