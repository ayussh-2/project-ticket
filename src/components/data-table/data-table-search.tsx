"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DataTableSearch({ value, onChange }: DataTableSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search all columns..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 w-[300px]"
      />
    </div>
  );
}
