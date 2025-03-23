'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Download, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contracts & Documents</h1>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search documents..."
                  className="w-full"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lease">Lease Agreements</SelectItem>
                  <SelectItem value="maintenance">Maintenance Contracts</SelectItem>
                  <SelectItem value="legal">Legal Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {/* Lease Agreements Section */}
              <div>
                <h3 className="font-semibold mb-3">Lease Agreements</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Apartment 4B Lease Agreement</p>
                        <p className="text-sm text-muted-foreground">Updated: Mar 15, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Maintenance Contracts Section */}
              <div>
                <h3 className="font-semibold mb-3">Maintenance Contracts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Annual Maintenance Agreement</p>
                        <p className="text-sm text-muted-foreground">Updated: Feb 28, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Legal Documents Section */}
              <div>
                <h3 className="font-semibold mb-3">Legal Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">Property Insurance Policy</p>
                        <p className="text-sm text-muted-foreground">Updated: Jan 10, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}