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
