import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";
import CompressPDF from "./pages/CompressPDF";
import RotatePDF from "./pages/RotatePDF";
import RemovePages from "./pages/RemovePages";
import ExtractPages from "./pages/ExtractPages";
import JpgToPdf from "./pages/JpgToPdf";
import PdfToJpg from "./pages/PdfToJpg";
import AddWatermark from "./pages/AddWatermark";
import AddPageNumbers from "./pages/AddPageNumbers";
import ComingSoon from "./pages/ComingSoon";
import WordToPdf from "./pages/WordToPdf";
import ExcelToPdf from "./pages/ExcelToPdf";
import PptToPdf from "./pages/PptToPdf";
import HtmlToPdf from "./pages/HtmlToPdf";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/merge" element={<MergePDF />} />
          <Route path="/split" element={<SplitPDF />} />
          <Route path="/compress" element={<CompressPDF />} />
          <Route path="/rotate" element={<RotatePDF />} />
          <Route path="/remove-pages" element={<RemovePages />} />
          <Route path="/extract-pages" element={<ExtractPages />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/add-watermark" element={<AddWatermark />} />
          <Route path="/add-page-numbers" element={<AddPageNumbers />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/ppt-to-pdf" element={<PptToPdf />} />
          <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="/html-to-pdf" element={<HtmlToPdf />} />
          <Route path="/pdf-to-word" element={<ComingSoon title="PDF to WORD" description="Convert PDF to editable Word documents" />} />
          <Route path="/pdf-to-ppt" element={<ComingSoon title="PDF to PowerPoint" description="Convert PDF to presentations" />} />
          <Route path="/pdf-to-excel" element={<ComingSoon title="PDF to Excel" description="Convert PDF to spreadsheets" />} />
          <Route path="/crop" element={<ComingSoon title="Crop PDF" description="Trim and adjust PDF page margins" />} />
          <Route path="/edit" element={<ComingSoon title="Edit PDF" description="Edit text and content in your PDF" />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
