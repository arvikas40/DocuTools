import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ComingSoon from "./ComingSoon";

const PdfToJpg = () => {
  return (
    <ComingSoon 
      title="PDF to JPG"
      description="Convert PDF pages to high-quality JPG images"
    />
  );
};

export default PdfToJpg;
