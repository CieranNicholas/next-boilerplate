import { NextResponse } from 'next/server';

interface SignupRequest {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	const { email, password }: SignupRequest = await req.json();

	try {
		const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const nextResponse = NextResponse.json({ message: 'Signup successful' });
			return nextResponse;
		} else {
			const error = await response.json();
			return NextResponse.json({ message: error.message || 'Signup failed', status: response.status }, { status: response.status });
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
	}
}
