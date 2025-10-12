import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { toast } from "sonner";

const ExcelToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleConvert = async () => {
    if (!files.length) return toast.error("Please select at least one Excel file");
    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
          const page = pdfDoc.addPage();
          let y = page.getHeight() - 50;

          rows.forEach((row) => {
            page.drawText(row.join(" | "), { x: 50, y, size: 12, color: rgb(0, 0, 0) });
            y -= 18;
          });
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

      saveAs(blob, "excel-to-pdf.pdf");

      toast.success("Excel converted to PDF successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert Excel to PDF");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-center">Excel to PDF</h1>
          <FileUpload onFileSelect={setFiles} accept=".xls,.xlsx" multiple maxSize={20} />
          {files.length > 0 && (
            <div className="flex justify-center">
              <Button onClick={handleConvert} disabled={processing} size="lg">
                {processing ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Converting...</> : <><Download className="mr-2 h-5 w-5" /> Convert to PDF</>}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExcelToPdf;
