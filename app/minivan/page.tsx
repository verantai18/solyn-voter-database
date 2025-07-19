'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MinivanPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Minivan - Campaign Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Track campaign performance and voter engagement metrics.
            </p>
            <Button>View Analytics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volunteer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Organize and coordinate volunteer activities and assignments.
            </p>
            <Button>Manage Volunteers</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Plan and manage campaign events and voter outreach activities.
            </p>
            <Button>Plan Events</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage campaign resources, budgets, and material distribution.
            </p>
            <Button>Allocate Resources</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Centralized communication tools for campaign coordination.
            </p>
            <Button>Open Hub</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reporting Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Generate reports and insights for campaign strategy.
            </p>
            <Button>View Reports</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
