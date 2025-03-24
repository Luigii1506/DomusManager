"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
}

export interface PropertyDocumentsProps {
  propertyId: string;
  documents: Document[];
}

export function PropertyDocuments({
  propertyId,
  documents,
}: PropertyDocumentsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Documents</CardTitle>
        <Button>Upload Document</Button>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {document.type} •{" "}
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" asChild>
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
