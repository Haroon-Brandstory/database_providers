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
            // to: "haroon@brandstory.in",
            to: "madhavan@brandstory.in",
            cc: "sales@thedatabaseproviders.com,bala@brandstory.in",
            subject: "New Client Form Submission",
            html: `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background-color: #001667; color: #fff; padding: 20px 30px;">
        <h2 style="margin: 0; font-size: 20px;">New Client Form Submission</h2>
      </div>
      
      <!-- Body -->
      <div style="padding: 25px 30px; line-height: 1.6;">
        <p style="margin: 0 0 10px;"><strong style="color: #001667;">Name:</strong> ${name}</p>
        <p style="margin: 0 0 10px;"><strong style="color: #001667;">Email:</strong> ${businessEmail}</p>
        <p style="margin: 0 0 10px;"><strong style="color: #001667;">Phone:</strong> ${mobileNumber}</p>
        <p style="margin: 0 0 10px;"><strong style="color: #001667;">Company:</strong> ${companyName}</p>
        <p style="margin: 20px 0 10px;"><strong style="color: #001667;">Message:</strong></p>
        <div style="background: #f2f2f2; padding: 12px 15px; border-radius: 6px;">${message}</div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; padding: 15px 30px; font-size: 12px; text-align: center; color: #555;">
        <p style="margin: 0;">This email was automatically generated from the website contact form.</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} BrandStory. All rights reserved.</p>
      </div>
    </div>
  </div>
  `,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Error sending email' });
        // console.log(error)
    }
}