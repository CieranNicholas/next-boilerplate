import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const nextResponse = NextResponse.json({ message: 'Logout successful' });
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
}
