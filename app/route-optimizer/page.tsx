'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Map, Route } from 'lucide-react';

export default function RouteOptimizerPage() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  const extractAddressesFromPage = () => {
    // Address regex pattern to match voter addresses
    const addressRegex = /\d{1,5}\s+([A-Za-z0-9.,\-\s]+)(Ave|St|Street|Road|Rd|Blvd|Drive|Dr|Ln|Lane|Ct|Court|Way|Place|Pl)\b/gi;
    
    // Get all text content from the page
    const pageText = document.body.innerText;
    const matches = [...pageText.matchAll(addressRegex)];
    const foundAddresses = [...new Set(matches.map(m => m[0]))];
    
    setAddresses(foundAddresses);
    return foundAddresses;
  };

  const optimizeRoutes = async () => {
    if (!apiKey) {
      setError('Please enter your Google Maps API key');
      return;
    }

    const foundAddresses = extractAddressesFromPage();
    
    if (foundAddresses.length < 2) {
      setError('Couldn\'t find at least two valid addresses on this page.');
      return;
    }

    setIsOptimizing(true);
    setError('');
    setRoutes([]);

    const chunkSize = 25;
    const allRoutes: any[] = [];

    try {
      for (let i = 0; i < foundAddresses.length; i += chunkSize - 2) {
        const group = foundAddresses.slice(i, i + chunkSize);
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
        
        finalRoute.forEach((addr, j) => {
          allRoutes.push([`Route ${Math.floor(i / (chunkSize - 2)) + 1}`, `Stop ${j + 1}`, addr]);
        });

        const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking&waypoints=${ordered.map(encodeURIComponent).join('%7C')}`;

        setRoutes(prev => [...prev, {
          routeNumber: Math.floor(i / (chunkSize - 2)) + 1,
          addresses: finalRoute,
          mapsLink
        }]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while optimizing routes');
    } finally {
      setIsOptimizing(false);
    }
  };

  const downloadCSV = () => {
    if (routes.length === 0) return;

    const csvHeader = 'Route,Stop,Address';
    const csvRows = routes.flatMap(route => 
      route.addresses.map((addr: string, index: number) => 
        `${route.routeNumber},${index + 1},"${addr}"`
      )
    );
    
    const csvContent = [csvHeader, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'optimized_canvassing_routes.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Route className="h-6 w-6" />
            Canvassing Route Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Maps API Key</label>
            <Input
              type="password"
              placeholder="Enter your Google Maps API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-600">
              Get your API key from the{' '}
              <a 
                href="https://console.cloud.google.com/apis/credentials" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={optimizeRoutes} 
              disabled={isOptimizing || !apiKey}
              className="flex items-center gap-2"
            >
              <Map className="h-4 w-4" />
              {isOptimizing ? 'Optimizing Routes...' : 'Optimize Page Addresses'}
            </Button>
            
            {routes.length > 0 && (
              <Button 
                onClick={downloadCSV} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download CSV
              </Button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {addresses.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{addresses.length}</Badge>
                <span className="text-sm text-gray-600">addresses found on this page</span>
              </div>
              
              <div className="max-h-40 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {addresses.map((address, index) => (
                    <div key={index} className="text-xs p-2 bg-gray-50 rounded border">
                      {address}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Route Results */}
          {routes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Optimized Routes</h3>
              <div className="space-y-3">
                {routes.map((route, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Route {route.routeNumber}</h4>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(route.mapsLink, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Map className="h-3 w-3" />
                        Open in Maps
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {route.addresses.map((address: string, addrIndex: number) => (
                        <div key={addrIndex} className="text-sm text-gray-600">
                          {addrIndex + 1}. {address}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Enter your Google Maps API key (get one from Google Cloud Console)</li>
              <li>Navigate to the voter database page with addresses you want to canvass</li>
              <li>Click "Optimize Page Addresses" to extract and optimize routes</li>
              <li>Use the "Open in Maps" buttons to view routes in Google Maps</li>
              <li>Download the CSV file for offline reference</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 