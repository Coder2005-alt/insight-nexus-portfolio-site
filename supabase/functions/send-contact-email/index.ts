
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.12";

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
    const requestData = await req.json();
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

    // Create transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: Deno.env.get("GMAIL_USER"),
        pass: Deno.env.get("GMAIL_APP_PASSWORD"),
      },
    });

    // Send email to site owner
    const ownerEmailResponse = await transporter.sendMail({
      from: Deno.env.get("GMAIL_USER"),
      to: "usamaodho2005@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Owner email sent successfully:", ownerEmailResponse);

    // Send confirmation email to sender
    const senderEmailResponse = await transporter.sendMail({
      from: Deno.env.get("GMAIL_USER"),
      to: email,
      subject: "Thank you for your message",
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Dear ${name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Usama Odho</p>
      `,
    });

    console.log("Sender confirmation email sent successfully:", senderEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        ownerEmail: ownerEmailResponse,
        senderEmail: senderEmailResponse
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email", 
        details: error.message || "Unknown error"
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
