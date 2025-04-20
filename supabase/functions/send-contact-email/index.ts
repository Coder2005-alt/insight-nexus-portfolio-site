
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize the Resend client with the API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate that we have the API key
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error", 
          details: "Missing API key"
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the JSON body
    let requestData;
    try {
      requestData = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request", 
          details: "Could not parse request body"
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, message } = requestData as ContactRequest;

    console.log(`Processing contact request from ${name} (${email})`);

    // Validate incoming data
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name, email, messageLength: message?.length });
      return new Response(
        JSON.stringify({ 
          error: "Missing required data", 
          details: "Name, email, and message are required"
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ 
          error: "Invalid data", 
          details: "Please provide a valid email address"
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send email to site owner - using the verified Resend domain
    console.log("Attempting to send email to site owner...");
    const ownerEmailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // Using Resend's default domain which is already verified
      to: ["usamaodho2005@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Owner email response:", JSON.stringify(ownerEmailResponse));

    if (ownerEmailResponse.error) {
      console.error("Failed to send email to owner:", ownerEmailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: "Email sending failed", 
          details: `Failed to send email to owner: ${ownerEmailResponse.error.message || JSON.stringify(ownerEmailResponse.error)}`
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send confirmation email to the sender
    console.log("Attempting to send confirmation email to sender...");
    const senderEmailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // Using Resend's default domain which is already verified
      to: [email],
      subject: "Thank you for your message",
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Dear ${name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Usama Odho</p>
      `,
    });

    console.log("Sender email response:", JSON.stringify(senderEmailResponse));

    if (senderEmailResponse.error) {
      console.error("Failed to send confirmation email to sender:", senderEmailResponse.error);
      // We've already sent the owner email, so we'll just log this error but still return success
      console.warn("Note: Owner notification was sent successfully, but confirmation email failed");
      
      return new Response(JSON.stringify({ 
        success: true,
        partialSuccess: true,
        ownerEmail: ownerEmailResponse,
        senderEmailError: senderEmailResponse.error,
        message: "Your message was received but the confirmation email could not be sent."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Emails sent successfully to both owner and sender");

    return new Response(JSON.stringify({ 
      success: true,
      ownerEmail: ownerEmailResponse,
      senderEmail: senderEmailResponse
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error sending emails:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send emails", 
        details: error.message || "Unknown error",
        stack: error.stack || "No stack trace available"
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
