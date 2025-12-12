import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://lead-king-backend-production.up.railway.app';
    const response = await fetch(`${backendUrl}/campaigns`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // In production, you'd want to pass auth tokens here
    });

    if (!response.ok) {
      // If backend is not available, return empty array
      return NextResponse.json([]);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // If backend is not available, return empty array
    console.error('Failed to fetch campaigns:', error);
    return NextResponse.json([]);
  }
}

