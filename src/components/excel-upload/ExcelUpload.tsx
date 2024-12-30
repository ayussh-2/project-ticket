/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface ExcelPreviewProps {
  data: any[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExcelPreview({ data, onConfirm, onCancel }: ExcelPreviewProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      toast.success(`Successfully processed ${data.length} records`);
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to process records");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Preview ({data.length} records)</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            <X className="mr-2 h-4 w-4" />
            Decline
          </Button>
          <Button onClick={handleConfirm} disabled={isProcessing}>
            <Check className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="rounded-md border max-h-96 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0] || {}).map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value: any, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
