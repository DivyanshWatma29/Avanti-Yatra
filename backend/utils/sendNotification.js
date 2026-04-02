const nodemailer = require('nodemailer');

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_PORT === '465',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};

const sendEmail = async (to, subject, html) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('SMTP not configured – skipping email to:', to);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@avantiyatra.com',
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('Email send error:', err.message);
  }
};

const sendBookingConfirmation = async (booking) => {
  const subject = `Booking Confirmed – ${booking.templeName}`;
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h2 style="color:#7c3aed">🛕 Avanti Yatra – Booking Confirmed</h2>
      <p>Dear <strong>${booking.userName || 'Devotee'}</strong>,</p>
      <p>Your visit to <strong>${booking.templeName}</strong> has been confirmed.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Booking ID</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.bookingId}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Date</strong></td><td style="padding:8px;border:1px solid #ddd">${new Date(booking.bookingDate).toDateString()}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Time Slot</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.timeSlot}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Visitors</strong></td><td style="padding:8px;border:1px solid #ddd">${booking.numberOfVisitors}</td></tr>
      </table>
      <p>Please carry this booking ID or the QR code at the entrance.</p>
      <p style="color:#6b7280;font-size:12px">Avanti Yatra – Smart Pilgrimage Management</p>
    </div>
  `;
  await sendEmail(booking.userEmail, subject, html);
};

module.exports = { sendEmail, sendBookingConfirmation };
