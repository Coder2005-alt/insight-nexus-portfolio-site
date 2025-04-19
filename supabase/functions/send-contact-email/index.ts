
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    const { name, email, message }: ContactRequest = await req.json();

    console.log(`Processing contact request from ${name} (${email})`);

    // Send email to site owner - using the verified Resend domain
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
      throw new Error(`Failed to send email to owner: ${ownerEmailResponse.error.message}`);
    }

    // Send confirmation email to the sender
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
      throw new Error(`Failed to send confirmation email to sender: ${senderEmailResponse.error.message}`);
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
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send emails", 
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
