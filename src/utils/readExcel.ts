import { toast } from "sonner";
import { read, utils } from "xlsx";

//eslint-disable-next-line
export const readExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (
      !file.name.toLowerCase().endsWith(".xlsx") &&
      !file.name.toLowerCase().endsWith(".xls") &&
      !file.name.toLowerCase().endsWith(".csv")
    ) {
      toast.error("Invalid file format");
      reject(new Error("Invalid file format"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error("Failed to read file data");
        }

        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = utils.sheet_to_json(sheet, { header: 1 });

        const validData = sheetData.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element: any) => element.length === 3,
        );
        resolve(validData);
      } catch (error) {
        console.error("Error processing file:", error);
        toast.error("Failed to process file");
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast.error("Failed to read file");
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
};
