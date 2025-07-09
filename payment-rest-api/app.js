const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const pixRoutes = require('./routes/pix');
const abacatePayRoutes = require('./webhooks/abacatePay');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/pix', pixRoutes);
app.use('/webhook/abacatepay', abacatePayRoutes);

app.get('/status', (request, response) => {
  const status = {
    'Status': 'Running',
    'Service': 'AbacatePay PIX Integration',
    'Timestamp': new Date().toISOString()
  };

  response.send(status);
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
  console.log("PIX API available at: http://localhost:" + PORT + "/api/pix");
  console.log("AbacatePay Webhook available at: http://localhost:" + PORT + "/webhook/abacatepay");
});