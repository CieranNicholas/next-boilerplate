import { NextResponse } from 'next/server';

interface LoginRequest {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	const { email, password }: LoginRequest = await req.json();

	try {
		const response = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		if (response.ok) {
			const data = await response.json();
			const { user, token } = data;

			const nextResponse = NextResponse.json({ message: 'Login successful', user, token }, { status: response.status });
			nextResponse.cookies.set('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'development' ? false : true,
				sameSite: 'strict',
				path: '/',
				expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
				maxAge: 60 * 60 * 24,
			});
			nextResponse.cookies.set('user', JSON.stringify(user), {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'development' ? false : true,
				sameSite: 'strict',
				path: '/',
				expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
				maxAge: 60 * 60 * 24,
			});

			return nextResponse;
		} else {
			const error = await response.json();
			return NextResponse.json({ message: error.message || 'Authentication failed', status: response.status }, { status: response.status });
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
	}
}
