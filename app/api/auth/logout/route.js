import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
        response.cookies.set('user_email', '', { expires: new Date(0), path: '/' });
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}