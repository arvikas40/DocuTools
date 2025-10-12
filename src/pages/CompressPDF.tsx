import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleCompress = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      // Save with compression options
      const compressedPdfBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const originalSize = file.size;
      const compressedSize = compressedPdfBytes.length;
      const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

      const blob = new Blob([new Uint8Array(compressedPdfBytes)], { type: "application/pdf" });
      saveAs(blob, `compressed-${file.name}`);
      
      toast.success(`PDF compressed! Reduced by ${savings}%`);
    } catch (error) {
      console.error("Error compressing PDF:", error);
      toast.error("Failed to compress PDF. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Compress PDF</h1>
            <p className="text-lg text-muted-foreground">
              Reduce PDF file size while maintaining quality
            </p>
          </div>

          <div className="space-y-6">
            <FileUpload 
              onFileSelect={handleFileSelect}
              accept=".pdf"
              multiple={false}
            />

            {file && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleCompress}
                  disabled={processing}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Compress and Download
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompressPDF;
