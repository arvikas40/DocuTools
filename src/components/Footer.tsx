import { FileText, Mail, Shield, Info } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DocuTools
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional PDF manipulation and conversion tools. Fast, secure, and easy to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/merge" className="hover:text-primary transition-colors">Merge PDF</Link></li>
              <li><Link to="/split" className="hover:text-primary transition-colors">Split PDF</Link></li>
              <li><Link to="/compress" className="hover:text-primary transition-colors">Compress PDF</Link></li>
              <li><Link to="/convert" className="hover:text-primary transition-colors">Convert Files</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Info className="h-4 w-4" />About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Shield className="h-4 w-4" />Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Mail className="h-4 w-4" />Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Security</h3>
            <p className="text-sm text-muted-foreground">
              All files are processed securely in your browser. We don't store any of your documents on our servers.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DocuTools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
