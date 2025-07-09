const axios = require('axios');
require('dotenv').config({ path: './config.env' });

class AbacatePayService {
  constructor() {
    this.baseURL = process.env.ABACATE_PAY_BASE_URL;
    this.token = process.env.ABACATE_PAY_TOKEN;

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async createPixQrCode(pixData) {
    const response = await this.api.post('/v1/pixQrCode/create', pixData);
    return response.data;
  }

  async checkPixQrCodeStatus(id) {
    const response = await this.api.get(`/v1/pixQrCode/check?id=${id}`);
    return response.data;
  }

  async simulatePixPayment(id, metadata = {}) {
    const response = await this.api.post(`/v1/pixQrCode/simulate-payment?id=${id}`, { metadata });
    return response.data;
  }
}

module.exports = AbacatePayService;