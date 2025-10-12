import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const ServiceCard = ({ title, description, icon: Icon, path }: ServiceCardProps) => {
  return (
    <Link to={path} className="block group">
      <Card className="relative overflow-hidden p-6 h-full transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 bg-gradient-to-br from-card to-muted/20 border-2 border-transparent hover:border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
