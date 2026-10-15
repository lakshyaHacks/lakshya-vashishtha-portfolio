require('dotenv').config();
const createApp = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB(); // async; the server starts regardless
createApp().listen(PORT, () => console.log(`[server] listening on port ${PORT}`));
