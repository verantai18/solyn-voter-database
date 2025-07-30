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

    // Google Maps API allows max 10 waypoints per request
    // So we can have: origin + 10 waypoints + destination = 12 total addresses per route
    const maxAddressesPerRoute = 12;
    const allRoutes: any[] = [];

    // Split addresses into chunks that fit within Google Maps API limits
    for (let i = 0; i < addresses.length; i += maxAddressesPerRoute - 1) {
      const chunk = addresses.slice(i, i + maxAddressesPerRoute);
      
      if (chunk.length < 2) {
        // Skip chunks with less than 2 addresses
        continue;
      }

      const origin = chunk[0];
      const destination = chunk[chunk.length - 1];
      const waypoints = chunk.slice(1, -1);

      try {
        const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=walking&key=${apiKey}&waypoints=optimize:true|${waypoints.map(encodeURIComponent).join('|')}`;

        const res = await fetch(apiUrl);
        const data = await res.json();
        
        if (data.status !== 'OK') {
          console.error(`Google Maps API Error for route ${Math.floor(i / (maxAddressesPerRoute - 1)) + 1}:`, data.status);
          // Continue with other routes even if one fails
          continue;
        }

        const ordered = data.routes[0].waypoint_order.map((i: number) => waypoints[i]);
        const finalRoute = [origin, ...ordered, destination];
        
        const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking&waypoints=${ordered.map(encodeURIComponent).join('%7C')}`;

        allRoutes.push({
          routeNumber: Math.floor(i / (maxAddressesPerRoute - 1)) + 1,
          addresses: finalRoute,
          mapsLink,
          totalDistance: data.routes[0].legs.reduce((sum: number, leg: any) => sum + leg.distance.value, 0),
          totalDuration: data.routes[0].legs.reduce((sum: number, leg: any) => sum + leg.duration.value, 0)
        });

      } catch (error) {
        console.error(`Error processing route ${Math.floor(i / (maxAddressesPerRoute - 1)) + 1}:`, error);
        // Continue with other routes
        continue;
      }
    }

    if (allRoutes.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to create any routes. Please check your addresses and try again.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      routes: allRoutes,
      totalRoutes: allRoutes.length,
      totalAddresses: addresses.length,
      maxAddressesPerRoute
    });

  } catch (error: any) {
    console.error('Route optimization error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to optimize routes' 
    }, { status: 500 });
  }
} 