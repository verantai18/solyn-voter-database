import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { addresses } = await request.json();
    
    if (!addresses || addresses.length < 2) {
      return NextResponse.json({ 
        error: 'Need at least 2 addresses to create a route' 
      }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Google Maps API key not configured' 
      }, { status: 500 });
    }

    const chunkSize = 25;
    const allRoutes: any[] = [];

    for (let i = 0; i < addresses.length; i += chunkSize - 2) {
      const group = addresses.slice(i, i + chunkSize);
      const origin = group[0];
      const destination = group[group.length - 1];
      const waypoints = group.slice(1, -1);

      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=walking&key=${apiKey}&waypoints=optimize:true|${waypoints.map(encodeURIComponent).join('|')}`;

      const res = await fetch(apiUrl);
      const data = await res.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Google Maps API Error: ${data.status}`);
      }

      const ordered = data.routes[0].waypoint_order.map((i: number) => waypoints[i]);
      const finalRoute = [origin, ...ordered, destination];
      
      const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking&waypoints=${ordered.map(encodeURIComponent).join('%7C')}`;

      allRoutes.push({
        routeNumber: Math.floor(i / (chunkSize - 2)) + 1,
        addresses: finalRoute,
        mapsLink
      });
    }

    return NextResponse.json({ routes: allRoutes });

  } catch (error: any) {
    console.error('Route optimization error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to optimize routes' 
    }, { status: 500 });
  }
} 