import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, subject, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ message: 'Name and message are required' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.error('Missing GMAIL_USER or GMAIL_PASS environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const timestamp = new Date().toLocaleString('en-IN', {
        dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata'
    });

    const htmlBody = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #E95420, #c44117); padding: 20px 24px;">
                <h2 style="margin: 0; color: #ffffff; font-size: 18px;">🔔 New Portfolio Inquiry</h2>
                <p style="margin: 4px 0 0; color: rgba(255,255,255,0.85); font-size: 12px;">${timestamp}</p>
            </div>
            <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; width: 100px; font-size: 13px; color: #495057;">From</td>
                        <td style="padding: 8px 12px; border: 1px solid #e9ecef; font-size: 13px; color: #212529;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; font-size: 13px; color: #495057;">Subject</td>
                        <td style="padding: 8px 12px; border: 1px solid #e9ecef; font-size: 13px; color: #212529;">${subject || 'General Inquiry'}</td>
                    </tr>
                </table>
                <div style="background: #f8f9fa; border-left: 4px solid #E95420; padding: 16px; border-radius: 0 4px 4px 0;">
                    <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #868e96; font-weight: 600;">Message</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #212529; white-space: pre-wrap;">${message}</p>
                </div>
            </div>
            <div style="background: #f1f3f5; padding: 12px 24px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; font-size: 11px; color: #868e96;">Sent via <strong>ParthAroraTSC Portfolio</strong> • <a href="https://partharoratsc.github.io" style="color: #E95420; text-decoration: none;">partharoratsc.github.io</a></p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `🔔 Portfolio Inquiry: ${subject || 'General Inquiry'}`,
        html: htmlBody,
        text: `From: ${name}\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message}\n\n---\nSent via ParthAroraTSC Portfolio`,
        replyTo: name.includes('@') ? name : undefined,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ 
            message: 'Failed to send email', 
            error: error.message,
            code: error.code 
        });
    }
}

