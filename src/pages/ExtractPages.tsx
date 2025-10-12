import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const ExtractPages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pagesToExtract, setPagesToExtract] = useState("");

  const handleFileSelect = async (files: File[]) => {
    if (files.length === 0) return;
    
    const selectedFile = files[0];
    setFile(selectedFile);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    } catch (error) {
      console.error("Error loading PDF:", error);
      toast.error("Failed to load PDF");
    }
  };

  const handleExtract = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!pagesToExtract.trim()) {
      toast.error("Please enter page numbers or ranges (e.g., 1-3,5,7-9)");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Parse page numbers and ranges
      const pageIndices: number[] = [];
      const parts = pagesToExtract.split(",");
      
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes("-")) {
          const [start, end] = trimmed.split("-").map(n => parseInt(n.trim()));
          if (isNaN(start) || isNaN(end) || start < 1 || end > pageCount || start > end) {
            toast.error(`Invalid range: ${trimmed}`);
            setProcessing(false);
            return;
          }
          for (let i = start; i <= end; i++) {
            pageIndices.push(i - 1);
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (isNaN(pageNum) || pageNum < 1 || pageNum > pageCount) {
            toast.error(`Invalid page number: ${trimmed}`);
            setProcessing(false);
            return;
          }
          pageIndices.push(pageNum - 1);
        }
      }

      const pages = await newPdf.copyPages(sourcePdf, pageIndices);
      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      saveAs(blob, `extracted-pages-${file.name}`);

      toast.success(`Extracted ${pageIndices.length} page(s) successfully!`);
    } catch (error) {
      console.error("Error extracting pages:", error);
      toast.error("Failed to extract pages");
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
            <h1 className="text-4xl font-bold">Extract Pages</h1>
            <p className="text-lg text-muted-foreground">
              Extract specific pages into a new PDF document
            </p>
          </div>

          <div className="space-y-6">
            <FileUpload 
              onFileSelect={handleFileSelect}
              accept=".pdf"
              multiple={false}
            />

            {pageCount > 0 && (
              <div className="space-y-4 p-6 rounded-xl bg-muted/30 border">
                <p className="text-sm text-muted-foreground">
                  Total pages: <span className="font-semibold text-foreground">{pageCount}</span>
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="pages">Pages to Extract (e.g., 1-3,5,7-9)</Label>
                  <Input
                    id="pages"
                    placeholder="1-3,5,7-9"
                    value={pagesToExtract}
                    onChange={(e) => setPagesToExtract(e.target.value)}
                  />
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleExtract}
                    disabled={processing}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Extract and Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExtractPages;
