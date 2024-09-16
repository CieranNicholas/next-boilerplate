'use client';

import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface User {
	id: string;
	email: string;
	created_at: string;
	iat: number;
	exp: number;
}

interface AuthContextType {
	user: User | null;
	setUser: (user: User) => void;
	token: string | null;
	setToken: (token: string) => void;
	login: (token: string, user: User) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, savedToken }: { children: ReactNode; savedToken: string | undefined }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function validate() {
			console.log('Validating token...');
			if (!savedToken) return;
			try {
				const res = await fetch('/api/auth/validate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await res.json();
				if (res.ok) {
					const { user, isValid } = data;
					if (isValid) {
						setUser(user);
						setToken(savedToken);
					} else {
						setUser(null);
						setToken(null);
					}
				}
			} catch (error) {
				console.error(error);
				setToken(null);
				setUser(null);
			}
		}

		validate();
	}, []);

	const login = (token: string, user: User) => {
		// Save token and user in cookies for persistence
		setCookie('token', token, {
			maxAge: 60 * 6 * 24,
		});
		setCookie('user', JSON.stringify(user), {
			maxAge: 60 * 6 * 24,
		});

		setUser(user);
		setToken(token);
		router.push('/dashboard'); // Redirect after login
	};

	const logout = async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
		});

		if (response.ok) {
			router.refresh();
			router.push('/');
			setUser(null);
			setToken(null);
		}
	};

	const isAuthenticated = !!token;

	return <AuthContext.Provider value={{ user, setUser, token, setToken, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
