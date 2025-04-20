
import { Mail, Linkedin, Clock, Phone } from 'lucide-react';

interface ContactIconProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ContactIcon = ({ icon, title, content }: ContactIconProps) => (
  <div className="flex items-center">
    <div className="bg-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-navy">{title}</h4>
      {content}
    </div>
  </div>
);

export const ContactInfo = () => {
  return (
    <div className="reveal">
      <h3 className="text-2xl font-bold text-navy mb-6">Contact Information</h3>
      <p className="text-darkgray/80 mb-8">
        I'm interested in freelance or contract opportunities. If you have a project that needs data expertise, don't hesitate to reach out.
      </p>

      <div className="space-y-6">
        <ContactIcon
          icon={<Mail className="h-5 w-5 text-teal" />}
          title="Email"
          content={
            <a href="mailto:usamaodho2005@gmail.com" className="text-darkgray/80 hover:text-teal transition-colors">
              usamaodho2005@gmail.com
            </a>
          }
        />
        
        <ContactIcon
          icon={<Phone className="h-5 w-5 text-teal" />}
          title="Phone"
          content={
            <a href="tel:+923153490189" className="text-darkgray/80 hover:text-teal transition-colors">
              +92 315 349 0189
            </a>
          }
        />
        
        <ContactIcon
          icon={<Linkedin className="h-5 w-5 text-teal" />}
          title="LinkedIn"
          content={
            <a href="#" className="text-darkgray/80 hover:text-teal transition-colors">
              linkedin.com/in/data-analyst
            </a>
          }
        />
        
        <ContactIcon
          icon={<Clock className="h-5 w-5 text-teal" />}
          title="Response Time"
          content={<p className="text-darkgray/80">I'll respond within 24 hours</p>}
        />
      </div>
    </div>
  );
};
