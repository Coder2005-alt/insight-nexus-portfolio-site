
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const resetForm = () => {
    form.reset();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await supabase.functions.invoke('send-contact-email', {
        body: data
      });
      
      if (response.error) {
        throw new Error(
          response.error.message || 
          (typeof response.error === 'string' ? response.error : JSON.stringify(response.error)) || 
          "Failed to send message"
        );
      }

      const responseData = response.data;
      
      if (responseData && responseData.error) {
        throw new Error(responseData.details || responseData.error || "Failed to send message");
      }

      if (responseData && responseData.partialSuccess) {
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-darkgray">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-darkgray">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-darkgray">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell me about your project" 
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-teal hover:bg-teal/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
