import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
	const cookieStore = cookies();
	const token = cookieStore.get('token')?.value;

	try {
		const response = await fetch(`${process.env.BACKEND_URL}/api/auth/validate`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		});
		if (response.ok) {
			const isValid = await response.json();
			const nextResponse = NextResponse.json({ message: 'Login successful', isValid });
			return nextResponse;
		} else {
			const error = await response.json();
			return NextResponse.json({ message: error.message }, { status: response.status });
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
	}
}
