import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { 
  Combine, 
  SplitSquareHorizontal, 
  Trash2, 
  FileStack, 
  Minimize2,
  ImageIcon,
  FileText,
  Presentation,
  FileSpreadsheet,
  Code,
  FileImage,
  RotateCw,
  Hash,
  Droplet,
  Crop,
  Edit
} from "lucide-react";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const organizeServices = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document",
      icon: Combine,
      path: "/merge"
    },
    {
      title: "Split PDF",
      description: "Divide a PDF into multiple separate files",
      icon: SplitSquareHorizontal,
      path: "/split"
    },
    {
      title: "Remove Pages",
      description: "Delete unwanted pages from your PDF",
      icon: Trash2,
      path: "/remove-pages"
    },
    {
      title: "Extract Pages",
      description: "Extract specific pages into a new PDF",
      icon: FileStack,
      path: "/extract-pages"
    }
  ];

  const optimizeServices = [
    {
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality",
      icon: Minimize2,
      path: "/compress"
    }
  ];

  const convertToServices = [
    {
      title: "JPG to PDF",
      description: "Convert images to PDF documents",
      icon: ImageIcon,
      path: "/jpg-to-pdf"
    },
    {
      title: "WORD to PDF",
      description: "Convert Word documents to PDF",
      icon: FileText,
      path: "/word-to-pdf"
    },
    {
      title: "POWERPOINT to PDF",
      description: "Convert presentations to PDF",
      icon: Presentation,
      path: "/ppt-to-pdf"
    },
    {
      title: "EXCEL to PDF",
      description: "Convert spreadsheets to PDF",
      icon: FileSpreadsheet,
      path: "/excel-to-pdf"
    },
    {
      title: "HTML to PDF",
      description: "Convert web pages to PDF",
      icon: Code,
      path: "/html-to-pdf"
    }
  ];

  const convertFromServices = [
    {
      title: "PDF to JPG",
      description: "Convert PDF pages to images",
      icon: FileImage,
      path: "/pdf-to-jpg"
    },
    {
      title: "PDF to WORD",
      description: "Convert PDF to editable Word documents",
      icon: FileText,
      path: "/pdf-to-word"
    },
    {
      title: "PDF to POWERPOINT",
      description: "Convert PDF to presentations",
      icon: Presentation,
      path: "/pdf-to-ppt"
    },
    {
      title: "PDF to EXCEL",
      description: "Convert PDF to spreadsheets",
      icon: FileSpreadsheet,
      path: "/pdf-to-excel"
    }
  ];

  const editServices = [
    {
      title: "Rotate PDF",
      description: "Rotate pages in your PDF document",
      icon: RotateCw,
      path: "/rotate"
    },
    {
      title: "Add Page Numbers",
      description: "Number your PDF pages automatically",
      icon: Hash,
      path: "/add-page-numbers"
    },
    {
      title: "Add Watermark",
      description: "Protect your PDFs with custom watermarks",
      icon: Droplet,
      path: "/add-watermark"
    },
    {
      title: "Crop PDF",
      description: "Trim and adjust PDF page margins",
      icon: Crop,
      path: "/crop"
    },
    {
      title: "Edit PDF",
      description: "Edit text and content in your PDF",
      icon: Edit,
      path: "/edit"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
      <section
  className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 sm:py-32"
  aria-label="Hero Section - Professional PDF Tools"
>
  {/* Background grid */}
  <div
    className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
    aria-hidden="true"
  />

  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-8 max-w-4xl mx-auto">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
        Professional PDF Tools
        <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          All in One Place
        </span>
      </h1>

      {/* Subheading with keywords */}
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
        Merge, split, compress, convert, and edit PDF files online. Fast, secure, and no installation required.
        Our free PDF tools help you manage documents efficiently.
      </p>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 h-12"
          onClick={() =>
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Button>
      </div>

      {/* Features / Benefits */}
      <ul className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          <span>100% Free</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          <span>Secure Processing</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          <span>No Installation Required</span>
        </li>
      </ul>
    </div>
  </div>
</section>


        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Organize PDF */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold">Organize PDF</h2>
                <p className="text-muted-foreground">Manage and arrange your PDF documents</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {organizeServices.map((service) => (
                  <ServiceCard key={service.path} {...service} />
                ))}
              </div>
            </div>

            {/* Optimize PDF */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold">Optimize PDF</h2>
                <p className="text-muted-foreground">Reduce file size and improve performance</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {optimizeServices.map((service) => (
                  <ServiceCard key={service.path} {...service} />
                ))}
              </div>
            </div>

            {/* Convert to PDF */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold">Convert to PDF</h2>
                <p className="text-muted-foreground">Transform various file formats into PDF</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {convertToServices.map((service) => (
                  <ServiceCard key={service.path} {...service} />
                ))}
              </div>
            </div>

            {/* Convert from PDF */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold">Convert from PDF</h2>
                <p className="text-muted-foreground">Export PDF to other file formats</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {convertFromServices.map((service) => (
                  <ServiceCard key={service.path} {...service} />
                ))}
              </div>
            </div>

            {/* Edit PDF */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold">Edit PDF</h2>
                <p className="text-muted-foreground">Modify and enhance your PDF documents</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {editServices.map((service) => (
                  <ServiceCard key={service.path} {...service} />
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
