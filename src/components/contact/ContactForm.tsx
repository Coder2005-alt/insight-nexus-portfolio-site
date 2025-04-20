
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitSuccess(true);
    
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
      const response = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message }
      });
      
      if (response.error) {
        throw new Error(
          response.error.message || 
          (typeof response.error === 'string' ? response.error : JSON.stringify(response.error)) || 
          "Failed to send message"
        );
      }

      const data = response.data;
      
      if (data && data.error) {
        throw new Error(data.details || data.error || "Failed to send message");
      }

      if (data && data.partialSuccess) {
        toast({
          title: "Message Received",
          description: "Your message was sent, but the confirmation email could not be delivered. Please check your email address.",
        });
        resetForm();
        return;
      }

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
    <div className="bg-white p-8 rounded-lg shadow-md reveal">
      <h3 className="text-2xl font-bold text-navy mb-6">Send Me a Message</h3>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error sending message</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {submitSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Message Sent Successfully</AlertTitle>
          <AlertDescription className="text-green-700">
            Thank you for your message! I'll get back to you soon.
          </AlertDescription>
        </Alert>
      )}

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
  );
};
