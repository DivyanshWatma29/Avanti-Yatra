const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const generateQRCode = async (data) => {
  const payload = typeof data === 'string' ? data : JSON.stringify(data);
  return QRCode.toDataURL(payload, { type: 'image/png', width: 300, margin: 2 });
};

const generateBookingToken = (bookingId, userId, templeId) => {
  return `${uuidv4()}-${bookingId}-${templeId}`;
};

module.exports = { generateQRCode, generateBookingToken };
