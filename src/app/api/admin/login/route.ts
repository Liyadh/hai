import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hardcoded credentials for demonstration
    if (email === 'admin@college.edu' && password === 'password123') {
      return NextResponse.json({
        token: 'fake-jwt-token-for-admin',
        user: {
          role: 'admin',
          name: 'College Admin',
          email: 'admin@college.edu',
        },
      });
    }

    if (email === 'superadmin@college.edu' && password === 'superpassword123') {
        return NextResponse.json({
          token: 'fake-jwt-token-for-superadmin',
          user: {
            role: 'superadmin',
            name: 'Super Admin',
            email: 'superadmin@college.edu',
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
