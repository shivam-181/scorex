
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { category, message, userEmail } = await req.json();

    if (!category || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'ScoreX Feedback <onboarding@resend.dev>', // Default Resend testing sender
      to: ['shivam180804@gmail.com'], // Deliver to you
      subject: `ScoreX Feedback: ${category}`,
      html: `
        <h1>New Feedback Received</h1>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #DC143C;">
          ${message}
        </blockquote>
        ${userEmail ? `<p><strong>User Email (Optional):</strong> ${userEmail}</p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Feedback API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
