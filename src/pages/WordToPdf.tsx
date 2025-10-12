import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import mammoth from "mammoth";

const WordToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleConvert = async () => {
    if (!files.length) return toast.error("Please select at least one Word file");
    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value || "";

        const page = pdfDoc.addPage();
        page.drawText(text, { x: 50, y: page.getHeight() - 50, size: 12, color: rgb(0, 0, 0), maxWidth: page.getWidth() - 100, lineHeight: 14 });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

      saveAs(blob, "word-to-pdf.pdf");

      toast.success("Word converted to PDF successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert Word to PDF");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-center">Word to PDF</h1>
          <FileUpload onFileSelect={setFiles} accept=".docx" multiple maxSize={20} />
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

export default WordToPdf;
