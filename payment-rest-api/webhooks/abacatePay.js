const express = require('express');
const router = express.Router();
const WebSocketService = require('../services/websocketService');

const websocketService = new WebSocketService();
websocketService.initialize();

router.post('/', async (req, res) => {
  const webhookSecret = req.query.webhookSecret;

  if (webhookSecret !== process.env.ABACATE_PAY_SECRET) {
    return res.status(401).json({ error: 'Invalid webhook secret' });
  }

  const event = req.body;

  if (event.event === 'billing.paid') {
    websocketService.broadcast('pix.payment.simulated', {
      pixId: event.data.pixQrCode.id,
      status: 'paid'
    });
  }

  res.status(200).json({ received: true });
});

module.exports = router;