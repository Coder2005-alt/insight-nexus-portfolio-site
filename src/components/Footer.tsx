
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">DataInsight</h3>
            <p className="text-white/70 mb-4">
              Professional data analysis services to help your business make informed decisions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/70 hover:text-teal transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-teal transition-colors">About</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-teal transition-colors">Services</a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-teal transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-teal transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-white/70 hover:text-teal transition-colors">Data Cleaning</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-teal transition-colors">Data Visualization</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-teal transition-colors">Data Modeling</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-teal transition-colors">Business Intelligence</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-teal transition-colors">Database Management</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-white/70">
                Email: contact@datainsight.com
              </li>
              <li className="text-white/70">
                Location: New York, USA
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70">© 2025 DataInsight. All rights reserved.</p>
          <p className="text-white/70 mt-2 md:mt-0">Turning Data into Decisions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
