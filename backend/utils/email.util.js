// EMAIL UTILITY FUNCTIONS

// Email service for sending OTP and notifications
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Create reusable transporter (sync) for when credentials are provided
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Async helper to get a transporter; falls back to Ethereal test account in development
const getTransporter = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    return createTransporter();
  }

  // Create a test account for development if real creds are missing
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
};

// Send OTP email
export const sendOTPEmail = async (email, otp, userName = 'User') => {
  try {
    const transporter = await getTransporter();

    // Verify transporter connection before attempting to send
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('❌ Mail transporter verification failed:', verifyError);
      throw new Error(`Mail transporter verification failed: ${verifyError.message}`);
    }

    const mailOptions = {
      from: `"Digital Footprint Scanner" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .header { text-align: center; color: #4F46E5; margin-bottom: 20px; }
            .otp-box { background: #EEF2FF; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #4F46E5; letter-spacing: 5px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">🔐 Email Verification</h1>
            <p>Hello ${userName},</p>
            <p>Your OTP verification code is:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p>This code will expire in <strong>10 minutes</strong>.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <div class="footer">
              <p>© 2024 Digital Footprint Risk Scanner. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    // If using Ethereal, log the preview URL
    if (nodemailer.getTestMessageUrl && info) {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log(`📨 Preview URL: ${preview}`);
    }
    console.log(`✅ OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

// Send welcome email after successful registration
export const sendWelcomeEmail = async (email, userName) => {
  try {
    const transporter = await getTransporter();

    const mailOptions = {
      from: `"Digital Footprint Scanner" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Digital Footprint Risk Scanner',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .header { text-align: center; color: #4F46E5; margin-bottom: 20px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">🎉 Welcome to Digital Footprint Scanner!</h1>
            <p>Hello ${userName},</p>
            <p>Your account has been successfully verified.</p>
            <p>You can now start scanning your digital footprint and protect your online privacy.</p>
            <p><strong>Get started by:</strong></p>
            <ul>
              <li>Running your first username scan</li>
              <li>Checking if your email has been in any data breaches</li>
              <li>Analyzing your social media privacy</li>
            </ul>
            <div class="footer">
              <p>© 2024 Digital Footprint Risk Scanner. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    if (nodemailer.getTestMessageUrl && info) {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log(`📨 Preview URL: ${preview}`);
    }
    console.log(`✅ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = await getTransporter();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Digital Footprint Scanner" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .header { text-align: center; color: #4F46E5; margin-bottom: 20px; }
            .button { background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">🔑 Password Reset</h1>
            <p>You requested to reset your password.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>This link will expire in <strong>1 hour</strong>.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <div class="footer">
              <p>© 2024 Digital Footprint Risk Scanner. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    if (nodemailer.getTestMessageUrl && info) {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log(`📨 Preview URL: ${preview}`);
    }
    console.log(`✅ Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};