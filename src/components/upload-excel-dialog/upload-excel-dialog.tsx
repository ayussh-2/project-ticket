"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ExcelPreview } from "../excel-upload/ExcelUpload";

const formSchema = z.object({
  file: z.instanceof(FileList),
});

export function UploadExcelDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState<unknown[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = async (files: FileList | null) => {
    if (!files?.length) return;

    // const file = files[0];
    // In a real app, this would parse the Excel file
    // For demo, we'll simulate parsed data
    const mockParsedData = [
      {
        name: "John Excel",
        email: "john@excel.com",
        teamName: "Excel Team",
      },
      {
        name: "Jane Sheet",
        email: "jane@sheet.com",
        teamName: "Sheet Squad",
      },
    ];
    setPreviewData(mockParsedData);
  };

  const handleConfirm = async () => {
    // In a real app, this would process and save the data
    toast.success("Excel file uploaded successfully");
    setOpen(false);
    setPreviewData(null);
    form.reset();
  };

  const handleCancel = () => {
    setPreviewData(null);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Upload Excel File</DialogTitle>
          <DialogDescription>
            Upload an Excel file containing hacker details.
          </DialogDescription>
        </DialogHeader>
        {!previewData ? (
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange }, ...field }) => (
                  <FormItem>
                    <FormLabel>Excel File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleFileChange(e.target.files);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <ExcelPreview
            data={previewData}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
