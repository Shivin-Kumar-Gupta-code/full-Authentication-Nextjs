import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a Hashed Token (unique per user)
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Save token and expiry in database based on emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // valid for 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Configure the mail server (Mailtrap)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    //  Choose the correct link and message
    const actionUrl =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    const subject =
      emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password";

    const htmlContent = `
      <p>Click <a href="${actionUrl}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }.</p>
      <p>Or copy and paste the following link in your browser:</p>
      <p>${actionUrl}</p>
    `;

    //  Prepare the final email
    const mailOptions = {
      from: "guptashivinkumar@gmail.com",
      to: email,
      subject,
      html: htmlContent,
    };

    // 6️⃣ Send the mail
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
