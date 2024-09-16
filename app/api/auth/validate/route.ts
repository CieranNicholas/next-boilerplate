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
			const data = await response.json();
			const { user, isValid } = data;
			if (!isValid) {
				const nextResponse = NextResponse.json({ message: 'Invalid Token, Login Out.', isValid, user });
				nextResponse.cookies.set('token', '', {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'development' ? false : true,
					sameSite: 'strict',
					expires: new Date(0),
				});
				nextResponse.cookies.set('user', '', {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'development' ? false : true,
					sameSite: 'strict',
					expires: new Date(0),
				});
				return nextResponse;
			} else {
				const nextResponse = NextResponse.json({ message: 'Login successful', isValid, user });
				return nextResponse;
			}
		} else {
			const error = await response.json();
			return NextResponse.json({ message: error.message }, { status: response.status });
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
	}
}
