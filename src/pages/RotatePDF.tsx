import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RotateCw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const RotatePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(90);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleRotate = async (angle: number) => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      const pages = pdf.getPages();
      pages.forEach(page => {
        page.setRotation(degrees(angle));
      });

      const rotatedPdfBytes = await pdf.save();
      const blob = new Blob([new Uint8Array(rotatedPdfBytes)], { type: "application/pdf" });
      saveAs(blob, `rotated-${angle}-${file.name}`);
      
      toast.success(`PDF rotated ${angle}° successfully!`);
    } catch (error) {
      console.error("Error rotating PDF:", error);
      toast.error("Failed to rotate PDF. Please try again.");
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
            <h1 className="text-4xl font-bold">Rotate PDF</h1>
            <p className="text-lg text-muted-foreground">
              Rotate all pages in your PDF document
            </p>
          </div>

          <div className="space-y-6">
            <FileUpload 
              onFileSelect={handleFileSelect}
              accept=".pdf"
              multiple={false}
            />

            {file && (
              <div className="space-y-4 p-6 rounded-xl bg-muted/30 border">
                <p className="text-center font-semibold mb-4">Select rotation angle:</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleRotate(90)}
                    disabled={processing}
                    className="h-24 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary"
                  >
                    <RotateCw className="h-6 w-6" />
                    <span>90°</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleRotate(180)}
                    disabled={processing}
                    className="h-24 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary"
                  >
                    <RotateCw className="h-6 w-6" />
                    <span>180°</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleRotate(270)}
                    disabled={processing}
                    className="h-24 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary"
                  >
                    <RotateCw className="h-6 w-6" />
                    <span>270°</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleRotate(0)}
                    disabled={processing}
                    className="h-24 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary"
                  >
                    <RotateCw className="h-6 w-6" />
                    <span>Reset</span>
                  </Button>
                </div>

                {processing && (
                  <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RotatePDF;
