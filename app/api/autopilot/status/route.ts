import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://lead-king-backend-production.up.railway.app';
    const response = await fetch(`${backendUrl}/autopilot`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { active: false, error: 'Failed to fetch autopilot status' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { active: false, error: 'Failed to fetch autopilot status' },
      { status: 500 }
    );
  }
}

