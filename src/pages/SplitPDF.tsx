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

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [splitRanges, setSplitRanges] = useState("");

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

  const handleSplit = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!splitRanges.trim()) {
      toast.error("Please enter page ranges (e.g., 1-3,4-6)");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);

      const ranges = splitRanges.split(",").map(r => r.trim());
      
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        const [start, end] = range.split("-").map(n => parseInt(n.trim()));
        
        if (isNaN(start) || isNaN(end) || start < 1 || end > pageCount || start > end) {
          toast.error(`Invalid range: ${range}`);
          continue;
        }

        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(sourcePdf, Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i));
        pages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
        saveAs(blob, `split-${i + 1}_pages-${start}-${end}.pdf`);
      }

      toast.success("PDF split successfully!");
    } catch (error) {
      console.error("Error splitting PDF:", error);
      toast.error("Failed to split PDF. Please check your page ranges.");
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
            <h1 className="text-4xl font-bold">Split PDF</h1>
            <p className="text-lg text-muted-foreground">
              Divide your PDF into multiple documents
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
                  Total pages in document: <span className="font-semibold text-foreground">{pageCount}</span>
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="ranges">Page Ranges (e.g., 1-3,4-6,7-10)</Label>
                  <Input
                    id="ranges"
                    placeholder="1-3,4-6"
                    value={splitRanges}
                    onChange={(e) => setSplitRanges(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter comma-separated ranges to split the PDF
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleSplit}
                    disabled={processing}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Splitting...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Split and Download
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

export default SplitPDF;
