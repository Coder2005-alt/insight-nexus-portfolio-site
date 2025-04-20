
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Linkedin, Clock, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitSuccess(false);
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending contact form data:", { name, email, message });
      
      const response = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message }
      });
      
      console.log("Contact form submission response:", response);

      // Check for HTTP-level errors (e.g., 500, 404, etc.)
      if (response.error) {
        throw new Error(
          response.error.message || 
          (typeof response.error === 'string' ? response.error : JSON.stringify(response.error)) || 
          "Failed to send message"
        );
      }

      // Check for application-level errors in the response data
      const data = response.data;
      
      if (data && data.error) {
        throw new Error(data.details || data.error || "Failed to send message");
      }

      // Handle partial success (owner email sent but confirmation failed)
      if (data && data.partialSuccess) {
        toast({
          title: "Message Received",
          description: "Your message was sent, but the confirmation email could not be delivered. Please check your email address.",
        });
        resetForm();
        return;
      }

      // Success!
      toast({
        title: "Success!",
        description: "Your message has been sent. You'll receive a confirmation email shortly!",
      });
      
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || "Failed to send message. Please try again later.");
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-lightgray">
      <div className="container-custom">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or need data analysis services? Let's talk!
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 mx-auto max-w-3xl">
            <AlertTitle>Error sending message</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {submitSuccess && (
          <Alert className="mb-6 mx-auto max-w-3xl bg-green-50 border-green-200">
            <AlertTitle className="text-green-800">Message Sent Successfully</AlertTitle>
            <AlertDescription className="text-green-700">
              Thank you for your message! I'll get back to you soon.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <h3 className="text-2xl font-bold text-navy mb-6">Contact Information</h3>
            <p className="text-darkgray/80 mb-8">
              I'm interested in freelance or contract opportunities. If you have a project that needs data expertise, don't hesitate to reach out.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Email</h4>
                  <a href="mailto:usamaodho2005@gmail.com" className="text-darkgray/80 hover:text-teal transition-colors">
                    usamaodho2005@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Phone</h4>
                  <a href="tel:+923153490189" className="text-darkgray/80 hover:text-teal transition-colors">
                    +92 315 349 0189
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Linkedin className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">LinkedIn</h4>
                  <a href="#" className="text-darkgray/80 hover:text-teal transition-colors">
                    linkedin.com/in/data-analyst
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Response Time</h4>
                  <p className="text-darkgray/80">I'll respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md reveal">
            <h3 className="text-2xl font-bold text-navy mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-darkgray mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-darkgray mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-darkgray mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project"
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-teal hover:bg-teal/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
