import { useAuth } from '@/providers/session-provider';
import { useEffect, useState } from 'react';

export function useAuthValidation() {
	const { token, logout, setUser } = useAuth();
	const [isValid, setIsValid] = useState<boolean>(false);

	useEffect(() => {
		if (token) {
			const verifyToken = async () => {
				try {
					const res = await fetch('/api/auth/validate', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
					});
					if (res.ok) {
						const data = await res.json();
						const { message, isValid } = data;

						setIsValid(isValid);
					} else {
						setIsValid(false);
						logout();
					}
				} catch (err) {
					setIsValid(false);
					logout();
				}
			};
			verifyToken();
		} else {
			setIsValid(false);
		}
	}, [token]);

	return { isValid };
}
