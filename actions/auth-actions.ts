'use server';

export async function handleSignIn(email: string, password: string) {
	try {
		const res = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		const { token } = data;
		return token;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
