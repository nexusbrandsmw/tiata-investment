import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Tiata Contact Form <contact@tiatamw.com>",
      to: "info@tiatamw.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4a3c30; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #faf1e0; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #faf1e0; padding: 32px; border-radius: 0 0 12px 12px;">
            <p style="margin: 0 0 16px;"><strong style="color: #4a3c30;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 16px;"><strong style="color: #4a3c30;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 8px;"><strong style="color: #4a3c30;">Message:</strong></p>
            <p style="background: white; padding: 16px; border-radius: 8px; color: #4a3c30; line-height: 1.6;">${message}</p>
            <p style="margin-top: 24px; font-size: 12px; color: #4a3c30/60;">
              Sent from the Tiata Investment contact form at tiatamw.com
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}