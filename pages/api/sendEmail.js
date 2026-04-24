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

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `Portfolio Message: ${subject || 'No Subject'}`,
        text: `Name/Email: ${name}\n\nMessage:\n${message}`,
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

