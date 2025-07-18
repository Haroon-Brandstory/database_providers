import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' });

    const { name, businessEmail, mobileNumber, companyName, message } = req.body;

    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
        // host: "smtp.your-email-provider.com",
        // port: 587,
        service: "gmail",
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "madhavan@brandstory.in",
            cc: "sales@thedatabaseproviders.com,bala@brandstory.in",
            subject: "New Client Form Submission",
            html: `
        <h3>New Client Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${businessEmail}</p>
        <p><strong>Phone:</strong> ${mobileNumber}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Error sending email' });
        console.log(error)
    }
}
