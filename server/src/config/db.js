const dns = require('dns');
if (process.env.DNS_SERVERS) dns.setServers(process.env.DNS_SERVERS.split(','));

const mongoose = require('mongoose');

// Connects once at startup. If it fails we log the reason and keep the API
// alive so /api/health and the resume downloads still work.
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[db] MONGODB_URI is not set - contact submissions will return 503.');
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('[db] connected to MongoDB');
    return true;
  } catch (err) {
    console.error('[db] connection failed:', err.message);
    return false;
  }
}

module.exports = connectDB;
