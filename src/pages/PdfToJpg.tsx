import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { saveAs } from "file-saver";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToJpg = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise;

        // Convert canvas to blob and download
        await new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const fileName = numPages > 1 
                ? `page-${i}.jpg` 
                : `${file.name.replace('.pdf', '')}.jpg`;
              saveAs(blob, fileName);
            }
            resolve();
          }, "image/jpeg", 0.95);
        });
      }

      toast.success(`Successfully converted ${numPages} page(s) to JPG`);
    } catch (error) {
      console.error("Error converting PDF:", error);
      toast.error("Failed to convert PDF to JPG");
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
            <h1 className="text-4xl font-bold">PDF to JPG</h1>
            <p className="text-lg text-muted-foreground">
              Convert PDF pages to high-quality JPG images
            </p>
          </div>

          <div className="space-y-6">
            <FileUpload 
              onFileSelect={(files) => setFile(files[0] || null)}
              accept=".pdf"
              multiple={false}
              maxSize={50}
            />

            {file && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleConvert}
                  disabled={processing}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Convert to JPG
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

export default PdfToJpg;
