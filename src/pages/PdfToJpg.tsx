// src/pages/PdfToJpg.tsx
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// ✅ Vite + Netlify-safe worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.js",
  import.meta.url
).toString();

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
      const zip = new JSZip();

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas context not found");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // ✅ TypeScript fix: include 'canvas' in render parameters
        await page.render({ canvas, canvasContext: context, viewport }).promise;

        const blob: Blob = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.95)
        );

        if (numPages > 1) {
          zip.file(`page-${i}.jpg`, blob);
        } else {
          // Single page → download directly
          saveAs(blob, `${file.name.replace(".pdf", "")}.jpg`);
        }
      }

      // ✅ Multi-page → download as zip
      if (numPages > 1) {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipName = `${file.name.replace(".pdf", "")}_images.zip`;
        saveAs(zipBlob, zipName);
      }

      toast.success(
        numPages > 1
          ? `Converted ${numPages} pages to JPG and zipped successfully`
          : `Successfully converted 1 page to JPG`
      );
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
              Convert PDF pages to high-quality JPG images (ZIP for multi-page)
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
