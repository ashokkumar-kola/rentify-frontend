import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProfile } from '../services/AuthService';

import type { User } from '../types/userTypes';

type AuthContextType = {
	user: User;
	token: string | null;
	isLoggedIn: boolean;
	login: (token: string, user: any) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadAuth = async () => {
			try {
				const savedToken = await AsyncStorage.getItem('authToken');
				if (savedToken) {
					setToken(savedToken);
					const res = await fetchProfile();
					setUser(res.data);
					setIsLoggedIn(true);
				}
			} catch (err) {
				await AsyncStorage.removeItem('authToken');
			} finally {
				setLoading(false);
			}
		};
		loadAuth();
	}, []);

	const login = async (newToken: string, userData: any) => {
		setToken(newToken);
		setUser(userData);
		setIsLoggedIn(true);
		await AsyncStorage.setItem('authToken', newToken);
	};

	const logout = async () => {
		setToken(null);
		setUser(null);
		setIsLoggedIn(false);
		await AsyncStorage.removeItem('authToken');
	};

	if (loading) {return null;}
	// if (loading) {
	// 	return (
	// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	// 			<ActivityIndicator size="large" />
	// 		</View>
	// 	);
	// }

	return (
		<AuthContext.Provider
			value={{ user, token, isLoggedIn, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used inside AuthProvider');
	}
	return context;
};


// axios.defaults.headers.common[
// 'Authorization'
// ] = `Bearer ${result.data.token}`;
