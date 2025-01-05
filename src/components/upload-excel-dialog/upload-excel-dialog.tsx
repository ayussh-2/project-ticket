"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { readExcelFile } from "@/utils/readExcel";

import { ExcelPreview } from "../excel-upload/ExcelUpload";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  file: z
    .any()
    .refine((files) => {
      if (typeof window === "undefined") return true; // Skip validation during SSR
      return files instanceof FileList;
    }, "Expected FileList")
    .refine((files) => {
      if (typeof window === "undefined") return true; // Skip validation during SSR
      return (
        files?.[0]?.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        files?.[0]?.type === "application/vnd.ms-excel"
      );
    }, "Only Excel files are allowed"),
});

type FormSchema = z.infer<typeof formSchema>;

export function UploadExcelDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState<unknown[] | null>(null);

  const form = useForm<FormSchema>({
    defaultValues: {
      file: undefined,
    },
  });

  const handleFileChange = async (files: FileList | null) => {
    if (!files?.length) return;

    const file = files[0];
    try {
      const records = await readExcelFile(file);
      setPreviewData(frameData(records));
    } catch (error) {
      toast.error("Error reading Excel file");
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const frameData = (records: any[]) => {
    return records.map((record) => {
      return {
        name: record[0],
        email: record[1],
        teamName: record[2],
      };
    });
  };

  const handleConfirm = async () => {
    toast.success("Hackers updated!");
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
