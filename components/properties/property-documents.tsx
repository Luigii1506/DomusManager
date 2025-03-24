"use client";

import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Document {
  id: number;
  name: string;
  type: string;
  uploadedAt: string;
}

interface PropertyDocumentsProps {
  documents: Document[];
}

export function PropertyDocuments({ documents }: PropertyDocumentsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Property Documents</h3>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {documents.map((document) => (
          <Card key={document.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {document.name}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Type: {document.type}
                <br />
                Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
              </CardDescription>
              <div className="mt-2">
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
