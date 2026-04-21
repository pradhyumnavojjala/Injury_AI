import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { hospitalName, location } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Emergency Triage" <${process.env.EMAIL_USER}>`,
      to: "your-destination-email@example.com", // Where the alerts go
      subject: "🚨 AUTO-DISPATCH ALERT",
      text: `Dispatch requested for: ${hospitalName}\nPatient Location: ${location}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dispatch Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}