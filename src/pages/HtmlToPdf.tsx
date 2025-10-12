import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const HtmlToPdf = () => {
  const [processing, setProcessing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleConvert = async () => {
    if (!contentRef.current) return toast.error("No HTML content found");
    setProcessing(true);

    try {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdfDoc = await PDFDocument.create();
      const img = await pdfDoc.embedPng(imgData);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });

      const pdfBytes = await pdfDoc.save();
const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

      saveAs(blob, "html-to-pdf.pdf");

      toast.success("HTML converted to PDF successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert HTML to PDF");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-center">HTML to PDF</h1>

          <div ref={contentRef} className="p-6 border rounded-lg">
            <h2>Sample HTML content</h2>
            <p>This content will be converted to a PDF document.</p>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleConvert} disabled={processing} size="lg">
              {processing ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Converting...</> : <><Download className="mr-2 h-5 w-5" /> Convert to PDF</>}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HtmlToPdf;
