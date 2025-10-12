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

const RemovePages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pagesToRemove, setPagesToRemove] = useState("");

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

  const handleRemove = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!pagesToRemove.trim()) {
      toast.error("Please enter page numbers to remove (e.g., 1,3,5)");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const pagesToDelete = pagesToRemove.split(",").map(p => parseInt(p.trim()) - 1);
      const invalidPages = pagesToDelete.filter(p => p < 0 || p >= pageCount);
      
      if (invalidPages.length > 0) {
        toast.error("Some page numbers are invalid");
        setProcessing(false);
        return;
      }

      // Remove pages in reverse order to maintain indices
      pagesToDelete.sort((a, b) => b - a).forEach(pageIndex => {
        pdf.removePage(pageIndex);
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      saveAs(blob, `removed-pages-${file.name}`);

      toast.success(`Removed ${pagesToDelete.length} page(s) successfully!`);
    } catch (error) {
      console.error("Error removing pages:", error);
      toast.error("Failed to remove pages");
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
            <h1 className="text-4xl font-bold">Remove Pages</h1>
            <p className="text-lg text-muted-foreground">
              Delete unwanted pages from your PDF document
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
                  <Label htmlFor="pages">Pages to Remove (e.g., 1,3,5)</Label>
                  <Input
                    id="pages"
                    placeholder="1,3,5"
                    value={pagesToRemove}
                    onChange={(e) => setPagesToRemove(e.target.value)}
                  />
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleRemove}
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
                        Remove and Download
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

export default RemovePages;
