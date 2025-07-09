const express = require('express');
const router = express.Router();
const AbacatePayService = require('../services/abacatePayService');

const abacatePayService = new AbacatePayService();

router.post('/create', async (req, res) => {
  const { amount, expiresIn, description, customer, metadata = {} } = req.body;

  if (!amount) {
    return res.status(400).json({
      error: 'amount is required'
    });
  }

  if (amount < 1) {
    return res.status(400).json({
      error: 'amount must be at least 1 (R$0.01)'
    });
  }

  if (description && description.length > 140) {
    return res.status(400).json({
      error: 'description must be 140 characters or less'
    });
  }

  const pixData = { amount, description, metadata };

  if (expiresIn) pixData.expiresIn = expiresIn;
  if (customer) pixData.customer = customer;

  const result = await abacatePayService.createPixQrCode(pixData);

  res.status(201).json(result);
});

router.get('/check/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: 'PIX ID is required'
    });
  }

  const result = await abacatePayService.checkPixQrCodeStatus(id);
  res.json(result);
});

router.post('/simulate/:id', async (req, res) => {
  const { id } = req.params;
  const { metadata = {} } = req.body ?? {};

  if (!id) {
    return res.status(400).json({
      error: 'PIX ID is required'
    });
  }

  const result = await abacatePayService.simulatePixPayment(id, metadata);
  res.json(result);
});

module.exports = router;