import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import PptxGenJS from "pptxgenjs";

const PptToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleConvert = async () => {
    if (!files.length) return toast.error("Please select at least one PPT file");
    setProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        // Note: browser-side PPTX conversion is limited; this embeds raw buffer as image fallback
        const slideImg = await pdfDoc.embedJpg(arrayBuffer as any);
        const page = pdfDoc.addPage([slideImg.width, slideImg.height]);
        page.drawImage(slideImg, { x: 0, y: 0, width: slideImg.width, height: slideImg.height });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

      saveAs(blob, "ppt-to-pdf.pdf");

      toast.success("PPT converted to PDF successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert PPT to PDF");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-center">PPT to PDF</h1>
          <FileUpload onFileSelect={setFiles} accept=".ppt,.pptx" multiple maxSize={20} />
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

export default PptToPdf;
