import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  title: string;
  description: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Construction className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
              <p className="text-muted-foreground">
                This feature is currently under development and will be available soon.
              </p>
            </div>

            <Button 
              onClick={() => navigate("/")}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
