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

      // For true optimization, we need to use the waypoints=optimize:true parameter
      // This tells Google Maps to find the most efficient order of waypoints
      const origin = chunk[0];
      const destination = chunk[chunk.length - 1];
      const waypoints = chunk.slice(1, -1);

      try {
        // Use optimize:true to get the most efficient route order
        const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=walking&key=${apiKey}&waypoints=optimize:true|${waypoints.map(encodeURIComponent).join('|')}`;

        const res = await fetch(apiUrl);
        const data = await res.json();
        
        if (data.status !== 'OK') {
          console.error(`Google Maps API Error for route ${Math.floor(i / (maxAddressesPerRoute - 1)) + 1}:`, data.status);
          // Continue with other routes even if one fails
          continue;
        }

        // Google Maps returns the optimized order of waypoints
        const optimizedWaypointOrder = data.routes[0].waypoint_order;
        const optimizedWaypoints = optimizedWaypointOrder.map((index: number) => waypoints[index]);
        
        // Create the final optimized route: origin + optimized waypoints + destination
        const finalRoute = [origin, ...optimizedWaypoints, destination];
        
        // Calculate total distance and duration
        const totalDistance = data.routes[0].legs.reduce((sum: number, leg: any) => sum + leg.distance.value, 0);
        const totalDuration = data.routes[0].legs.reduce((sum: number, leg: any) => sum + leg.duration.value, 0);
        
        // Create Google Maps link with optimized waypoints
        const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking&waypoints=${optimizedWaypoints.map(encodeURIComponent).join('%7C')}`;

        allRoutes.push({
          routeNumber: Math.floor(i / (maxAddressesPerRoute - 1)) + 1,
          addresses: finalRoute,
          mapsLink,
          totalDistance: Math.round(totalDistance * 0.000621371), // Convert meters to miles
          totalDuration: Math.round(totalDuration / 60), // Convert seconds to minutes
          optimizationScore: finalRoute.length / (totalDistance * 0.000621371) // Houses per mile
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

    // Sort routes by optimization score (houses per mile) to show most efficient first
    allRoutes.sort((a, b) => b.optimizationScore - a.optimizationScore);

    // Calculate overall statistics
    const totalDistance = allRoutes.reduce((sum, route) => sum + route.totalDistance, 0);
    const totalDuration = allRoutes.reduce((sum, route) => sum + route.totalDuration, 0);
    const totalAddresses = addresses.length;

    return NextResponse.json({ 
      routes: allRoutes,
      totalRoutes: allRoutes.length,
      totalAddresses,
      totalDistance,
      totalDuration,
      maxAddressesPerRoute,
      averageHousesPerMile: totalAddresses / totalDistance
    });

  } catch (error: any) {
    console.error('Route optimization error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to optimize routes' 
    }, { status: 500 });
  }
} 