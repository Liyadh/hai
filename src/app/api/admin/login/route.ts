import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hardcoded credentials for demonstration
    if (email === 'admin@gmail.com' && password === '12345678') {
      return NextResponse.json({
        token: 'fake-jwt-token-for-admin',
        user: {
          role: 'admin',
          name: 'College Admin',
          email: 'admin@gmail.com',
        },
      });
    }

    if (email === 'superadmin@gmail.com' && password === '123456') {
        return NextResponse.json({
          token: 'fake-jwt-token-for-superadmin',
          user: {
            role: 'superadmin',
            name: 'Super Admin',
            email: 'superadmin@gmail.com',
          },
        });
      }

    return NextResponse.json(
      { message: 'Invalid email or password. Please try again.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
