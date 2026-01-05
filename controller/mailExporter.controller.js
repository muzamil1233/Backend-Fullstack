import nodemailer from "nodemailer";

export const exportEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS, // App Password (not normal password)
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.MAIL_USER, // your Gmail receives the message
      subject: "New Query from Website",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, msg: "Query sent successfully" });
  } catch (error) {
    console.log("MAIL ERROR:", error);
    res.status(500).json({ msg: "Error sending email", error });
  }
};
